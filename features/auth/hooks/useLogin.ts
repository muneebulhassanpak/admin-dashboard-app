import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authService } from '../services/authService';
import type { LoginCredentials, UseLoginReturn } from '../types';

export function useLogin(): UseLoginReturn {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);

    try {
      const user = await authService.login(credentials);

      // Store user in localStorage (in real app, would use secure tokens)
      localStorage.setItem('user', JSON.stringify(user));

      // Show success toast
      toast.success('Login successful!', {
        description: `Welcome back, ${user.name}`,
      });

      // Redirect to dashboard or home page
      setTimeout(() => {
        router.push('/');
      }, 500);
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
