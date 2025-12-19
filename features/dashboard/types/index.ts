// Dashboard Types

// KPI Metrics
export interface DashboardKPI {
  totalUsers: number;
  activeLearners: number;
  monthlyRevenue: number;
  pendingComplaints: number;
  knowledgeBaseFiles: number;
  activeAISessions: number;
  userGrowthPercentage: number;
  revenueGrowthPercentage: number;
}

// Revenue Chart Data
export interface RevenueDataPoint {
  month: string;
  revenue: number;
  subscriptions: number;
}

// User Growth Chart Data
export interface UserGrowthDataPoint {
  month: string;
  users: number;
  learners: number;
}

// Recent Activity
export enum ActivityType {
  USER_SIGNUP = "user_signup",
  COMPLAINT_FILED = "complaint_filed",
  PLAN_SUBSCRIBED = "plan_subscribed",
  DOCUMENT_UPLOADED = "document_uploaded",
  LLM_CONFIGURED = "llm_configured",
}

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  user?: string;
  icon?: string;
}

// System Health
export enum SystemStatus {
  OPERATIONAL = "operational",
  DEGRADED = "degraded",
  DOWN = "down",
}

export interface SystemHealthMetric {
  name: string;
  status: SystemStatus;
  uptime: number;
  lastChecked: string;
}

// Quick Action
export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

// Top Pricing Plan
export interface TopPricingPlan {
  id: string;
  name: string;
  subscribers: number;
  revenue: number;
  growthRate: number;
}

// Popular Subject
export interface PopularSubject {
  id: string;
  name: string;
  fileCount: number;
  accessCount: number;
  icon: string;
}

// Dashboard Data (Complete)
export interface DashboardData {
  kpi: DashboardKPI;
  revenueData: RevenueDataPoint[];
  userGrowthData: UserGrowthDataPoint[];
  recentActivity: ActivityItem[];
  systemHealth: SystemHealthMetric[];
  quickActions: QuickAction[];
  topPricingPlans: TopPricingPlan[];
  popularSubjects: PopularSubject[];
}

// Component Props
export interface DashboardKPICardsProps {
  kpi: DashboardKPI;
}

export interface RevenueChartProps {
  data: RevenueDataPoint[];
}

export interface UserGrowthChartProps {
  data: UserGrowthDataPoint[];
}

export interface RecentActivityFeedProps {
  activities: ActivityItem[];
}

export interface SystemHealthStatusProps {
  healthMetrics: SystemHealthMetric[];
}

export interface QuickActionsProps {
  actions: QuickAction[];
}

export interface TopPricingPlansProps {
  plans: TopPricingPlan[];
}

export interface PopularSubjectsProps {
  subjects: PopularSubject[];
}

// Hook Return Types
export interface UseDashboardReturn {
  dashboardData: DashboardData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
