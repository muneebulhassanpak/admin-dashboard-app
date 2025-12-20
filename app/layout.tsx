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
    index: false, // Admin portal should not be indexed
    follow: false,
    googleBot: {
      index: false,
      follow: false,
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
  return (
    <html lang="en" suppressHydrationWarning>
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
