'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { useLogin } from '../hooks';
import { MOCK_CREDENTIALS } from '../utils/constants';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { login, loading } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    await login(values);
  };

  const handleQuickFill = () => {
    form.setValue('email', MOCK_CREDENTIALS[0].email);
    form.setValue('password', MOCK_CREDENTIALS[0].password);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0 shadow-lg">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-8 md:p-10 flex items-center">
            <div className="w-full space-y-6">
              {/* Header Section */}
              <div className="flex flex-col gap-3 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                <p className="text-muted-foreground text-base">
                  Login to your admin dashboard
                </p>
              </div>

              {/* Form Fields */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="admin@example.com"
                            disabled={loading}
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="Enter your password"
                            disabled={loading}
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    loading={loading}
                    className="w-full h-11 text-base font-medium"
                  >
                    Login
                  </Button>
                </form>
              </Form>

              {/* Demo Credentials Card */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Demo Account
                  </span>
                </div>
              </div>

              <div className="rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 p-4 space-y-3">
                <div className="flex items-center gap-2 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                  <span className="text-sm font-semibold">
                    Test Credentials
                  </span>
                </div>

                <div className="space-y-2 text-sm font-mono bg-background/50 rounded p-3 border border-border/50">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="text-foreground font-medium">
                      {MOCK_CREDENTIALS[0].email}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Password:</span>
                    <span className="text-foreground font-medium">
                      {MOCK_CREDENTIALS[0].password}
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleQuickFill}
                  disabled={loading}
                  className="w-full border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  </svg>
                  Quick Fill Demo Credentials
                </Button>
              </div>
            </div>
          </div>

          <div className="relative hidden md:flex min-h-[700px] flex-col items-center justify-center overflow-hidden bg-background border-l border-border/50">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                                  linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-8 space-y-8 max-w-md">
              {/* Simple Icon */}
              <div className="mx-auto w-16 h-16 rounded-xl bg-muted/50 flex items-center justify-center border border-border/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-muted-foreground"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-foreground">
                  Admin Portal
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Secure access to manage your AI education platform. Monitor users, content, and system settings.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold text-foreground/90">100%</div>
                  <div className="text-xs text-muted-foreground/80">Secure</div>
                </div>
                <div className="text-center space-y-1 border-x border-border/30">
                  <div className="text-2xl font-bold text-foreground/90">24/7</div>
                  <div className="text-xs text-muted-foreground/80">Available</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold text-foreground/90">AI</div>
                  <div className="text-xs text-muted-foreground/80">Powered</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
