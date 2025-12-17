/**
 * ConfigureLLMClient Component
 * Client component that handles the LLM configuration logic
 */

'use client';

import { useLLMConfig } from '../hooks';
import { ConfigureLLMForm } from './ConfigureLLMForm';
import { ConfigureLLMSkeleton } from './ConfigureLLMSkeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ConfigureLLMClient() {
  const { config, models, loading, saving, error, updateConfig } =
    useLLMConfig();

  if (loading) {
    return <ConfigureLLMSkeleton />;
  }

  if (error || !config) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error || 'Failed to load configuration'}
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
    <ConfigureLLMForm
      config={config}
      models={models}
      onSave={updateConfig}
      saving={saving}
    />
  );
}
