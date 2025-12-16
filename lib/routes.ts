/**
 * Application Routes Configuration
 * Centralized route definitions for consistent navigation across the app
 */

export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',

  // Dashboard routes
  DASHBOARD: {
    ROOT: '/dashboard',
    USER_MANAGEMENT: '/dashboard/user-management',
    PRICING: '/dashboard/pricing',
    COMPLAINT_CENTER: '/dashboard/complaint-center',
    CONFIGURE_LLM: '/dashboard/configure-llm',
    SUBSCRIPTION_MANAGEMENT: '/dashboard/subscription-management',
    OTHER_SETTINGS: '/dashboard/other-settings',
    MANAGE_KNOWLEDGE_BASE: '/dashboard/manage-knowledge-base',
    DOCUMENT_UPLOADS: '/dashboard/document-uploads',
    SETTINGS: '/dashboard/settings',
  },
} as const;

// Type helper for route values
export type Route = typeof ROUTES[keyof typeof ROUTES];
