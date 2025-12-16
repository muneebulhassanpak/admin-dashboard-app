import { MOCK_USERS, MOCK_CREDENTIALS } from '../utils/constants';
import type { User, LoginCredentials } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    await delay(500);

    // Find matching mock credential
    const mockCredential = MOCK_CREDENTIALS.find(
      (cred) => cred.email === credentials.email && cred.password === credentials.password
    );

    if (!mockCredential) {
      throw new Error('Invalid email or password');
    }

    // Find corresponding user
    const user = MOCK_USERS.find((u) => u.email === credentials.email);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  },

  async logout(): Promise<void> {
    await delay(300);
    // Simulate logout - in real app would clear tokens
  },

  async getCurrentUser(): Promise<User | null> {
    await delay(200);
    // In real app, would verify token and return user
    // For mock, return null (not authenticated)
    return null;
  },
};
