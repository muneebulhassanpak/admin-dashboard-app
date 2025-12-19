/**
 * Complaint Center Hook
 * Handles all complaint management functionality and state
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { complaintService } from '../services/complaintService';
import type { Complaint, UseComplaintCenterReturn, ComplaintStatus } from '../types';
import { DEFAULT_PAGE_SIZE } from '../utils/constants';

export function useComplaintCenter(): UseComplaintCenterReturn {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | 'all'>('all');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(DEFAULT_PAGE_SIZE);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch complaints based on current filters, search, and pagination
  const fetchComplaints = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await complaintService.getComplaints({
        page,
        pageSize,
        search: searchQuery,
        status: statusFilter === 'all' ? undefined : statusFilter,
      });

      setComplaints(response.data);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, searchQuery, statusFilter]);

  // Initial fetch and refetch on dependencies change
  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [searchQuery, statusFilter]);

  // Update complaint status
  const updateComplaintStatus = async (
    id: string,
    status: ComplaintStatus
  ): Promise<void> => {
    try {
      setUpdating(id);
      setError(null);

      await complaintService.updateComplaintStatus(id, status);

      // Refresh the complaint list after update
      await fetchComplaints();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update complaint status');
      throw err;
    } finally {
      setUpdating(null);
    }
  };

  // Delete complaint
  const deleteComplaint = async (id: string): Promise<void> => {
    try {
      setDeleting(id);
      setError(null);

      await complaintService.deleteComplaint(id);

      // Refresh the complaint list after deletion
      await fetchComplaints();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete complaint');
      throw err;
    } finally {
      setDeleting(null);
    }
  };

  // Refresh complaints manually
  const refreshComplaints = async (): Promise<void> => {
    await fetchComplaints();
  };

  return {
    complaints,
    loading,
    updating,
    deleting,
    error,
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
    },
    searchQuery,
    statusFilter,
    setSearchQuery,
    setStatusFilter,
    setPage,
    updateComplaintStatus,
    deleteComplaint,
    refreshComplaints,
  };
}
