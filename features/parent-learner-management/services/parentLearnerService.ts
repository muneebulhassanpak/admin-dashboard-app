/**
 * Parent and Learner Service
 * Handles all data operations for parents and learners (mocked)
 */

import type {
  Parent,
  Learner,
  CreateParentDto,
  CreateLearnerDto,
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

    return newLearner;
  },
};
