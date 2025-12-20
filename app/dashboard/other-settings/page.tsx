/**
 * Other Settings Page
 * Page for managing disclaimers and maintenance mode
 */

import type { Metadata } from 'next';
import { OtherSettingsClient } from '@/features/other-settings/components';

export const metadata: Metadata = {
  title: 'Other Settings',
  description: 'Configure platform settings including disclaimers, maintenance mode, notifications, and general system preferences.',
};

export default function OtherSettingsPage() {
  return <OtherSettingsClient />;
}
