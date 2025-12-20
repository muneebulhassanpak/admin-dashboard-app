import type { Metadata } from 'next';
import { PricingClient } from '@/features/pricing/components';

export const metadata: Metadata = {
  title: 'Pricing Plans',
  description: 'Manage subscription plans, pricing tiers, and billing settings. Configure features and limits for different user tiers.',
};

export default function PricingPage() {
  return <PricingClient />;
}
