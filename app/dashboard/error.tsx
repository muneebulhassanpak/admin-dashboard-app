'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 p-6">
      <Alert variant="destructive" className="max-w-2xl">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="text-lg font-semibold">
          Something went wrong!
        </AlertTitle>
        <AlertDescription className="mt-2">
          {error.message || 'An unexpected error occurred while loading the dashboard.'}
        </AlertDescription>
      </Alert>

      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-muted-foreground max-w-md">
          Don't worry, your data is safe. Try refreshing the page or contact support if the problem persists.
        </p>

        <Button onClick={reset} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>

      {error.digest && (
        <p className="text-xs text-muted-foreground">
          Error ID: <code className="font-mono">{error.digest}</code>
        </p>
      )}
    </div>
  );
}
