import { redirect } from 'next/navigation';
import { getAuthCookie } from '@/lib/auth';
import { ROUTES } from '@/lib/routes';

export default async function Home() {
  // Server-side auth check
  const user = await getAuthCookie();

  if (user) {
    // User is authenticated, redirect to dashboard
    redirect(ROUTES.DASHBOARD.ROOT);
  } else {
    // User is not authenticated, redirect to login
    redirect(ROUTES.LOGIN);
  }
}