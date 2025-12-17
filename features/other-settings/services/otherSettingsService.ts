/**
 * Other Settings Service
 * Handles all data operations for other settings (Mocked)
 */

import { MOCK_OTHER_SETTINGS } from '../utils/constants';
import type { OtherSettings, UpdateOtherSettingsDto } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const otherSettingsService = {
  /**
   * Get current other settings
   */
  async getSettings(): Promise<OtherSettings> {
    await delay(500);
    return { ...MOCK_OTHER_SETTINGS };
  },

  /**
   * Update other settings
   */
  async updateSettings(dto: UpdateOtherSettingsDto): Promise<OtherSettings> {
    await delay(800);

    // Simulate validation errors
    if (dto.childDisclaimer.trim().length === 0) {
      throw new Error('Child disclaimer cannot be empty');
    }

    if (dto.parentDisclaimer.trim().length === 0) {
      throw new Error('Parent disclaimer cannot be empty');
    }

    // Create updated settings
    const updatedSettings: OtherSettings = {
      ...MOCK_OTHER_SETTINGS,
      ...dto,
      updatedAt: new Date().toISOString(),
    };

    return updatedSettings;
  },

  /**
   * Toggle maintenance mode
   */
  async toggleMaintenanceMode(currentState: boolean): Promise<OtherSettings> {
    await delay(400);

    const updatedSettings: OtherSettings = {
      ...MOCK_OTHER_SETTINGS,
      maintenanceMode: !currentState,
      updatedAt: new Date().toISOString(),
    };

    return updatedSettings;
  },
};
