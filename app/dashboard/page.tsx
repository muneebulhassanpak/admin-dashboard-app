"use client";

import { useDashboard } from "@/features/dashboard/hooks";
import {
  DashboardKPICards,
  RevenueChart,
  UserGrowthChart,
  RecentActivityFeed,
  SystemHealthStatus,
  PricingDistributionChart,
  PopularSubjectsChart,
  DashboardSkeleton,
} from "@/features/dashboard/components";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function DashboardPage() {
  const { dashboardData, loading, error, refetch } = useDashboard();

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>{error}</span>
          <Button variant="outline" size="sm" onClick={refetch}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!dashboardData) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header with Refresh Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s your AI Tutor platform overview.
          </p>
        </div>
        <Button variant="outline" onClick={refetch}>
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* KPI Cards - 4 in one row */}
      <DashboardKPICards kpi={dashboardData.kpi} />

      {/* Main Charts Section - Revenue & User Growth */}
      <div className="grid gap-4 md:grid-cols-2">
        <RevenueChart data={dashboardData.revenueData} />
        <UserGrowthChart data={dashboardData.userGrowthData} />
      </div>

      {/* Donut & Bar Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <PricingDistributionChart plans={dashboardData.topPricingPlans} />
        <PopularSubjectsChart subjects={dashboardData.popularSubjects} />
      </div>

      {/* Activity Feed & System Health */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <RecentActivityFeed activities={dashboardData.recentActivity} />
        </div>
        <SystemHealthStatus healthMetrics={dashboardData.systemHealth} />
      </div>
    </div>
  );
}
