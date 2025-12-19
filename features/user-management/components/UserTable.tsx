
'use client';

import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  ChevronDown,
  ChevronRight,
  Trash2,
  Pencil,
  Search,
  Loader,
} from 'lucide-react';
import type { User } from '../types';
import { UserType } from '../types';
import { DeleteUserModal } from './DeleteUserModal';
import { TableSkeleton } from '@/components/skeletons';

interface UserTableProps {
  users: User[];
  loading: boolean;
  deleting: string | null;
  toggling: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onDeleteUser: (id: string) => Promise<void>;
  onToggleStatus: (id: string) => Promise<void>;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
}

export function UserTable({
  users,
  loading,
  deleting,
  toggling,
  searchQuery,
  onSearchChange,
  onDeleteUser,
  onToggleStatus,
  pagination,
  onPageChange,
}: UserTableProps) {
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    user: User | null;
  }>({ open: false, user: null });

  const handleDeleteClick = (user: User) => {
    setDeleteModal({ open: true, user });
  };

  const handleDeleteConfirm = async () => {
    if (deleteModal.user) {
      await onDeleteUser(deleteModal.user.id);
      setDeleteModal({ open: false, user: null });
    }
  };

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: 'expander',
        header: () => null,
        cell: ({ row }) => {
          const hasChildren = row.original.children && row.original.children.length > 0;
          const isChild = row.depth > 0;

          if (isChild || !hasChildren) return null;

          return (
            <Button
              variant="ghost"
              size="sm"
              onClick={row.getToggleExpandedHandler()}
              className="h-8 w-8 p-0"
            >
              {row.getIsExpanded() ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          );
        },
        size: 40,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ getValue }) => (
          <span className="font-medium">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'username',
        header: 'Username',
      },
      {
        accessorKey: 'userType',
        header: 'Type',
        cell: ({ getValue }) => {
          const type = getValue() as UserType;
          return (
            <Badge variant={type === UserType.PARENT ? 'default' : 'secondary'}>
              {type}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'level',
        header: 'Level',
        cell: ({ getValue }) => (getValue() as string) || '-',
      },
      {
        accessorKey: 'paid',
        header: 'Paid',
        cell: ({ getValue }) => {
          const paid = getValue() as boolean;
          return (
            <Badge variant={paid ? 'default' : 'outline'}>
              {paid ? 'Yes' : 'No'}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'plan',
        header: 'Plan',
      },
      {
        id: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const user = row.original;
          const isToggling = toggling === user.id;

          return (
            <div className="flex items-center gap-2">
              {isToggling ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Switch
                  checked={user.status}
                  onCheckedChange={() => onToggleStatus(user.id)}
                  disabled={isToggling}
                />
              )}
              <span className="text-xs text-muted-foreground">
                {user.status ? 'Active' : 'Inactive'}
              </span>
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const user = row.original;
          const isDeleting = deleting === user.id;

          return (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-muted"
                disabled={isDeleting}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                onClick={() => handleDeleteClick(user)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          );
        },
      },
    ],
    [deleting, toggling, onToggleStatus]
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.children,
    getRowId: (row) => row.id,
  });

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by email or username..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          {loading ? (
            <TableSkeleton columns={columns.length} rows={5} showHeader={false} />
          ) : (
            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className={row.depth > 0 ? 'bg-muted/50' : ''}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          )}
        </Table>
      </div>

      {/* Pagination */}
      {!loading && users.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.pageSize + 1} to{' '}
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{' '}
            {pagination.total} users
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

      {/* Delete Modal */}
      <DeleteUserModal
        user={deleteModal.user}
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, user: null })}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleting === deleteModal.user?.id}
      />
    </div>
  );
}
