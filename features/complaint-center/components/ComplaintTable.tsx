'use client';

import { useMemo, useState, useCallback } from 'react';
import {
  useReactTable,
  getCoreRowModel,
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, MoreHorizontal, Eye, CheckCircle, XCircle, Loader } from 'lucide-react';
import type { Complaint, ComplaintStatus } from '../types';
import { ComplaintStatus as ComplaintStatusEnum, ComplaintPriority } from '../types';
import { STATUS_FILTER_OPTIONS } from '../utils/constants';
import { formatDate } from '../utils/formatters';
import { getStatusBadgeVariant, getStatusLabel, getPriorityBadgeVariant } from '../utils/statusHelpers';
import { TableSkeleton } from '@/components/skeletons';
import { ComplaintDetailsModal } from './ComplaintDetailsModal';

interface ComplaintTableProps {
  complaints: Complaint[];
  loading: boolean;
  updating: string | null;
  deleting: string | null;
  searchQuery: string;
  statusFilter: ComplaintStatus | 'all';
  onSearchChange: (query: string) => void;
  onStatusFilterChange: (status: ComplaintStatus | 'all') => void;
  onUpdateStatus: (id: string, status: ComplaintStatus) => Promise<void>;
  onDeleteComplaint: (id: string) => Promise<void>;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
}

export function ComplaintTable({
  complaints,
  loading,
  updating,
  deleting,
  searchQuery,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onUpdateStatus,
  onDeleteComplaint,
  pagination,
  onPageChange,
}: ComplaintTableProps) {
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const handleViewDetails = useCallback((complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setDetailsModalOpen(true);
  }, []);

  const columns = useMemo<ColumnDef<Complaint>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Date',
        size: 8,
        cell: ({ getValue }) => (
          <div className="min-w-[90px]">
            <span className="text-sm">{formatDate(getValue() as string)}</span>
          </div>
        ),
      },
      {
        accessorKey: 'complaint',
        header: 'Complaint',
        size: 30,
        cell: ({ getValue }) => {
          const text = getValue() as string;
          return (
            <div className="min-w-[220px] max-w-[500px]">
              <p className="truncate text-sm font-medium" title={text}>{text}</p>
            </div>
          );
        },
      },
      {
        accessorKey: 'flaggedMessage',
        header: 'Flagged Message',
        size: 30,
        cell: ({ getValue }) => {
          const text = getValue() as string;
          return (
            <div className="min-w-[200px] max-w-[450px]">
              <p className="truncate text-sm text-muted-foreground italic" title={text}>
                &ldquo;{text}&rdquo;
              </p>
            </div>
          );
        },
      },
      {
        accessorKey: 'studentUsername',
        header: 'Student',
        size: 10,
        cell: ({ getValue }) => (
          <div className="min-w-[90px]">
            <span className="text-sm font-medium truncate block">{getValue() as string}</span>
          </div>
        ),
      },
      {
        accessorKey: 'parentEmail',
        header: 'Parent Email',
        size: 14,
        cell: ({ getValue }) => (
          <div className="min-w-[140px] max-w-[220px]">
            <span className="text-sm text-muted-foreground truncate block">{getValue() as string}</span>
          </div>
        ),
      },
      {
        id: 'status',
        header: 'Status',
        size: 8,
        cell: ({ row }) => {
          const complaint = row.original;
          const isUpdating = updating === complaint.id;

          if (isUpdating) {
            return (
              <div className="min-w-[90px] flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
              </div>
            );
          }

          return (
            <div className="min-w-[90px]">
              <Badge variant={getStatusBadgeVariant(complaint.status)}>
                {getStatusLabel(complaint.status)}
              </Badge>
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 3,
        cell: ({ row }) => {
          const complaint = row.original;
          const isDeleting = deleting === complaint.id;
          const isUpdating = updating === complaint.id;

          return (
            <div className="min-w-[50px]">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    disabled={isDeleting || isUpdating}
                  >
                    {isDeleting ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <MoreHorizontal className="h-4 w-4" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleViewDetails(complaint)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {complaint.status !== ComplaintStatusEnum.RESOLVED && (
                    <DropdownMenuItem
                      onClick={() => onUpdateStatus(complaint.id, ComplaintStatusEnum.RESOLVED)}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Resolved
                    </DropdownMenuItem>
                  )}
                  {complaint.status !== ComplaintStatusEnum.IN_REVIEW && (
                    <DropdownMenuItem
                      onClick={() => onUpdateStatus(complaint.id, ComplaintStatusEnum.IN_REVIEW)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Mark as In Review
                    </DropdownMenuItem>
                  )}
                  {complaint.status !== ComplaintStatusEnum.DISMISSED && (
                    <DropdownMenuItem
                      onClick={() => onUpdateStatus(complaint.id, ComplaintStatusEnum.DISMISSED)}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Dismiss
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onDeleteComplaint(complaint.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [updating, deleting, onUpdateStatus, onDeleteComplaint, handleViewDetails]
  );

  const table = useReactTable({
    data: complaints,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search complaints, students, or messages..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => onStatusFilterChange(value as ComplaintStatus | 'all')}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_FILTER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="w-full rounded-lg border">
        <div className="relative w-full overflow-x-auto">
          <table className="w-full caption-bottom text-sm table-fixed">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="whitespace-nowrap"
                      style={{ width: `${header.column.getSize()}%` }}
                    >
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
                rows={5}
                showHeader={false}
                columnWidths={['8%', '30%', '30%', '10%', '14%', '8%', '3%']}
              />
            ) : (
              <TableBody>
                {table.getRowModel().rows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No complaints found
                    </TableCell>
                  </TableRow>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={{ width: `${cell.column.getSize()}%` }}
                        >
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

      {/* Pagination */}
      {!loading && complaints.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.pageSize + 1} to{' '}
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{' '}
            {pagination.total} complaints
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Complaint Details Modal */}
      <ComplaintDetailsModal
        complaint={selectedComplaint}
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
      />
    </div>
  );
}
