import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Prix en centimes
const PRICE_IDS = {
  price_weekly: 999,  // 9.99€
  price_monthly: 1999,  // 19.99€
  price_yearly: 4999,  // 49.99€
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Activation du CORS pour le développement
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Gestion de la requête OPTIONS pour le CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { planId } = req.body;

    if (!planId || !PRICE_IDS[planId as keyof typeof PRICE_IDS]) {
      return res.status(400).json({ error: 'Invalid plan ID' });
    }

    const amount = PRICE_IDS[planId as keyof typeof PRICE_IDS];

    // Création du PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      payment_method_types: ['card'],
      metadata: {
        planId,
      },
    });

    // Envoi de la réponse
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      amount,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}