/**
 * Parent and Learner Service
 * Handles all data operations for parents and learners (mocked)
 */

import type {
  Parent,
  Learner,
  CreateParentDto,
  CreateLearnerDto,
  UpdateParentDto,
  UpdateLearnerDto,
  ParentOption,
  LevelOption,
  SubjectOption,
  SchoolOption,
} from '../types';
import {
  MOCK_PARENTS,
  MOCK_LEVELS,
  MOCK_SUBJECTS,
  MOCK_SCHOOLS,
  delay,
} from '../utils';
import { mockDataStore } from '@/lib/mockDataStore';
import { User, UserType } from '@/features/user-management/types';

export const parentLearnerService = {
  /**
   * Fetch all parents (for dropdown)
   */
  async getParents(): Promise<ParentOption[]> {
    await delay(500);
    return [...MOCK_PARENTS];
  },

  /**
   * Fetch all levels
   */
  async getLevels(): Promise<LevelOption[]> {
    await delay(400);
    return [...MOCK_LEVELS];
  },

  /**
   * Fetch all subjects
   */
  async getSubjects(): Promise<SubjectOption[]> {
    await delay(400);
    return [...MOCK_SUBJECTS];
  },

  /**
   * Fetch all schools
   */
  async getSchools(): Promise<SchoolOption[]> {
    await delay(400);
    return [...MOCK_SCHOOLS];
  },

  /**
   * Create a new parent
   */
  async createParent(dto: CreateParentDto): Promise<Parent> {
    await delay(600);

    // Simulate validation
    if (!dto.email.includes('@')) {
      throw new Error('Invalid email address');
    }

    if (dto.phone.length < 10) {
      throw new Error('Invalid phone number');
    }

    if (dto.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Create new parent
    const newParent: Parent = {
      id: crypto.randomUUID(),
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      createdAt: new Date().toISOString(),
    };

    // Add to mockDataStore as a User for the User Management table
    const userRecord: User = {
      id: newParent.id,
      email: newParent.email,
      username: `${newParent.firstName} ${newParent.lastName}`,
      userType: UserType.PARENT,
      level: null,
      paid: false,
      plan: 'Free',
      status: true,
      parentId: null,
      createdAt: newParent.createdAt,
    };
    mockDataStore.addUser(userRecord);

    return newParent;
  },

  /**
   * Create a new learner
   */
  async createLearner(dto: CreateLearnerDto): Promise<Learner> {
    await delay(700);

    // Simulate validation
    if (!dto.parentId) {
      throw new Error('Parent is required');
    }

    if (dto.username.length < 3) {
      throw new Error('Username must be at least 3 characters');
    }

    if (dto.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    if (dto.subjects.length === 0) {
      throw new Error('At least one subject is required');
    }

    // Create new learner
    const newLearner: Learner = {
      id: crypto.randomUUID(),
      parentId: dto.parentId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      username: dto.username,
      level: dto.level,
      dateOfBirth: dto.dateOfBirth,
      subjects: dto.subjects,
      school: dto.school,
      createdAt: new Date().toISOString(),
    };

    // Add to mockDataStore as a User for the User Management table
    // Find parent to get their email for the learner's email
    const parentEmail = dto.parentId.split('@')[0]; // Just use parentId as base for demo
    const userRecord: User = {
      id: newLearner.id,
      email: `${newLearner.username}@learner.com`,
      username: newLearner.username,
      userType: UserType.LEARNER,
      level: newLearner.level,
      paid: false,
      plan: 'Free',
      status: true,
      parentId: newLearner.parentId,
      createdAt: newLearner.createdAt,
    };
    mockDataStore.addUser(userRecord);

    return newLearner;
  },

  /**
   * Update parent password
   */
  async updateParent(dto: UpdateParentDto): Promise<void> {
    await delay(600);

    // Validate password
    if (dto.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // In a real app, this would update the password in the database
    // For this mock, we'll just simulate the delay
    // The password update would be handled server-side
  },

  /**
   * Update learner subjects and password
   */
  async updateLearner(dto: UpdateLearnerDto): Promise<void> {
    await delay(700);

    // Validate password
    if (dto.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Validate subjects
    if (dto.subjects.length === 0) {
      throw new Error('At least one subject is required');
    }

    // Update the user in mockDataStore
    mockDataStore.updateUser(dto.id, {
      // We don't store subjects in the User type, so we won't update it here
      // In a real app, subjects would be stored in a separate table
    });

    // In a real app, this would update the learner's subjects and password
    // For this mock, the password update would be handled server-side
  },
};
