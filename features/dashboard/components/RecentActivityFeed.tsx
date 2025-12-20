"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  UserPlus,
  MessageSquare,
  CreditCard,
  Upload,
  Settings,
} from "lucide-react";
import type { RecentActivityFeedProps, ActivityType } from "../types";
import { formatTimeAgo } from "../utils/formatters";

const activityIcons: Record<ActivityType, typeof UserPlus> = {
  user_signup: UserPlus,
  complaint_filed: MessageSquare,
  plan_subscribed: CreditCard,
  document_uploaded: Upload,
  llm_configured: Settings,
};

const activityColors: Record<ActivityType, string> = {
  user_signup: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  complaint_filed: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
  plan_subscribed: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  document_uploaded: "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  llm_configured: "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
};

const activityBadgeColors: Record<ActivityType, string> = {
  user_signup: "bg-blue-500 text-white",
  complaint_filed: "bg-red-500 text-white",
  plan_subscribed: "bg-green-500 text-white",
  document_uploaded: "bg-purple-500 text-white",
  llm_configured: "bg-orange-500 text-white",
};

export function RecentActivityFeed({ activities }: RecentActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <p className="text-sm text-muted-foreground">
          Latest updates and actions
        </p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activityIcons[activity.type];
              const colorClass = activityColors[activity.type];
              const badgeClass = activityBadgeColors[activity.type];

              return (
                <div
                  key={activity.id}
                  className="flex gap-3 pb-4 border-b last:border-0 last:pb-0"
                >
                  <div className={`${colorClass} p-2 rounded-lg h-fit`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-none">
                        {activity.title}
                      </p>
                      <Badge
                        variant="secondary"
                        className={`${badgeClass} text-xs shrink-0`}
                      >
                        {formatTimeAgo(activity.timestamp)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    {activity.user && (
                      <p className="text-xs text-muted-foreground">
                        By: {activity.user}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
