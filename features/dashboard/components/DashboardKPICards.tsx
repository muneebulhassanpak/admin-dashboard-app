"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  GraduationCap,
  DollarSign,
  MessageSquare,
  FolderOpen,
  Activity,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import type { DashboardKPICardsProps } from "../types";

type KPICardProps = {
  title: string;
  value: string;
  icon: typeof Users;
  description: string;
  trend?: "up" | "down";
  color: string;
  bgColor: string;
};

export function DashboardKPICards({ kpi }: DashboardKPICardsProps) {
  const kpiCards: KPICardProps[] = [
    {
      title: "Total Users",
      value: kpi.totalUsers.toLocaleString(),
      icon: Users,
      description: `+${kpi.userGrowthPercentage}% from last month`,
      trend: "up",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Active Learners",
      value: kpi.activeLearners.toLocaleString(),
      icon: GraduationCap,
      description: `${((kpi.activeLearners / kpi.totalUsers) * 100).toFixed(1)}% engagement rate`,
      trend: "up",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Monthly Revenue",
      value: `$${kpi.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      description: `+${kpi.revenueGrowthPercentage}% from last month`,
      trend: "up",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/20",
    },
    {
      title: "Active AI Sessions",
      value: kpi.activeAISessions.toLocaleString(),
      icon: Activity,
      description: "Live tutoring sessions",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <div className={`${card.bgColor} p-2 rounded-lg`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                {card.trend === "up" && (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                )}
                {card.trend === "down" && (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                {card.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
