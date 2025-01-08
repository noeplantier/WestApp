import React from 'react';
import { Check } from 'lucide-react';
import type { PremiumPlan } from '../../types/premium';


interface PremiumPlan {

  id: string;

  name: string;

  price: number;

  duration: 'weekly' | 'monthly' | 'yearly';

  features: string[];

  highlighted?: boolean;

}

const PREMIUM_PLANS: PremiumPlan[] = [
  {
    id: 'weekly',
    name: 'Premium Semaine',
    price: 9.99,
    duration:'weekly',
    features: [
      'Accès standard aux chat rooms',
      'Création d\'événements standard',
      'Notifications standard'
    ]
  },
  {
    id: 'monthly',
    name: 'Premium Mensuel',
    price: 19.99,
    duration: 'monthly',
    features: [
      'Accès illimité aux chat rooms',
      'Badge premium',
      'Création d\'événements illimitée',
      'Notifications prioritaires'
    ]
  },
  {
    id: 'yearly',
    name: 'Premium Annuel',
    price: 99.99,
    duration: 'yearly',
    features: [
      'Tous les avantages du plan mensuel',
      'Deux mois gratuits',
      'Support prioritaire',
      'Accès anticipé aux nouvelles fonctionnalités',
      'Statistiques détaillées'
    ],
    highlighted: true
  }
];

export function PremiumPlans() {
  
  return (
    
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Passez à la vitesse supérieure avec Premium
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Profitez d'une expérience enrichie et de fonctionnalités exclusives
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto">
          {PREMIUM_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg shadow-lg divide-y divide-gray-200 ${
                plan.highlighted
                  ? 'border-2 border-indigo-500 relative'
                  : 'border border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    Populaire
                  </span>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.price}€
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    /{plan.duration === 'monthly' ? 'mois' : 'an'}
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
                  className={`w-full rounded-lg px-4 py-2 text-sm font-medium ${
                    plan.highlighted
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  Commencer maintenant
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}