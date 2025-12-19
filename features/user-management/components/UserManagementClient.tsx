'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useUserManagement } from '../hooks';
import { UserTable } from './UserTable';
import { Button } from '@/components/ui/button';
import { AddParentLearnerModal } from '@/features/parent-learner-management/components';
import { BadgePlus } from 'lucide-react';

export function UserManagementClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    users,
    loading,
    deleting,
    toggling,
    error,
    pagination,
    searchQuery,
    setSearchQuery,
    setPage,
    deleteUser,
    toggleUserStatus,
    refreshUsers,
  } = useUserManagement();

  // Handle errors with toast notifications
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'top-center',
      });
    }
  }, [error]);

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      toast.success('User deleted successfully', {
        position: 'top-center',
      });
    } catch (err) {
      // Error is already handled in the hook and shown via useEffect
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleUserStatus(id);
      toast.success('User status updated successfully', {
        position: 'top-center',
      });
    } catch (err) {
      // Error is already handled in the hook and shown via useEffect
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">User Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage parent accounts and their learners
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <BadgePlus/>
          Add Parent / Learner
        </Button>
      </div>

      <UserTable
        users={users}
        loading={loading}
        deleting={deleting}
        toggling={toggling}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onDeleteUser={handleDeleteUser}
        onToggleStatus={handleToggleStatus}
        pagination={pagination}
        onPageChange={setPage}
      />

      <AddParentLearnerModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSuccess={refreshUsers}
      />
    </div>
  );
}
