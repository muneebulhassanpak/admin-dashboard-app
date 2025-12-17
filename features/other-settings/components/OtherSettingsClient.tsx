/**
 * OtherSettingsClient Component
 * Client component that handles the Other Settings logic
 */

'use client';

import { useOtherSettings } from '../hooks';
import { OtherSettingsForm } from './OtherSettingsForm';
import { OtherSettingsSkeleton } from './OtherSettingsSkeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function OtherSettingsClient() {
  const { settings, loading, saving, error, updateSettings, toggleMaintenance } =
    useOtherSettings();

  if (loading) {
    return <OtherSettingsSkeleton />;
  }

  if (error || !settings) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error || 'Failed to load settings'}
        </AlertDescription>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.reload()}
          className="mt-2"
        >
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <OtherSettingsForm
      settings={settings}
      onSave={updateSettings}
      onToggleMaintenance={toggleMaintenance}
      saving={saving}
    />
  );
}
