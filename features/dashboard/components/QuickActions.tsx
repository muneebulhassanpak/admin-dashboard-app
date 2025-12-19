"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Upload,
  Settings,
  MessageSquare,
} from "lucide-react";
import type { QuickActionsProps } from "../types";

const iconMap = {
  UserPlus,
  Upload,
  Settings,
  MessageSquare,
};

const colorMap = {
  blue: "bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40",
  green: "bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40",
  purple: "bg-purple-100 text-purple-600 hover:bg-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:hover:bg-purple-900/40",
  red: "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40",
};

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <p className="text-sm text-muted-foreground">
          Common tasks and shortcuts
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action) => {
            const Icon = iconMap[action.icon as keyof typeof iconMap] || UserPlus;
            const colorClass = colorMap[action.color as keyof typeof colorMap] || colorMap.blue;

            return (
              <Link key={action.id} href={action.href}>
                <Button
                  variant="outline"
                  className={`w-full h-auto p-3 flex flex-col items-start gap-1.5 ${colorClass} border-2 transition-all`}
                >
                  <div className="flex items-center gap-2 w-full">
                    <Icon className="h-4 w-4" />
                    <span className="font-semibold text-sm">{action.title}</span>
                  </div>
                  <p className="text-xs text-left opacity-80">
                    {action.description}
                  </p>
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
