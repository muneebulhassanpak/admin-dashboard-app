/**
 * Pricing Hook
 * Handles all pricing plan management functionality and state
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { pricingService } from '../services/pricingService';
import type { PricingPlan, CreatePlanDto, UpdatePlanDto, UsePricingReturn } from '../types';

export function usePricing(): UsePricingReturn {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await pricingService.getPlans();
      setPlans(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch pricing plans');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const createPlan = async (dto: CreatePlanDto): Promise<void> => {
    try {
      setError(null);
      await pricingService.createPlan(dto);
      await fetchPlans();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create plan');
      throw err;
    }
  };

  const updatePlan = async (dto: UpdatePlanDto): Promise<void> => {
    try {
      setUpdating(dto.id);
      setError(null);

      await pricingService.updatePlan(dto);
      await fetchPlans();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update plan');
      throw err;
    } finally {
      setUpdating(null);
    }
  };

  const deletePlan = async (id: string): Promise<void> => {
    try {
      setDeleting(id);
      setError(null);

      await pricingService.deletePlan(id);
      await fetchPlans();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete plan');
      throw err;
    } finally {
      setDeleting(null);
    }
  };

  const togglePlanStatus = async (id: string): Promise<void> => {
    try {
      setUpdating(id);
      setError(null);

      await pricingService.togglePlanStatus(id);
      await fetchPlans();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle plan status');
      throw err;
    } finally {
      setUpdating(null);
    }
  };

  const refreshPlans = async (): Promise<void> => {
    await fetchPlans();
  };

  return {
    plans,
    loading,
    updating,
    deleting,
    error,
    createPlan,
    updatePlan,
    deletePlan,
    togglePlanStatus,
    refreshPlans,
  };
}
