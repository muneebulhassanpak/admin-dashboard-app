import { dashboardService } from "@/features/dashboard/services";
import { DashboardClient } from "@/features/dashboard/components";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default async function DashboardPage() {
  try {
    const dashboardData = await dashboardService.getDashboardData();
    return <DashboardClient initialData={dashboardData} />;
  } catch (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load dashboard data. Please refresh the page to try again.
        </AlertDescription>
      </Alert>
    );
  }
}
