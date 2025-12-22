'use server';

import { redirect } from 'next/navigation';
import { setAuthCookie, clearAuthCookie } from '@/lib/auth';
import { authService } from '../services/authService';
import { ROUTES } from '@/lib/routes';
import type { LoginCredentials } from '../types';

export interface LoginResult {
  success: boolean;
  error?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export async function loginAction(
  credentials: LoginCredentials
): Promise<LoginResult> {
  try {
    // Use existing mock auth service
    const user = await authService.login(credentials);

    // Set httpOnly cookie with user data
    await setAuthCookie(user);

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid credentials',
    };
  }
}

export async function logoutAction(): Promise<void> {
  await clearAuthCookie();
  redirect(ROUTES.LOGIN);
}
