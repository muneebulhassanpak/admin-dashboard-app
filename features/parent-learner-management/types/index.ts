/**
 * Parent and Learner Management Types
 */

// Parent Entity
export interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
}

// Learner Entity
export interface Learner {
  id: string;
  parentId: string;
  firstName: string;
  lastName: string;
  username: string;
  level: string;
  dateOfBirth: string;
  subjects: string[];
  school: string;
  profilePicture?: string;
  createdAt: string;
}

// Level Option
export interface LevelOption {
  value: string;
  label: string;
}

// Subject Option
export interface SubjectOption {
  value: string;
  label: string;
  levelId: string; // subjects are level-specific
}

// School Option
export interface SchoolOption {
  value: string;
  label: string;
}

// Parent Option for Dropdown
export interface ParentOption {
  value: string;
  label: string;
}

// DTOs
export interface CreateParentDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface CreateLearnerDto {
  parentId: string;
  firstName: string;
  lastName: string;
  username: string;
  level: string;
  dateOfBirth: string;
  subjects: string[];
  school: string;
  password: string;
  profilePicture?: File;
}

// Hook Return Types
export interface UseAddParentLearnerReturn {
  // Parent operations
  addParent: (data: CreateParentDto) => Promise<Parent>;
  addingParent: boolean;

  // Learner operations
  addLearner: (data: CreateLearnerDto) => Promise<Learner>;
  addingLearner: boolean;

  // Dropdown data
  parents: ParentOption[];
  levels: LevelOption[];
  schools: SchoolOption[];
  getSubjectsByLevel: (levelId: string) => SubjectOption[];

  // Loading states
  loadingParents: boolean;
  loadingLevels: boolean;
  loadingSchools: boolean;

  // Error states
  error: string | null;
}
