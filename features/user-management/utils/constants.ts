/**
 * User Management Constants and Mock Data
 */

import type { User } from '../types';
import { UserType } from '../types';

// Mock Users Data with Parent-Child Relationships
export const MOCK_USERS: User[] = [
  // Parents
  {
    id: '1',
    email: 'haris@yopmail.com',
    username: 'haris_parent',
    userType: UserType.PARENT,
    level: null,
    paid: false,
    plan: 'Free',
    status: true,
    parentId: null,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'hamza@yopmail.com',
    username: 'hamza_parent',
    userType: UserType.PARENT,
    level: null,
    paid: false,
    plan: 'Free',
    status: true,
    parentId: null,
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    email: 'muneeb.hassan@bytetb.io',
    username: 'muneeb_parent',
    userType: UserType.PARENT,
    level: null,
    paid: false,
    plan: 'Free',
    status: true,
    parentId: null,
    createdAt: '2024-01-03T00:00:00Z',
  },
  {
    id: '4',
    email: 'moivogajapre-6806@yopmail.com',
    username: 'moivo_parent',
    userType: UserType.PARENT,
    level: null,
    paid: true,
    plan: 'Free',
    status: true,
    parentId: null,
    createdAt: '2024-01-04T00:00:00Z',
  },
  // Children of parent 1 (haris)
  {
    id: '5',
    email: 'haris_child1@yopmail.com',
    username: 'haris_child1',
    userType: UserType.LEARNER,
    level: 'Grade 5',
    paid: false,
    plan: 'Free',
    status: true,
    parentId: '1',
    createdAt: '2024-01-05T00:00:00Z',
  },
  {
    id: '6',
    email: 'haris_child2@yopmail.com',
    username: 'haris_child2',
    userType: UserType.LEARNER,
    level: 'Grade 3',
    paid: false,
    plan: 'Free',
    status: false,
    parentId: '1',
    createdAt: '2024-01-06T00:00:00Z',
  },
  // Children of parent 2 (hamza)
  {
    id: '7',
    email: 'hamza_child1@yopmail.com',
    username: 'hamza_child1',
    userType: UserType.LEARNER,
    level: 'Grade 7',
    paid: false,
    plan: 'Free',
    status: true,
    parentId: '2',
    createdAt: '2024-01-07T00:00:00Z',
  },
  // Children of parent 4 (moivo)
  {
    id: '8',
    email: 'moivo_child1@yopmail.com',
    username: 'moivo_child1',
    userType: UserType.LEARNER,
    level: 'Grade 6',
    paid: true,
    plan: 'Premium',
    status: true,
    parentId: '4',
    createdAt: '2024-01-08T00:00:00Z',
  },
  {
    id: '9',
    email: 'moivo_child2@yopmail.com',
    username: 'moivo_child2',
    userType: UserType.LEARNER,
    level: 'Grade 4',
    paid: true,
    plan: 'Premium',
    status: true,
    parentId: '4',
    createdAt: '2024-01-09T00:00:00Z',
  },
  // More parents
  {
    id: '10',
    email: 'sarah@yopmail.com',
    username: 'sarah_parent',
    userType: UserType.PARENT,
    level: null,
    paid: true,
    plan: 'Premium',
    status: true,
    parentId: null,
    createdAt: '2024-01-10T00:00:00Z',
  },
];

// Pagination settings
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50];
