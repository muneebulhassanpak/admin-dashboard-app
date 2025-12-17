/**
 * User Management Table Component
 */

'use client';

import { useState } from 'react';
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
  Loader2,
} from 'lucide-react';
import type { User } from '../types';
import { UserType } from '../types';
import { DeleteUserModal } from './DeleteUserModal';

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
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    user: User | null;
  }>({ open: false, user: null });

  const toggleRow = (userId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedRows(newExpanded);
  };

  const handleDeleteClick = (user: User) => {
    setDeleteModal({ open: true, user });
  };

  const handleDeleteConfirm = async () => {
    if (deleteModal.user) {
      try {
        await onDeleteUser(deleteModal.user.id);
        setDeleteModal({ open: false, user: null });
      } catch (error) {
        // Error is handled in the hook
      }
    }
  };

  const renderUserRow = (user: User, isChild = false) => {
    const hasChildren = user.children && user.children.length > 0;
    const isExpanded = expandedRows.has(user.id);
    const isDeleting = deleting === user.id;
    const isToggling = toggling === user.id;

    return (
      <>
        <TableRow key={user.id} className={isChild ? 'bg-muted/50' : ''}>
          <TableCell className="w-10">
            {!isChild && hasChildren && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleRow(user.id)}
                className="h-8 w-8 p-0"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            )}
          </TableCell>
          <TableCell className="font-medium">{user.email}</TableCell>
          <TableCell>{user.username}</TableCell>
          <TableCell>
            <Badge variant={user.userType === UserType.PARENT ? 'default' : 'secondary'}>
              {user.userType}
            </Badge>
          </TableCell>
          <TableCell>{user.level || '-'}</TableCell>
          <TableCell>
            <Badge variant={user.paid ? 'default' : 'outline'}>
              {user.paid ? 'Yes' : 'No'}
            </Badge>
          </TableCell>
          <TableCell>{user.plan}</TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              {isToggling ? (
                <Loader2 className="h-4 w-4 animate-spin" />
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
          </TableCell>
          <TableCell>
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
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </TableCell>
        </TableRow>

        {/* Render children if expanded */}
        {!isChild && isExpanded && hasChildren && (
          <>
            {user.children!.map((child) => renderUserRow(child, true))}
          </>
        )}
      </>
    );
  };

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
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => renderUserRow(user))
            )}
          </TableBody>
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
