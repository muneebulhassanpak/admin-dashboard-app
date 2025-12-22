import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ROUTES } from '@/lib/routes';
import { loginAction } from '../actions/authActions';
import type { LoginCredentials, UseLoginReturn } from '../types';

export function useLogin(): UseLoginReturn {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);

    try {
      // Call server action instead of client-side service
      const result = await loginAction(credentials);

      if (!result.success) {
        throw new Error(result.error || 'Login failed');
      }

      // Show success toast
      toast.success('Login successful!', {
        description: `Welcome back, ${result.user?.name}`,
      });

      // Redirect to dashboard (middleware will handle auth check)
      router.push(ROUTES.DASHBOARD.ROOT);
      router.refresh(); // Refresh to update server components
    } catch (err) {
      if (err instanceof Error) {
        toast.error('Login failed', {
          description: err.message,
        });
      } else {
        toast.error('Login failed', {
          description: 'An unexpected error occurred',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error: null,
  };
}
