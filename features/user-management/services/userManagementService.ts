/**
 * User Management Service
 * Handles all data operations for user management (Mocked)
 */

import { MOCK_USERS } from '../utils/constants';
import type {
  User,
  PaginationParams,
  PaginatedResponse,
  CreateUserDto,
  UpdateUserDto,
} from '../types';
import { UserType } from '../types';
import { mockDataStore } from '@/lib/mockDataStore';

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory storage for demonstration
let usersData = [...MOCK_USERS];

// Helper to get all users (MOCK + runtime)
const getAllUsers = (): User[] => {
  return [...usersData, ...mockDataStore.getRuntimeUsers()];
};

export const userManagementService = {
  /**
   * Get paginated and filtered users
   * Server-side pagination and search
   */
  async getUsers(params: PaginationParams): Promise<PaginatedResponse<User>> {
    await delay(600);

    let filteredUsers = getAllUsers();

    // Apply search filter
    if (params.search && params.search.trim().length > 0) {
      const searchLower = params.search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.email.toLowerCase().includes(searchLower) ||
          user.username.toLowerCase().includes(searchLower)
      );
    }

    // Only return parent users for the main table
    const parentUsers = filteredUsers.filter((user) => user.userType === UserType.PARENT);

    // Attach children to each parent
    const usersWithChildren = parentUsers.map((parent) => ({
      ...parent,
      children: filteredUsers.filter((user) => user.parentId === parent.id),
    }));

    // Calculate pagination
    const total = usersWithChildren.length;
    const totalPages = Math.ceil(total / params.pageSize);
    const startIndex = (params.page - 1) * params.pageSize;
    const endIndex = startIndex + params.pageSize;
    const paginatedData = usersWithChildren.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total,
      page: params.page,
      pageSize: params.pageSize,
      totalPages,
    };
  },

  /**
   * Get children for a specific parent
   */
  async getChildren(parentId: string): Promise<User[]> {
    await delay(300);

    const allUsers = getAllUsers();
    return allUsers.filter(
      (user) => user.parentId === parentId && user.userType === UserType.LEARNER
    );
  },

  /**
   * Delete a user (and all their children if parent)
   */
  async deleteUser(id: string): Promise<void> {
    await delay(800);

    const allUsers = getAllUsers();
    const userToDelete = allUsers.find((u) => u.id === id);

    if (!userToDelete) {
      throw new Error('User not found');
    }

    // If deleting a parent, also delete all their children
    if (userToDelete.userType === UserType.PARENT) {
      // Delete from static mock data
      usersData = usersData.filter(
        (user) => user.id !== id && user.parentId !== id
      );

      // Delete from runtime users
      mockDataStore.deleteUser(id);
      // Also delete children from runtime users
      const runtimeUsers = mockDataStore.getRuntimeUsers();
      runtimeUsers.forEach((user) => {
        if (user.parentId === id) {
          mockDataStore.deleteUser(user.id);
        }
      });
    } else {
      // Just delete the learner from both sources
      usersData = usersData.filter((user) => user.id !== id);
      mockDataStore.deleteUser(id);
    }
  },

  /**
   * Toggle user status (active/inactive)
   */
  async toggleUserStatus(id: string): Promise<User> {
    await delay(500);

    // Try to find in static mock data first
    const userIndex = usersData.findIndex((u) => u.id === id);

    if (userIndex !== -1) {
      // Toggle the status in static data
      usersData[userIndex] = {
        ...usersData[userIndex],
        status: !usersData[userIndex].status,
      };
      return { ...usersData[userIndex] };
    }

    // If not found in static data, check runtime users
    const runtimeUsers = mockDataStore.getRuntimeUsers();
    const runtimeUser = runtimeUsers.find((u) => u.id === id);

    if (!runtimeUser) {
      throw new Error('User not found');
    }

    // Toggle the status in runtime data
    const updatedUser = {
      ...runtimeUser,
      status: !runtimeUser.status,
    };
    mockDataStore.updateUser(id, { status: updatedUser.status });

    return updatedUser;
  },

  /**
   * Create a new user
   */
  async createUser(dto: CreateUserDto): Promise<User> {
    await delay(700);

    const allUsers = getAllUsers();

    // Validate email uniqueness across all users
    const emailExists = allUsers.some((u) => u.email === dto.email);
    if (emailExists) {
      throw new Error('Email already exists');
    }

    // Generate new ID based on all users
    const allIds = allUsers.map((u) => parseInt(u.id)).filter((id) => !isNaN(id));
    const newId = allIds.length > 0 ? (Math.max(...allIds) + 1).toString() : '1';

    const newUser: User = {
      id: newId,
      email: dto.email,
      username: dto.username,
      userType: dto.userType,
      level: dto.userType === UserType.LEARNER ? 'Grade 1' : null,
      paid: false,
      plan: 'Free',
      status: true,
      parentId: dto.parentId || null,
      createdAt: new Date().toISOString(),
    };

    // Add to runtime users instead of static mock data
    mockDataStore.addUser(newUser);

    return newUser;
  },

  /**
   * Update an existing user
   */
  async updateUser(dto: UpdateUserDto): Promise<User> {
    await delay(700);

    // Try to find in static mock data first
    const userIndex = usersData.findIndex((u) => u.id === dto.id);

    if (userIndex !== -1) {
      // Update user in static data
      usersData[userIndex] = {
        ...usersData[userIndex],
        ...(dto.email && { email: dto.email }),
        ...(dto.username && { username: dto.username }),
        ...(dto.level !== undefined && { level: dto.level }),
        ...(dto.paid !== undefined && { paid: dto.paid }),
        ...(dto.plan && { plan: dto.plan }),
        ...(dto.status !== undefined && { status: dto.status }),
      };
      return { ...usersData[userIndex] };
    }

    // If not found in static data, check runtime users
    const runtimeUsers = mockDataStore.getRuntimeUsers();
    const runtimeUser = runtimeUsers.find((u) => u.id === dto.id);

    if (!runtimeUser) {
      throw new Error('User not found');
    }

    // Update user in runtime data
    const updates: Partial<User> = {
      ...(dto.email && { email: dto.email }),
      ...(dto.username && { username: dto.username }),
      ...(dto.level !== undefined && { level: dto.level }),
      ...(dto.paid !== undefined && { paid: dto.paid }),
      ...(dto.plan && { plan: dto.plan }),
      ...(dto.status !== undefined && { status: dto.status }),
    };
    mockDataStore.updateUser(dto.id, updates);

    return { ...runtimeUser, ...updates };
  },
};
