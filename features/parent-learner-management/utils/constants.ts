/**
 * Parent and Learner Management Constants and Mock Data
 */

import type {
  LevelOption,
  SubjectOption,
  SchoolOption,
  ParentOption,
} from '../types';

// Mock Levels
export const MOCK_LEVELS: LevelOption[] = [
  { value: 'grade-1', label: 'Grade 1' },
  { value: 'grade-2', label: 'Grade 2' },
  { value: 'grade-3', label: 'Grade 3' },
  { value: 'grade-4', label: 'Grade 4' },
  { value: 'grade-5', label: 'Grade 5' },
  { value: 'grade-6', label: 'Grade 6' },
  { value: 'grade-7', label: 'Grade 7' },
  { value: 'grade-8', label: 'Grade 8' },
  { value: 'grade-9', label: 'Grade 9' },
  { value: 'grade-10', label: 'Grade 10' },
  { value: 'grade-11', label: 'Grade 11' },
  { value: 'grade-12', label: 'Grade 12' },
];

// Mock Subjects (level-specific)
export const MOCK_SUBJECTS: SubjectOption[] = [
  // Grade 1-3 subjects
  { value: 'english-basic', label: 'English', levelId: 'grade-1' },
  { value: 'math-basic', label: 'Mathematics', levelId: 'grade-1' },
  { value: 'science-basic', label: 'Science', levelId: 'grade-1' },
  { value: 'english-basic', label: 'English', levelId: 'grade-2' },
  { value: 'math-basic', label: 'Mathematics', levelId: 'grade-2' },
  { value: 'science-basic', label: 'Science', levelId: 'grade-2' },
  { value: 'english-basic', label: 'English', levelId: 'grade-3' },
  { value: 'math-basic', label: 'Mathematics', levelId: 'grade-3' },
  { value: 'science-basic', label: 'Science', levelId: 'grade-3' },

  // Grade 4-6 subjects
  { value: 'english-intermediate', label: 'English', levelId: 'grade-4' },
  { value: 'math-intermediate', label: 'Mathematics', levelId: 'grade-4' },
  { value: 'science-intermediate', label: 'Science', levelId: 'grade-4' },
  { value: 'social-studies', label: 'Social Studies', levelId: 'grade-4' },
  { value: 'english-intermediate', label: 'English', levelId: 'grade-5' },
  { value: 'math-intermediate', label: 'Mathematics', levelId: 'grade-5' },
  { value: 'science-intermediate', label: 'Science', levelId: 'grade-5' },
  { value: 'social-studies', label: 'Social Studies', levelId: 'grade-5' },
  { value: 'english-intermediate', label: 'English', levelId: 'grade-6' },
  { value: 'math-intermediate', label: 'Mathematics', levelId: 'grade-6' },
  { value: 'science-intermediate', label: 'Science', levelId: 'grade-6' },
  { value: 'social-studies', label: 'Social Studies', levelId: 'grade-6' },

  // Grade 7-9 subjects
  { value: 'english-advanced', label: 'English', levelId: 'grade-7' },
  { value: 'algebra', label: 'Algebra', levelId: 'grade-7' },
  { value: 'biology', label: 'Biology', levelId: 'grade-7' },
  { value: 'chemistry', label: 'Chemistry', levelId: 'grade-7' },
  { value: 'physics', label: 'Physics', levelId: 'grade-7' },
  { value: 'history', label: 'History', levelId: 'grade-7' },
  { value: 'geography', label: 'Geography', levelId: 'grade-7' },
  { value: 'english-advanced', label: 'English', levelId: 'grade-8' },
  { value: 'algebra', label: 'Algebra', levelId: 'grade-8' },
  { value: 'geometry', label: 'Geometry', levelId: 'grade-8' },
  { value: 'biology', label: 'Biology', levelId: 'grade-8' },
  { value: 'chemistry', label: 'Chemistry', levelId: 'grade-8' },
  { value: 'physics', label: 'Physics', levelId: 'grade-8' },
  { value: 'history', label: 'History', levelId: 'grade-8' },
  { value: 'geography', label: 'Geography', levelId: 'grade-8' },
  { value: 'english-advanced', label: 'English', levelId: 'grade-9' },
  { value: 'algebra', label: 'Algebra', levelId: 'grade-9' },
  { value: 'geometry', label: 'Geometry', levelId: 'grade-9' },
  { value: 'biology', label: 'Biology', levelId: 'grade-9' },
  { value: 'chemistry', label: 'Chemistry', levelId: 'grade-9' },
  { value: 'physics', label: 'Physics', levelId: 'grade-9' },
  { value: 'history', label: 'History', levelId: 'grade-9' },
  { value: 'geography', label: 'Geography', levelId: 'grade-9' },

  // Grade 10-12 subjects (High School)
  { value: 'literature', label: 'Literature', levelId: 'grade-10' },
  { value: 'calculus', label: 'Calculus', levelId: 'grade-10' },
  { value: 'statistics', label: 'Statistics', levelId: 'grade-10' },
  { value: 'biology-advanced', label: 'Advanced Biology', levelId: 'grade-10' },
  { value: 'chemistry-advanced', label: 'Advanced Chemistry', levelId: 'grade-10' },
  { value: 'physics-advanced', label: 'Advanced Physics', levelId: 'grade-10' },
  { value: 'world-history', label: 'World History', levelId: 'grade-10' },
  { value: 'economics', label: 'Economics', levelId: 'grade-10' },
  { value: 'literature', label: 'Literature', levelId: 'grade-11' },
  { value: 'calculus', label: 'Calculus', levelId: 'grade-11' },
  { value: 'statistics', label: 'Statistics', levelId: 'grade-11' },
  { value: 'biology-advanced', label: 'Advanced Biology', levelId: 'grade-11' },
  { value: 'chemistry-advanced', label: 'Advanced Chemistry', levelId: 'grade-11' },
  { value: 'physics-advanced', label: 'Advanced Physics', levelId: 'grade-11' },
  { value: 'world-history', label: 'World History', levelId: 'grade-11' },
  { value: 'economics', label: 'Economics', levelId: 'grade-11' },
  { value: 'literature', label: 'Literature', levelId: 'grade-12' },
  { value: 'calculus', label: 'Calculus', levelId: 'grade-12' },
  { value: 'statistics', label: 'Statistics', levelId: 'grade-12' },
  { value: 'biology-advanced', label: 'Advanced Biology', levelId: 'grade-12' },
  { value: 'chemistry-advanced', label: 'Advanced Chemistry', levelId: 'grade-12' },
  { value: 'physics-advanced', label: 'Advanced Physics', levelId: 'grade-12' },
  { value: 'world-history', label: 'World History', levelId: 'grade-12' },
  { value: 'economics', label: 'Economics', levelId: 'grade-12' },
];

// Mock Schools
export const MOCK_SCHOOLS: SchoolOption[] = [
  { value: 'riverside-elementary', label: 'Riverside Elementary School' },
  { value: 'oakwood-middle', label: 'Oakwood Middle School' },
  { value: 'lincoln-high', label: 'Lincoln High School' },
  { value: 'washington-academy', label: 'Washington Academy' },
  { value: 'jefferson-prep', label: 'Jefferson Preparatory School' },
  { value: 'maple-valley', label: 'Maple Valley School' },
  { value: 'pine-ridge', label: 'Pine Ridge School' },
  { value: 'greenwood-academy', label: 'Greenwood Academy' },
  { value: 'heritage-high', label: 'Heritage High School' },
  { value: 'summit-school', label: 'Summit School' },
];

// Mock Parents (will be fetched from backend, simulated here)
export const MOCK_PARENTS: ParentOption[] = [
  { value: '1', label: 'Haris (haris@yopmail.com)' },
  { value: '2', label: 'Hamza (hamza@yopmail.com)' },
  { value: '3', label: 'Muneeb Hassan (muneeb.hassan@bytetb.io)' },
  { value: '4', label: 'Moivo (moivogajapre-6806@yopmail.com)' },
  { value: '10', label: 'Sarah (sarah@yopmail.com)' },
];

// Delay helper for simulating API calls
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
