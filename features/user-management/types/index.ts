/**
 * User Management Types
 */

// User Type Enum
export enum UserType {
  PARENT = 'parent',
  LEARNER = 'learner',
}

// User Entity
export interface User {
  id: string;
  email: string;
  username: string;
  userType: UserType;
  level: string | null;
  paid: boolean;
  plan: string;
  status: boolean; // active/inactive
  parentId: string | null; // null for parents, parent's id for learners
  children?: User[]; // for parent users
  createdAt: string;
}

// Pagination
export interface PaginationParams {
  page: number;
  pageSize: number;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// DTOs
export interface CreateUserDto {
  email: string;
  username: string;
  userType: UserType;
  parentId?: string;
}

export interface UpdateUserDto {
  id: string;
  email?: string;
  username?: string;
  level?: string;
  paid?: boolean;
  plan?: string;
  status?: boolean;
}

// Hook Return Type
export interface UseUserManagementReturn {
  users: User[];
  loading: boolean;
  deleting: string | null; // user id being deleted
  toggling: string | null; // user id being toggled
  error: string | null;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  deleteUser: (id: string) => Promise<void>;
  toggleUserStatus: (id: string) => Promise<void>;
  refreshUsers: () => Promise<void>;
}
