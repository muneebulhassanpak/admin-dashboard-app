import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: "AI Tutor Admin Portal",
    template: "%s | AI Tutor Admin",
  },
  description: "Comprehensive admin dashboard for managing your AI-powered educational platform. Handle users, content, complaints, and system configuration.",
  keywords: ["AI Tutor", "Admin Portal", "Education Management", "Learning Platform", "Content Management"],
  authors: [{ name: "AI Tutor Team" }],
  creator: "AI Tutor",
  alternates: {
    canonical: "https://ai-tutor-admin.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-tutor-admin.com",
    siteName: "AI Tutor Admin Portal",
    title: "AI Tutor Admin Portal",
    description: "Comprehensive admin dashboard for managing your AI-powered educational platform.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Tutor Admin Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tutor Admin Portal",
    description: "Comprehensive admin dashboard for managing your AI-powered educational platform.",
    images: ["/og-image.png"],
    creator: "@aitutor",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AI Tutor Admin Portal',
    description: 'Comprehensive admin dashboard for managing your AI-powered educational platform.',
    url: 'https://ai-tutor-admin.com',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
