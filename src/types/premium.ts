export interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface PremiumPlan {
  id: string;
  name: string;
  price: number;
  duration: 'monthly' | 'yearly';
  features: string[];
  highlighted?: boolean;
}