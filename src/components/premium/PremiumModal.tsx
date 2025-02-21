import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Initialisation de Stripe avec la clé publique
const stripePromise = loadStripe('pk_test_51QhvsQCtpqgf1tfv6lBpSptrcfs2apKre4c8iaKEqU979pdLatZaa3szB290PVtCWh9ALaeel2KyFMo3Ys56fbpT00s4vvTGIi');

const PREMIUM_PLANS = [
  {
    id: 'price_weekly',
    name: 'Premium Semaine',
    price: 9.99,
    duration: 'weekly',
    features: ['Accès aux chat rooms', 'Fonctionnalités de base', 'Création d\'événements standard', 'Notifications standard'],
  },
  {
    id: 'price_monthly',
    name: 'Premium Mensuel',
    price: 19.99,
    duration: 'monthly',
    features: ['Chat rooms illimités', 'Badge premium', 'Création d\'événements illimitée', 'Notifications prioritaires'],
  },
  {
    id: 'price_yearly',
    name: 'Premium Annuel',
    price: 49.99,
    duration: 'yearly',
    features: ['Deux mois d\'utilisation gratuite', 'Support prioritaire', 'Fonctionnalités VIP', 'Statistiques détaillées'],
  },
];

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentIntent, setPaymentIntent] = useState<{
    clientSecret: string;
    amount: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectPlan = async (planId: string) => {
    setSelectedPlan(planId);
    setError(null);
    setLoading(true);

    try {
      // Utilisation du chemin absolu en développement
      const baseUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000' 
        : '';
      
      const response = await axios.post(`${baseUrl}/api/create-payment-intent`, {
        planId,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setPaymentIntent({
        clientSecret: response.data.clientSecret,
        amount: response.data.amount,
      });

    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-4xl w-full relative overflow-y-auto max-h-[90vh]">
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Passez à la vitesse supérieure avec Premium
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Profitez d'une expérience enrichie et de fonctionnalités exclusives
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PREMIUM_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg border transition-all ${
                selectedPlan === plan.id 
                  ? 'border-blue-600 shadow-lg' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.price}€
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    /{plan.duration === 'weekly' ? 'semaine' : plan.duration === 'monthly' ? 'mois' : 'an'}
                  </span>
                </p>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="ml-3 text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={loading}
                  className={`w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors
                    ${
                      selectedPlan === plan.id
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
                    }
                    ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {loading ? 'Chargement...' : 'Sélectionner'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {paymentIntent && (
          <div className="mt-8 border-t border-gray-200 pt-8">
            <Elements 
              stripe={stripePromise} 
              options={{
                clientSecret: paymentIntent.clientSecret,
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#2563eb',
                  },
                },
              }}
            >
              <CheckoutForm onClose={onClose} amount={paymentIntent.amount} />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
};

interface CheckoutFormProps {
  onClose: () => void;
  amount: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onClose, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
      });

      if (submitError) {
        setError(submitError.message || 'Une erreur est survenue.');
      }
    } catch (err) {
      setError('Une erreur est survenue lors du paiement.');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-md">
        <p className="text-blue-700">
          Montant à payer: <span className="font-semibold">{(amount / 100).toFixed(2)}€</span>
        </p>
      </div>

      <PaymentElement />

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={!stripe || loading}
          className={`flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium
            hover:bg-blue-700 transition-colors
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {loading ? 'Traitement...' : 'Payer maintenant'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium
            hover:bg-gray-200 transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

export default PremiumModal;