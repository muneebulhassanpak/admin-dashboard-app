/**
 * useKnowledgeBase Hook
 * Manages knowledge base state and operations
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import type {
  KnowledgeBaseFile,
  KnowledgeBaseFilters,
  KnowledgeBaseStats,
  CreateFileDTO,
  UpdateFileDTO,
  PaginationState,
} from '../types';
import * as knowledgeBaseService from '../services/knowledgeBaseService';

export function useKnowledgeBase() {
  const [files, setFiles] = useState<KnowledgeBaseFile[]>([]);
  const [stats, setStats] = useState<KnowledgeBaseStats | null>(null);
  const [filters, setFilters] = useState<KnowledgeBaseFilters>({
    fileType: 'all',
    level: 'all',
    subject: 'all',
    search: '',
  });
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [totalFiles, setTotalFiles] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch files with current filters and pagination
  const loadFiles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await knowledgeBaseService.fetchFiles(filters, pagination);
      setFiles(response.data);
      setTotalFiles(response.total);
      setPageCount(response.pageCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load files');
    } finally {
      setLoading(false);
    }
  }, [filters, pagination]);

  // Fetch statistics
  const loadStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const data = await knowledgeBaseService.fetchStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Load files on mount and when filters change
  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  // Load stats on mount
  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // Upload a new file
  const uploadFile = useCallback(
    async (data: CreateFileDTO) => {
      try {
        setUploading(true);
        setError(null);
        await knowledgeBaseService.uploadFile(data);
        await Promise.all([loadFiles(), loadStats()]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to upload file');
        throw err;
      } finally {
        setUploading(false);
      }
    },
    [loadFiles, loadStats]
  );

  // Update file metadata
  const updateFile = useCallback(
    async (data: UpdateFileDTO) => {
      try {
        setUpdating(data.id);
        setError(null);
        await knowledgeBaseService.updateFile(data);
        await loadFiles();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update file');
        throw err;
      } finally {
        setUpdating(null);
      }
    },
    [loadFiles]
  );

  // Delete a file
  const deleteFile = useCallback(
    async (id: string) => {
      try {
        setDeleting(id);
        setError(null);
        await knowledgeBaseService.deleteFile(id);
        await Promise.all([loadFiles(), loadStats()]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete file');
        throw err;
      } finally {
        setDeleting(null);
      }
    },
    [loadFiles, loadStats]
  );

  // Download a file
  const downloadFile = useCallback(async (id: string, fileName: string) => {
    try {
      setError(null);
      const blob = await knowledgeBaseService.downloadFile(id);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download file');
      throw err;
    }
  }, []);

  // Update filters (and reset to first page)
  const updateFilters = useCallback((newFilters: Partial<KnowledgeBaseFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({
      fileType: 'all',
      level: 'all',
      subject: 'all',
      search: '',
    });
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, []);

  // Update pagination
  const updatePagination = useCallback((newPagination: Partial<PaginationState>) => {
    setPagination((prev) => ({ ...prev, ...newPagination }));
  }, []);

  return {
    files,
    stats,
    filters,
    pagination,
    totalFiles,
    pageCount,
    loading,
    statsLoading,
    uploading,
    updating,
    deleting,
    error,
    uploadFile,
    updateFile,
    deleteFile,
    downloadFile,
    updateFilters,
    resetFilters,
    updatePagination,
    refresh: loadFiles,
  };
}
