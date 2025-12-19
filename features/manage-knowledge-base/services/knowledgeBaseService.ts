/**
 * Knowledge Base Service
 * Handles all knowledge base file operations
 */

import {
  type KnowledgeBaseFile,
  type KnowledgeBaseFilters,
  type KnowledgeBaseStats,
  type CreateFileDTO,
  type UpdateFileDTO,
  type PaginationState,
  type PaginatedResponse,
  FileType,
} from '../types';
import { MOCK_KNOWLEDGE_BASE_FILES } from '../utils/constants';

// Simulated delay for API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory storage (simulating database)
let filesStore: KnowledgeBaseFile[] = [...MOCK_KNOWLEDGE_BASE_FILES];

/**
 * Fetch all knowledge base files with optional filters and pagination
 */
export async function fetchFiles(
  filters?: KnowledgeBaseFilters,
  pagination?: PaginationState
): Promise<PaginatedResponse<KnowledgeBaseFile>> {
  await delay(800);

  let filteredFiles = [...filesStore];

  // Apply filters
  if (filters?.fileType && filters.fileType !== 'all') {
    filteredFiles = filteredFiles.filter((file) => file.fileType === filters.fileType);
  }

  if (filters?.level && filters.level !== 'all') {
    filteredFiles = filteredFiles.filter((file) => file.level === filters.level);
  }

  if (filters?.subject && filters.subject !== 'all') {
    filteredFiles = filteredFiles.filter((file) => file.subject === filters.subject);
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filteredFiles = filteredFiles.filter(
      (file) =>
        file.fileName.toLowerCase().includes(searchLower) ||
        file.description?.toLowerCase().includes(searchLower)
    );
  }

  // Sort by last modified (newest first)
  filteredFiles.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());

  const total = filteredFiles.length;

  // Apply pagination
  if (pagination) {
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    filteredFiles = filteredFiles.slice(start, end);
  }

  return {
    data: filteredFiles,
    total,
    pageCount: pagination ? Math.ceil(total / pagination.pageSize) : 1,
  };
}

/**
 * Fetch statistics about the knowledge base
 */
export async function fetchStats(): Promise<KnowledgeBaseStats> {
  await delay(500);

  const totalFiles = filesStore.length;
  const totalSizeKB = filesStore.reduce((sum, file) => sum + file.sizeKB, 0);

  const filesByType: Record<FileType, number> = {
    [FileType.CONTENT]: 0,
    [FileType.QUESTION_BANK]: 0,
    [FileType.ASSESSMENT]: 0,
    [FileType.RESOURCE]: 0,
  };

  const filesBySubject: Record<string, number> = {};

  filesStore.forEach((file) => {
    filesByType[file.fileType]++;
    filesBySubject[file.subject] = (filesBySubject[file.subject] || 0) + 1;
  });

  return {
    totalFiles,
    totalSizeKB,
    filesByType,
    filesBySubject,
  };
}

/**
 * Upload a new file to the knowledge base
 */
export async function uploadFile(data: CreateFileDTO): Promise<KnowledgeBaseFile> {
  await delay(1200);

  const newFile: KnowledgeBaseFile = {
    id: String(Date.now()),
    ...data,
    uploadedAt: new Date(),
    lastModified: new Date(),
  };

  filesStore.push(newFile);
  return newFile;
}

/**
 * Update an existing file's metadata
 */
export async function updateFile(data: UpdateFileDTO): Promise<KnowledgeBaseFile> {
  await delay(1000);

  const fileIndex = filesStore.findIndex((file) => file.id === data.id);
  if (fileIndex === -1) {
    throw new Error('File not found');
  }

  const updatedFile: KnowledgeBaseFile = {
    ...filesStore[fileIndex],
    ...data,
    lastModified: new Date(),
  };

  filesStore[fileIndex] = updatedFile;
  return updatedFile;
}

/**
 * Delete a file from the knowledge base
 */
export async function deleteFile(id: string): Promise<void> {
  await delay(800);

  const fileIndex = filesStore.findIndex((file) => file.id === id);
  if (fileIndex === -1) {
    throw new Error('File not found');
  }

  filesStore.splice(fileIndex, 1);
}

/**
 * Download a file (simulated)
 */
export async function downloadFile(id: string): Promise<Blob> {
  await delay(500);

  const file = filesStore.find((f) => f.id === id);
  if (!file) {
    throw new Error('File not found');
  }

  // Simulate file download by creating a blob
  return new Blob(['File content'], { type: 'application/pdf' });
}
