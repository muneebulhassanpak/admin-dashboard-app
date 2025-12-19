/**
 * Knowledge Base Types
 * Type definitions for the knowledge base management feature
 */

export enum FileType {
  CONTENT = 'content',
  QUESTION_BANK = 'question_bank',
  ASSESSMENT = 'assessment',
  RESOURCE = 'resource',
}

export enum EducationLevel {
  PRIMARY_1 = 'Primary 1',
  PRIMARY_2 = 'Primary 2',
  PRIMARY_3 = 'Primary 3',
  PRIMARY_4 = 'Primary 4',
  PRIMARY_5 = 'Primary 5',
  PRIMARY_6 = 'Primary 6',
  SECONDARY_1 = 'Secondary 1',
  SECONDARY_2 = 'Secondary 2',
  SECONDARY_3 = 'Secondary 3',
  SECONDARY_4 = 'Secondary 4',
}

export enum Subject {
  SCIENCE = 'Science',
  MATHEMATICS = 'Mathematics',
  ENGLISH = 'English',
  HISTORY = 'History',
  GEOGRAPHY = 'Geography',
  PHYSICS = 'Physics',
  CHEMISTRY = 'Chemistry',
  BIOLOGY = 'Biology',
}

export interface KnowledgeBaseFile {
  id: string;
  fileName: string;
  fileType: FileType;
  level: EducationLevel;
  subject: Subject;
  sizeKB: number;
  uploadedAt: Date;
  lastModified: Date;
  description?: string;
}

export interface KnowledgeBaseFilters {
  fileType?: FileType | 'all';
  level?: EducationLevel | 'all';
  subject?: Subject | 'all';
  search?: string;
}

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  pageCount: number;
}

export interface KnowledgeBaseStats {
  totalFiles: number;
  totalSizeKB: number;
  filesByType: Record<FileType, number>;
  filesBySubject: Record<string, number>;
}

export interface CreateFileDTO {
  fileName: string;
  fileType: FileType;
  level: EducationLevel;
  subject: Subject;
  sizeKB: number;
  description?: string;
}

export interface UpdateFileDTO extends Partial<CreateFileDTO> {
  id: string;
}
