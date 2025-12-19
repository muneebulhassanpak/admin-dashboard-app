/**
 * Mock Data Store
 * In-memory store for managing mock data across the application
 */

import { User, UserType } from '@/features/user-management/types';

// In-memory store for runtime-added users
let runtimeUsers: User[] = [];

export const mockDataStore = {
  /**
   * Get all runtime users
   */
  getRuntimeUsers(): User[] {
    return [...runtimeUsers];
  },

  /**
   * Add a user to runtime store
   */
  addUser(user: User): void {
    runtimeUsers.push(user);
  },

  /**
   * Clear all runtime users (useful for testing)
   */
  clearRuntimeUsers(): void {
    runtimeUsers = [];
  },

  /**
   * Delete a user by ID
   */
  deleteUser(id: string): void {
    runtimeUsers = runtimeUsers.filter((user) => user.id !== id);
  },

  /**
   * Update a user
   */
  updateUser(id: string, updates: Partial<User>): void {
    const index = runtimeUsers.findIndex((user) => user.id === id);
    if (index !== -1) {
      runtimeUsers[index] = { ...runtimeUsers[index], ...updates };
    }
  },
};
