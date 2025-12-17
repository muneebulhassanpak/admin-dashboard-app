/**
 * Other Settings Constants and Mock Data
 */

import type { OtherSettings } from '../types';

// Current Other Settings (Mock)
export const MOCK_OTHER_SETTINGS: OtherSettings = {
  id: '1',
  childDisclaimer: 'This is MYAi for children.',
  parentDisclaimer: 'This is MYAi',
  maintenanceMode: false,
  logo: null,
  updatedAt: '2024-01-15T10:30:00Z',
};

// Validation limits
export const SETTINGS_LIMITS = {
  CHILD_DISCLAIMER_MAX_LENGTH: 500,
  PARENT_DISCLAIMER_MAX_LENGTH: 500,
};
