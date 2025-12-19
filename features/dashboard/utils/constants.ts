import type {
  DashboardData,
  ActivityType,
  SystemStatus,
} from "../types";

// Mock Dashboard KPI
export const MOCK_DASHBOARD_KPI = {
  totalUsers: 2847,
  activeLearners: 1923,
  monthlyRevenue: 48650,
  pendingComplaints: 12,
  knowledgeBaseFiles: 324,
  activeAISessions: 156,
  userGrowthPercentage: 12.5,
  revenueGrowthPercentage: 18.3,
};

// Mock Revenue Data (Last 6 months)
export const MOCK_REVENUE_DATA = [
  { month: "Jul", revenue: 32500, subscriptions: 245 },
  { month: "Aug", revenue: 35200, subscriptions: 268 },
  { month: "Sep", revenue: 38900, subscriptions: 289 },
  { month: "Oct", revenue: 41200, subscriptions: 312 },
  { month: "Nov", revenue: 45300, subscriptions: 341 },
  { month: "Dec", revenue: 48650, subscriptions: 367 },
];

// Mock User Growth Data (Last 6 months)
export const MOCK_USER_GROWTH_DATA = [
  { month: "Jul", users: 1845, learners: 1234 },
  { month: "Aug", users: 2012, learners: 1356 },
  { month: "Sep", users: 2234, learners: 1489 },
  { month: "Oct", users: 2456, learners: 1623 },
  { month: "Nov", users: 2678, learners: 1789 },
  { month: "Dec", users: 2847, learners: 1923 },
];

// Mock Recent Activity
export const MOCK_RECENT_ACTIVITY = [
  {
    id: "1",
    type: "user_signup" as ActivityType,
    title: "New User Registration",
    description: "Sarah Johnson signed up with Premium Plan",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    user: "Sarah Johnson",
  },
  {
    id: "2",
    type: "complaint_filed" as ActivityType,
    title: "New Complaint Filed",
    description: "Unable to access lesson materials - Priority: High",
    timestamp: new Date(Date.now() - 1000 * 60 * 32).toISOString(), // 32 mins ago
    user: "Michael Chen",
  },
  {
    id: "3",
    type: "plan_subscribed" as ActivityType,
    title: "Plan Subscription",
    description: "Family Plan subscription renewed",
    timestamp: new Date(Date.now() - 1000 * 60 * 48).toISOString(), // 48 mins ago
    user: "Emily Rodriguez",
  },
  {
    id: "4",
    type: "document_uploaded" as ActivityType,
    title: "Knowledge Base Updated",
    description: "New content uploaded: Physics - Grade 10 Chapter 5",
    timestamp: new Date(Date.now() - 1000 * 60 * 65).toISOString(), // 1 hr ago
    user: "Admin",
  },
  {
    id: "5",
    type: "llm_configured" as ActivityType,
    title: "AI Model Updated",
    description: "GPT-4 temperature adjusted to 0.7",
    timestamp: new Date(Date.now() - 1000 * 60 * 92).toISOString(), // 1.5 hrs ago
    user: "Admin",
  },
  {
    id: "6",
    type: "user_signup" as ActivityType,
    title: "New User Registration",
    description: "David Park signed up with Basic Plan",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hrs ago
    user: "David Park",
  },
  {
    id: "7",
    type: "complaint_filed" as ActivityType,
    title: "New Complaint Filed",
    description: "AI responses are too slow - Priority: Medium",
    timestamp: new Date(Date.now() - 1000 * 60 * 145).toISOString(), // 2.5 hrs ago
    user: "Lisa Anderson",
  },
  {
    id: "8",
    type: "document_uploaded" as ActivityType,
    title: "Knowledge Base Updated",
    description: "New assessment added: Math - Algebra Quiz",
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hrs ago
    user: "Admin",
  },
];

// Mock System Health
export const MOCK_SYSTEM_HEALTH = [
  {
    name: "AI Service",
    status: "operational" as SystemStatus,
    uptime: 99.8,
    lastChecked: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
  {
    name: "Database",
    status: "operational" as SystemStatus,
    uptime: 99.9,
    lastChecked: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
  {
    name: "API Gateway",
    status: "operational" as SystemStatus,
    uptime: 99.7,
    lastChecked: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
  {
    name: "Storage",
    status: "degraded" as SystemStatus,
    uptime: 98.5,
    lastChecked: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
];

// Mock Quick Actions
export const MOCK_QUICK_ACTIONS = [
  {
    id: "1",
    title: "Add User",
    description: "Create a new user account",
    icon: "UserPlus",
    href: "/dashboard/user-management",
    color: "blue",
  },
  {
    id: "2",
    title: "Upload Document",
    description: "Add content to knowledge base",
    icon: "Upload",
    href: "/dashboard/manage-knowledge-base",
    color: "green",
  },
  {
    id: "3",
    title: "Configure AI",
    description: "Adjust LLM parameters",
    icon: "Settings",
    href: "/dashboard/configure-llm",
    color: "purple",
  },
  {
    id: "4",
    title: "View Complaints",
    description: "Review pending issues",
    icon: "MessageSquare",
    href: "/dashboard/complaint-center",
    color: "red",
  },
];

// Mock Top Pricing Plans
export const MOCK_TOP_PRICING_PLANS = [
  {
    id: "1",
    name: "Premium Plan",
    subscribers: 156,
    revenue: 23400,
    growthRate: 15.2,
  },
  {
    id: "2",
    name: "Family Plan",
    subscribers: 124,
    revenue: 18600,
    growthRate: 22.8,
  },
  {
    id: "3",
    name: "Basic Plan",
    subscribers: 87,
    revenue: 6525,
    growthRate: 8.3,
  },
];

// Mock Popular Subjects
export const MOCK_POPULAR_SUBJECTS = [
  {
    id: "1",
    name: "Mathematics",
    fileCount: 87,
    accessCount: 2345,
    icon: "Calculator",
  },
  {
    id: "2",
    name: "Science",
    fileCount: 64,
    accessCount: 1876,
    icon: "FlaskConical",
  },
  {
    id: "3",
    name: "English",
    fileCount: 52,
    accessCount: 1654,
    icon: "BookOpen",
  },
  {
    id: "4",
    name: "Physics",
    fileCount: 45,
    accessCount: 1432,
    icon: "Atom",
  },
];

// Complete Mock Dashboard Data
export const MOCK_DASHBOARD_DATA: DashboardData = {
  kpi: MOCK_DASHBOARD_KPI,
  revenueData: MOCK_REVENUE_DATA,
  userGrowthData: MOCK_USER_GROWTH_DATA,
  recentActivity: MOCK_RECENT_ACTIVITY,
  systemHealth: MOCK_SYSTEM_HEALTH,
  quickActions: MOCK_QUICK_ACTIONS,
  topPricingPlans: MOCK_TOP_PRICING_PLANS,
  popularSubjects: MOCK_POPULAR_SUBJECTS,
};
