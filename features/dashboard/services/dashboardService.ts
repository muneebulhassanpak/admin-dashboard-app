import { MOCK_DASHBOARD_DATA } from "../utils/constants";
import type { DashboardData } from "../types";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const dashboardService = {
  /**
   * Fetch complete dashboard data
   * Simulates API call with 600ms delay
   */
  async getDashboardData(): Promise<DashboardData> {
    await delay(600);
    return MOCK_DASHBOARD_DATA;
  },

  /**
   * Refresh dashboard data
   * Simulates API call with 400ms delay
   */
  async refreshDashboard(): Promise<DashboardData> {
    await delay(400);
    return MOCK_DASHBOARD_DATA;
  },
};
