"use client";

import { useState, useEffect, useCallback } from "react";
import { dashboardService } from "../services";
import type { DashboardData, UseDashboardReturn } from "../types";

export function useDashboard(): UseDashboardReturn {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dashboardService.getDashboardData();
      setDashboardData(data);
    } catch (err) {
      setError("Failed to fetch dashboard data. Please try again.");
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      const data = await dashboardService.refreshDashboard();
      setDashboardData(data);
    } catch (err) {
      setError("Failed to refresh dashboard data. Please try again.");
      console.error("Dashboard refresh error:", err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    dashboardData,
    loading,
    refreshing,
    error,
    refetch,
  };
}
