import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

const PRICE_IDS = {
  price_weekly: 999, // 9.99€
  price_monthly: 1999, // 19.99€
  price_yearly: 4999, // 49.99€
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { planId } = req.body;
    
    if (!planId || !PRICE_IDS[planId as keyof typeof PRICE_IDS]) {
      return res.status(400).json({ error: 'Invalid plan ID' });
    }

    const amount = PRICE_IDS[planId as keyof typeof PRICE_IDS];

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      amount,
    });
  } catch (err) {
    console.error('Error creating payment intent:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}