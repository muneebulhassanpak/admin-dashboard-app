"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import type { TopPricingPlansProps } from "../types";

const COLORS = [
  "hsl(217 91% 60%)", // Blue for Premium Plan - visible in both light and dark mode
  "hsl(142 76% 56%)", // Green for Family Plan
  "hsl(39 100% 57%)", // Orange for Basic Plan
  "hsl(261 51% 51%)", // Purple for additional plans
];

export function PricingDistributionChart({ plans }: TopPricingPlansProps) {
  const chartData = plans.map((plan, index) => ({
    name: plan.name,
    value: plan.subscribers,
    revenue: plan.revenue,
    fill: COLORS[index % COLORS.length],
  }));

  const chartConfig = plans.reduce((acc, plan, index) => {
    acc[plan.name] = {
      label: plan.name,
      color: COLORS[index % COLORS.length],
    };
    return acc;
  }, {} as any);

  const totalSubscribers = plans.reduce((acc, plan) => acc + plan.subscribers, 0);

  // Custom label renderer with proper theme support
  const renderLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, name, percent } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="hsl(var(--foreground))"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan Distribution</CardTitle>
        <p className="text-sm text-muted-foreground">
          Subscriber breakdown by pricing tier
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <ChartContainer config={chartConfig} className="h-[280px] w-full">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`
                }
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name, props) => [
                      `${value} subscribers ($${props.payload.revenue.toLocaleString()})`,
                      name,
                    ]}
                  />
                }
              />
            </PieChart>
          </ChartContainer>

          <div className="flex-1 space-y-3">
            {plans.map((plan, index) => (
              <div key={plan.id} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm font-medium">{plan.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {plan.subscribers} users
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ${plan.revenue.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
            <div className="pt-3 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Total</span>
                <span className="text-sm font-bold">{totalSubscribers} users</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
