"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import type { SystemHealthStatusProps, SystemStatus } from "../types";

const statusConfig: Record<
  SystemStatus,
  {
    label: string;
    icon: typeof CheckCircle2;
    color: string;
    badgeClass: string;
  }
> = {
  operational: {
    label: "Operational",
    icon: CheckCircle2,
    color: "text-green-600 dark:text-green-400",
    badgeClass: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  },
  degraded: {
    label: "Degraded",
    icon: AlertTriangle,
    color: "text-yellow-600 dark:text-yellow-400",
    badgeClass: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
  },
  down: {
    label: "Down",
    icon: XCircle,
    color: "text-red-600 dark:text-red-400",
    badgeClass: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
  },
};

function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
  const diffHours = Math.floor(diffMins / 60);
  return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
}

export function SystemHealthStatus({
  healthMetrics,
}: SystemHealthStatusProps) {
  const overallStatus = healthMetrics.every((m) => m.status === "operational")
    ? "operational"
    : healthMetrics.some((m) => m.status === "down")
    ? "degraded"
    : "degraded";

  const overallConfig = statusConfig[overallStatus];
  const OverallIcon = overallConfig.icon;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>System Health</CardTitle>
            <p className="text-sm text-muted-foreground">
              Service status and uptime
            </p>
          </div>
          <Badge className={overallConfig.badgeClass}>
            <OverallIcon className="h-3 w-3 mr-1" />
            All Systems {overallConfig.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {healthMetrics.map((metric, index) => {
            const config = statusConfig[metric.status];
            const Icon = config.icon;

            return (
              <div
                key={index}
                className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${config.color}`} />
                  <div>
                    <p className="text-sm font-medium">{metric.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Checked {formatTimeAgo(metric.lastChecked)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{metric.uptime}%</p>
                  <Badge
                    variant="secondary"
                    className={`${config.badgeClass} text-xs`}
                  >
                    {config.label}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
