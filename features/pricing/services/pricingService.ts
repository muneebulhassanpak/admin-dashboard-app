/**
 * Pricing Service
 * Handles all pricing plan operations (Mocked)
 */

import { MOCK_PRICING_PLANS } from '../utils/constants';
import type { PricingPlan, CreatePlanDto, UpdatePlanDto } from '../types';
import { PlanStatus } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory storage
let plansData = [...MOCK_PRICING_PLANS];

export const pricingService = {
  /**
   * Get all pricing plans
   */
  async getPlans(): Promise<PricingPlan[]> {
    await delay(600);
    return [...plansData].sort((a, b) => a.monthlyPrice - b.monthlyPrice);
  },

  /**
   * Get a single plan by ID
   */
  async getPlanById(id: string): Promise<PricingPlan | null> {
    await delay(300);
    return plansData.find((p) => p.id === id) || null;
  },

  /**
   * Create a new pricing plan
   */
  async createPlan(dto: CreatePlanDto): Promise<PricingPlan> {
    await delay(700);

    const newId = (Math.max(...plansData.map((p) => parseInt(p.id))) + 1).toString();

    const newPlan: PricingPlan = {
      id: newId,
      name: dto.name,
      description: dto.description,
      monthlyPrice: dto.monthlyPrice,
      yearlyPrice: dto.yearlyPrice,
      status: PlanStatus.ACTIVE,
      maxLearners: dto.maxLearners,
      maxLessonsPerMonth: dto.maxLessonsPerMonth,
      features: dto.features,
      subscriberCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    plansData.push(newPlan);
    return newPlan;
  },

  /**
   * Update a pricing plan
   */
  async updatePlan(dto: UpdatePlanDto): Promise<PricingPlan> {
    await delay(500);

    const planIndex = plansData.findIndex((p) => p.id === dto.id);

    if (planIndex === -1) {
      throw new Error('Plan not found');
    }

    plansData[planIndex] = {
      ...plansData[planIndex],
      ...(dto.name && { name: dto.name }),
      ...(dto.description && { description: dto.description }),
      ...(dto.monthlyPrice !== undefined && { monthlyPrice: dto.monthlyPrice }),
      ...(dto.yearlyPrice !== undefined && { yearlyPrice: dto.yearlyPrice }),
      ...(dto.status && { status: dto.status }),
      ...(dto.maxLearners !== undefined && { maxLearners: dto.maxLearners }),
      ...(dto.maxLessonsPerMonth !== undefined && { maxLessonsPerMonth: dto.maxLessonsPerMonth }),
      ...(dto.features && { features: dto.features }),
      updatedAt: new Date().toISOString(),
    };

    return { ...plansData[planIndex] };
  },

  /**
   * Delete a pricing plan
   */
  async deletePlan(id: string): Promise<void> {
    await delay(800);

    const plan = plansData.find((p) => p.id === id);

    if (!plan) {
      throw new Error('Plan not found');
    }

    if (plan.isDefault) {
      throw new Error('Cannot delete the default plan');
    }

    if (plan.subscriberCount && plan.subscriberCount > 0) {
      throw new Error(`Cannot delete plan with ${plan.subscriberCount} active subscribers`);
    }

    plansData = plansData.filter((p) => p.id !== id);
  },

  /**
   * Toggle plan status (active/inactive)
   */
  async togglePlanStatus(id: string): Promise<PricingPlan> {
    await delay(500);

    const planIndex = plansData.findIndex((p) => p.id === id);

    if (planIndex === -1) {
      throw new Error('Plan not found');
    }

    const currentStatus = plansData[planIndex].status;
    const newStatus =
      currentStatus === PlanStatus.ACTIVE ? PlanStatus.INACTIVE : PlanStatus.ACTIVE;

    plansData[planIndex] = {
      ...plansData[planIndex],
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };

    return { ...plansData[planIndex] };
  },
};
