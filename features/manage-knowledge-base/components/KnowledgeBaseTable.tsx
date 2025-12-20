/**
 * Knowledge Base Table Component
 * Table for displaying and managing knowledge base files with TanStack Table
 */

'use client';

import { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Download,
  FileText,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import type { KnowledgeBaseFile, PaginationState } from '../types';
import { FileType } from '../types';
import { FILE_TYPE_LABELS, FILE_TYPE_COLORS } from '../utils/constants';
import { formatFileSize, formatDate } from '../utils/formatters';
import { TableSkeleton } from '@/components/skeletons';

interface KnowledgeBaseTableProps {
  files: KnowledgeBaseFile[];
  loading: boolean;
  updating: string | null;
  deleting: string | null;
  pagination: PaginationState;
  pageCount: number;
  totalFiles: number;
  onEditFile: (file: KnowledgeBaseFile) => void;
  onDeleteFile: (id: string) => void;
  onDownloadFile: (id: string, fileName: string) => void;
  onPaginationChange: (pagination: Partial<PaginationState>) => void;
}

export function KnowledgeBaseTable({
  files,
  loading,
  updating,
  deleting,
  pagination,
  pageCount,
  totalFiles,
  onEditFile,
  onDeleteFile,
  onDownloadFile,
  onPaginationChange,
}: KnowledgeBaseTableProps) {
  const columns = useMemo<ColumnDef<KnowledgeBaseFile>[]>(
    () => [
      {
        accessorKey: 'fileName',
        header: 'File Name',
        cell: ({ row }) => {
          const file = row.original;
          return (
            <div className="w-[280px]">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="font-medium truncate" title={file.fileName}>
                  {file.fileName}
                </span>
              </div>
              {file.description && (
                <p className="text-xs text-muted-foreground truncate mt-1" title={file.description}>
                  {file.description}
                </p>
              )}
            </div>
          );
        },
      },
      {
        id: 'type',
        header: 'Type',
        cell: ({ row }) => {
          const file = row.original;
          const colorClass = FILE_TYPE_COLORS[file.fileType] || 'bg-gray-100 text-gray-800';
          return (
            <div className="w-[120px]">
              <Badge variant="outline" className={`${colorClass} border-0`}>
                {FILE_TYPE_LABELS[file.fileType]}
              </Badge>
            </div>
          );
        },
      },
      {
        accessorKey: 'level',
        header: 'Level',
        cell: ({ getValue }) => {
          const level = getValue() as string;
          return (
            <div className="w-[110px]">
              <span className="text-sm">{level}</span>
            </div>
          );
        },
      },
      {
        accessorKey: 'subject',
        header: 'Subject',
        cell: ({ getValue }) => {
          const subject = getValue() as string;
          return (
            <div className="w-[110px]">
              <span className="text-sm">{subject}</span>
            </div>
          );
        },
      },
      {
        id: 'size',
        header: 'Size',
        cell: ({ row }) => {
          const file = row.original;
          return (
            <div className="w-[90px]">
              <span className="text-sm text-muted-foreground">
                {formatFileSize(file.sizeKB)}
              </span>
            </div>
          );
        },
      },
      {
        id: 'lastModified',
        header: 'Last Modified',
        cell: ({ row }) => {
          const file = row.original;
          return (
            <div className="w-[120px]">
              <span className="text-sm text-muted-foreground">
                {formatDate(file.lastModified)}
              </span>
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: () => <div className="w-full text-center">Actions</div>,
        cell: ({ row }) => {
          const file = row.original;
          const isDeleting = deleting === file.id;
          const isUpdating = updating === file.id;

          return (
            <div className="w-[80px] flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    disabled={isDeleting || isUpdating}
                    loading={isDeleting}
                  >  
                  <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onDownloadFile(file.id, file.fileName)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onEditFile(file)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Metadata
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onDeleteFile(file.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [updating, deleting, onEditFile, onDeleteFile, onDownloadFile]
  );

  const table = useReactTable({
    data: files,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.id,
    manualPagination: true,
    pageCount,
    state: {
      pagination,
    },
  });

  const canGoPrevious = pagination.pageIndex > 0;
  const canGoNext = pagination.pageIndex < pageCount - 1;

  return (
    <div className="space-y-4">
      <div className="rounded-lg border">
        <div className="relative w-full overflow-x-auto">
          <table className="caption-bottom text-sm w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            {loading ? (
              <TableSkeleton
                columns={columns.length}
                rows={pagination.pageSize}
                showHeader={false}
                columnWidths={[
                  'w-[280px]',
                  'w-[120px]',
                  'w-[110px]',
                  'w-[110px]',
                  'w-[90px]',
                  'w-[120px]',
                  'w-[80px]',
                ]}
              />
            ) : (
              <TableBody>
                {table.getRowModel().rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                      No files found
                    </TableCell>
                  </TableRow>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            )}
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {!loading && totalFiles > 0 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Showing {pagination.pageIndex * pagination.pageSize + 1} to{' '}
            {Math.min((pagination.pageIndex + 1) * pagination.pageSize, totalFiles)} of {totalFiles} files
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPaginationChange({ pageIndex: 0 })}
              disabled={!canGoPrevious}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPaginationChange({ pageIndex: pagination.pageIndex - 1 })}
              disabled={!canGoPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium">
              Page {pagination.pageIndex + 1} of {pageCount}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPaginationChange({ pageIndex: pagination.pageIndex + 1 })}
              disabled={!canGoNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPaginationChange({ pageIndex: pageCount - 1 })}
              disabled={!canGoNext}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
