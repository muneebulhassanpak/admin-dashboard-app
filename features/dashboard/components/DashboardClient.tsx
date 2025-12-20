"use client";

import { useState } from "react";
import type { DashboardData } from "../types";
import {
  DashboardKPICards,
  RevenueChart,
  UserGrowthChart,
  RecentActivityFeed,
  SystemHealthStatus,
  PricingDistributionChart,
  PopularSubjectsChart,
} from "./";

interface DashboardClientProps {
  initialData: DashboardData;
}

export function DashboardClient({ initialData }: DashboardClientProps) {
  const [dashboardData] = useState<DashboardData>(initialData);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s your AI Tutor platform overview.
        </p>
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
