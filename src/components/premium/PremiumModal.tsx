import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51QhvsQCtpqgf1tfv6lBpSptrcfs2apKre4c8iaKEqU979pdLatZaa3szB290PVtCWh9ALaeel2KyFMo3Ys56fbpT00s4vvTGIi');

const PREMIUM_PLANS = [
  {
    id: 'weekly',
    name: 'Premium Semaine',
    price: 9.99,
    duration: 'weekly',
    features: ['Accès aux chat rooms', 'Fonctionnalités de base', 'Création d\'événements standard', 'Notifications standard'],
  },
  {
    id: 'monthly',
    name: 'Premium Mensuel',
    price: 19.99,
    duration: 'monthly',
    features: ['Chat rooms illimités', 'Badge premium', 'Création d\'événements illimitée', 'Notifications prioritaires'],
  },
  {
    id: 'yearly',
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
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handleCardClick = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handlePayment = async () => {
    if (!selectedPlan) return;

    try {
      const response = await axios.post('http://localhost:5173/create-payment-intent', {
        planId: selectedPlan,
      });
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error('Erreur lors de la création de la session Stripe :', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-4xl w-full relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          ✕
        </button>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Passez à la vitesse supérieure avec Premium
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Profitez d'une expérience enrichie et de fonctionnalités exclusives
          </p>
        </div>

        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm onClose={onClose} />
          </Elements>
        ) : (
          <div className="mt-12 flex gap-6 overflow-x-auto">
            {PREMIUM_PLANS.map((plan) => (
              <div
                key={plan.id}
                onClick={() => handleCardClick(plan.id)}
                className={`rounded-lg cursor-pointer border ${
                  selectedPlan === plan.id ? 'border-blue-600' : 'border-gray-200'
                }`}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                  <p className="mt-4">
                    <span className="text-4xl font-extrabold text-gray-900">{plan.price}€</span>
                    <span className="text-base font-medium text-gray-500">
                      /{plan.duration === 'weekly' ? 'semaine' : plan.duration === 'monthly' ? 'mois' : 'an'}
                    </span>
                  </p>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex">
                        <Check className="h-5 w-5 text-green-500 shrink-0" />
                        <span className="ml-3 text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <button
                    onClick={handlePayment}
                    className={`w-full rounded-lg px-4 py-2 text-sm font-medium ${
                      selectedPlan === plan.id
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    Commencer maintenant
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PaymentForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:4242/success',
      },
    });

    if (error) {
      console.error('Erreur de paiement:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
      >
        Payer maintenant
      </button>
      <button
        onClick={onClose}
        className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg w-full"
      >
        Fermer
      </button>
    </form>
  );
};
