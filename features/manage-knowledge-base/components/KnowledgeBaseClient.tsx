/**
 * Knowledge Base Client Component
 * Admin interface for managing knowledge base files
 */

'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Upload, RefreshCw, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useKnowledgeBase } from '../hooks/useKnowledgeBase';
import { KnowledgeBaseTable } from './KnowledgeBaseTable';
import { FileType, EducationLevel, Subject } from '../types';
import { FILE_TYPE_LABELS } from '../utils/constants';
import type { KnowledgeBaseFile } from '../types';

export function KnowledgeBaseClient() {
  const {
    files,
    stats,
    filters,
    pagination,
    totalFiles,
    pageCount,
    loading,
    statsLoading,
    deleting,
    updating,
    error,
    deleteFile,
    downloadFile,
    updateFilters,
    resetFilters,
    updatePagination,
    refresh,
  } = useKnowledgeBase();

  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'top-center',
      });
    }
  }, [error]);

  const handleEditFile = (file: KnowledgeBaseFile) => {
    toast.info('Edit File', {
      description: `Editing ${file.fileName} (feature coming soon)`,
      position: 'top-center',
    });
  };

  const handleDeleteFile = async (id: string) => {
    try {
      await deleteFile(id);
      toast.success('File deleted successfully', {
        position: 'top-center',
      });
    } catch (err) {
      // Error handled by useEffect
    }
  };

  const handleDownloadFile = async (id: string, fileName: string) => {
    try {
      await downloadFile(id, fileName);
      toast.success('File downloaded successfully', {
        position: 'top-center',
      });
    } catch (err) {
      // Error handled by useEffect
    }
  };

  const handleUploadFile = () => {
    toast.info('Upload File', {
      description: 'File upload modal coming soon',
      position: 'top-center',
    });
  };

  const handleSearch = () => {
    updateFilters({ search: searchInput });
  };

  const handleClearSearch = () => {
    setSearchInput('');
    updateFilters({ search: '' });
  };

  const handleRefresh = () => {
    refresh();
    toast.success('Knowledge base refreshed', {
      position: 'top-center',
    });
  };

  const handleResetFilters = () => {
    resetFilters();
    setSearchInput('');
    toast.success('Filters reset', {
      position: 'top-center',
    });
  };

  const hasActiveFilters =
    filters.fileType !== 'all' ||
    filters.level !== 'all' ||
    filters.subject !== 'all' ||
    filters.search !== '';

  const formatSizeKB = (sizeKB: number): string => {
    if (sizeKB < 1024) {
      return `${sizeKB} KB`;
    }
    return `${(sizeKB / 1024).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Manage Knowledge Base</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Upload, organize, and manage educational content for the AI tutor
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button onClick={handleUploadFile}>
            <Upload className="h-4 w-4" />
            Upload File
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Total Files</p>
          {statsLoading ? (
            <Skeleton className="h-8 w-12 mt-1" />
          ) : (
            <p className="text-2xl font-bold mt-1">{stats?.totalFiles || 0}</p>
          )}
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Total Size</p>
          {statsLoading ? (
            <Skeleton className="h-8 w-20 mt-1" />
          ) : (
            <p className="text-2xl font-bold mt-1">
              {formatSizeKB(stats?.totalSizeKB || 0)}
            </p>
          )}
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Content Files</p>
          {statsLoading ? (
            <Skeleton className="h-8 w-12 mt-1" />
          ) : (
            <p className="text-2xl font-bold mt-1">
              {stats?.filesByType[FileType.CONTENT] || 0}
            </p>
          )}
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Question Banks</p>
          {statsLoading ? (
            <Skeleton className="h-8 w-12 mt-1" />
          ) : (
            <p className="text-2xl font-bold mt-1">
              {stats?.filesByType[FileType.QUESTION_BANK] || 0}
            </p>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-lg border p-4">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search files by name or description..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                className="pl-9 pr-9"
              />
              {searchInput && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
                  onClick={handleClearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap gap-2">
            <Select
              value={filters.fileType || 'all'}
              onValueChange={(value) =>
                updateFilters({ fileType: value === 'all' ? 'all' : (value as FileType) })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Object.entries(FILE_TYPE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.level || 'all'}
              onValueChange={(value) =>
                updateFilters({ level: value === 'all' ? 'all' : (value as EducationLevel) })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {Object.values(EducationLevel).map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.subject || 'all'}
              onValueChange={(value) =>
                updateFilters({ subject: value === 'all' ? 'all' : (value as Subject) })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {Object.values(Subject).map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="outline" onClick={handleResetFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Knowledge Base Table */}
      <KnowledgeBaseTable
        files={files}
        loading={loading}
        updating={updating}
        deleting={deleting}
        pagination={pagination}
        pageCount={pageCount}
        totalFiles={totalFiles}
        onEditFile={handleEditFile}
        onDeleteFile={handleDeleteFile}
        onDownloadFile={handleDownloadFile}
        onPaginationChange={updatePagination}
      />

      {/* Help Text */}
      <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-2">Tips for Managing Knowledge Base:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>Upload PDF files for content, question banks, assessments, and resources</li>
          <li>Use descriptive file names to make searching easier</li>
          <li>Add descriptions to categorize and organize files effectively</li>
          <li>Keep files under 10MB for optimal performance</li>
          <li>Regular updates to content ensure the AI tutor has current information</li>
        </ul>
      </div>
    </div>
  );
}
