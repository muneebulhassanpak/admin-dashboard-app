/**
 * Pricing Types
 */

export enum PlanStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived',
}

export interface PricingFeature {
  name: string;
  enabled: boolean;
  description?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  status: PlanStatus;
  maxLearners: number | null; // null = unlimited
  maxLessonsPerMonth: number | null; // null = unlimited
  features: PricingFeature[];
  isDefault?: boolean;
  subscriberCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlanDto {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  maxLearners: number | null;
  maxLessonsPerMonth: number | null;
  features: PricingFeature[];
}

export interface UpdatePlanDto {
  id: string;
  name?: string;
  description?: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  status?: PlanStatus;
  maxLearners?: number | null;
  maxLessonsPerMonth?: number | null;
  features?: PricingFeature[];
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface UsePricingReturn {
  plans: PricingPlan[];
  allPlans: PricingPlan[];
  loading: boolean;
  updating: string | null;
  deleting: string | null;
  error: string | null;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  createPlan: (dto: CreatePlanDto) => Promise<void>;
  updatePlan: (dto: UpdatePlanDto) => Promise<void>;
  deletePlan: (id: string) => Promise<void>;
  togglePlanStatus: (id: string) => Promise<void>;
  refreshPlans: () => Promise<void>;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}
