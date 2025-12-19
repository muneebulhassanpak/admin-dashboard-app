/**
 * User Management Hook
 * Handles all user management functionality and state
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { userManagementService } from '../services/userManagementService';
import type { User, UseUserManagementReturn } from '../types';
import { DEFAULT_PAGE_SIZE } from '../utils/constants';

export function useUserManagement(): UseUserManagementReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(DEFAULT_PAGE_SIZE);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch users based on current pagination and search
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await userManagementService.getUsers({
        page,
        pageSize,
        search: searchQuery,
      });

      setUsers(response.data);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, searchQuery]);

  // Initial fetch and refetch on dependencies change
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Reset to page 1 when search changes
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [searchQuery]);

  // Delete user
  const deleteUser = async (id: string): Promise<void> => {
    try {
      setDeleting(id);
      setError(null);

      await userManagementService.deleteUser(id);

      // Refresh the user list after deletion
      await fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
      throw err;
    } finally {
      setDeleting(null);
    }
  };

  // Toggle user status
  const toggleUserStatus = async (id: string): Promise<void> => {
    try {
      setToggling(id);
      setError(null);

      await userManagementService.toggleUserStatus(id);

      // Refresh the user list after toggle
      await fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle user status');
      throw err;
    } finally {
      setToggling(null);
    }
  };

  // Refresh users manually
  const refreshUsers = async (): Promise<void> => {
    await fetchUsers();
  };

  return {
    users,
    loading,
    deleting,
    toggling,
    error,
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
    },
    searchQuery,
    setSearchQuery,
    setPage,
    deleteUser,
    toggleUserStatus,
    refreshUsers,
  };
}
