import { LoginForm } from '@/features/auth/components';

export default function LoginPage() {
  // Middleware now handles redirect if already authenticated
  // No need for client-side useEffect check

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-5xl">
        <LoginForm />
      </div>
    </div>
  );
}
