import type { User, LoginCredentials, UserRole } from '../types';

// Mock users database
export const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin' as UserRole,
  },
];

// Mock login credentials for display
export const MOCK_CREDENTIALS: LoginCredentials[] = [
  {
    email: 'admin@example.com',
    password: 'admin123',
  },
];
