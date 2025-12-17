/**
 * useOtherSettings Hook
 * Manages other settings state and operations
 */

'use client';

import { useState, useEffect } from 'react';
import { otherSettingsService } from '../services/otherSettingsService';
import type {
  OtherSettings,
  UpdateOtherSettingsDto,
  UseOtherSettingsReturn,
} from '../types';

export function useOtherSettings(): UseOtherSettingsReturn {
  const [settings, setSettings] = useState<OtherSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const settingsData = await otherSettingsService.getSettings();
        setSettings(settingsData);
      } catch (err) {
        setError('Failed to load settings');
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update settings
  const updateSettings = async (dto: UpdateOtherSettingsDto) => {
    setSaving(true);
    setError(null);
    try {
      const updatedSettings = await otherSettingsService.updateSettings(dto);
      setSettings(updatedSettings);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to update settings';
      setError(errorMessage);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  // Toggle maintenance mode
  const toggleMaintenance = async () => {
    if (!settings) return;

    setSaving(true);
    setError(null);
    try {
      const updatedSettings = await otherSettingsService.toggleMaintenanceMode(
        settings.maintenanceMode
      );
      setSettings(updatedSettings);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to toggle maintenance mode';
      setError(errorMessage);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return {
    settings,
    loading,
    saving,
    error,
    updateSettings,
    toggleMaintenance,
  };
}
