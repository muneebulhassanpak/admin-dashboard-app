'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/features/auth/components';
import { ROUTES } from '@/lib/routes';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      // Redirect to dashboard if already logged in
      router.push(ROUTES.DASHBOARD.ROOT);
    }
  }, [router]);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-5xl">
        <LoginForm />
      </div>
    </div>
  );
}
