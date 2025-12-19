"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import type { UserGrowthChartProps } from "../types";

const chartConfig = {
  users: {
    label: "Total Users",
    color: "hsl(var(--primary))",
  },
  learners: {
    label: "Active Learners",
    color: "hsl(142 76% 56%)",
  },
};

export function UserGrowthChart({ data }: UserGrowthChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <p className="text-sm text-muted-foreground">
          Total users and active learners over time
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-users)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-users)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillLearners" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-learners)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-learners)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) =>
                    Number(value).toLocaleString()
                  }
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              type="monotone"
              dataKey="users"
              stroke="var(--color-users)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#fillUsers)"
            />
            <Area
              type="monotone"
              dataKey="learners"
              stroke="var(--color-learners)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#fillLearners)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
