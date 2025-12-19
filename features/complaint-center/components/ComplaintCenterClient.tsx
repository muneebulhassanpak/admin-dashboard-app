/**
 * Complaint Center Client Component
 * Main component that integrates the hook and table
 */

'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { useComplaintCenter } from '../hooks';
import { ComplaintTable } from './ComplaintTable';

export function ComplaintCenterClient() {
  const {
    complaints,
    loading,
    updating,
    deleting,
    error,
    pagination,
    searchQuery,
    statusFilter,
    setSearchQuery,
    setStatusFilter,
    setPage,
    updateComplaintStatus,
    deleteComplaint,
  } = useComplaintCenter();

  // Handle errors with toast notifications
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'top-center',
      });
    }
  }, [error]);

  const handleUpdateStatus = async (id: string, status: any) => {
    try {
      await updateComplaintStatus(id, status);
      toast.success('Complaint status updated successfully', {
        position: 'top-center',
      });
    } catch (err) {
      // Error is already handled in the hook and shown via useEffect
    }
  };

  const handleDeleteComplaint = async (id: string) => {
    try {
      await deleteComplaint(id);
      toast.success('Complaint deleted successfully', {
        position: 'top-center',
      });
    } catch (err) {
      // Error is already handled in the hook and shown via useEffect
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Complaint Center</h1>
        <p className="text-sm text-muted-foreground mt-1">
          One place for all issues related to your bot
        </p>
      </div>

      <ComplaintTable
        complaints={complaints}
        loading={loading}
        updating={updating}
        deleting={deleting}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        onSearchChange={setSearchQuery}
        onStatusFilterChange={setStatusFilter}
        onUpdateStatus={handleUpdateStatus}
        onDeleteComplaint={handleDeleteComplaint}
        pagination={pagination}
        onPageChange={setPage}
      />
    </div>
  );
}
