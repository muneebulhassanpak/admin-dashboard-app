"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import type { PopularSubjectsProps } from "../types";

const chartConfig = {
  files: {
    label: "Content Files",
    color: "hsl(var(--primary))",
  },
  access: {
    label: "Access Count",
    color: "hsl(142 76% 56%)",
  },
};

export function PopularSubjectsChart({ subjects }: PopularSubjectsProps) {
  const chartData = subjects.map((subject) => ({
    name: subject.name,
    files: subject.fileCount,
    access: subject.accessCount,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Subjects</CardTitle>
        <p className="text-sm text-muted-foreground">
          File count and access frequency by subject
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                    if (name === "files") {
                      return [`${value} files`, "Content Files"];
                    }
                    return [`${Number(value).toLocaleString()} views`, "Access Count"];
                  }}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="files"
              fill="var(--color-files)"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="access"
              fill="var(--color-access)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
