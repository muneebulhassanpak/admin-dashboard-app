/**
 * Pricing Client Component
 * Admin interface for managing pricing plans
 */

'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { BadgePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { usePricing } from '../hooks';
import { PricingTable } from './PricingTable';
import { CreatePlanModal } from './CreatePlanModal';
import type { PricingPlan, CreatePlanDto } from '../types';

export function PricingClient() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const {
    plans,
    allPlans,
    loading,
    updating,
    deleting,
    error,
    pagination,
    createPlan,
    deletePlan,
    togglePlanStatus,
    setPage,
  } = usePricing();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'top-center',
      });
    }
  }, [error]);

  const handleEditPlan = (plan: PricingPlan) => {
    toast.info('Edit Plan', {
      description: `Editing ${plan.name} plan (feature coming soon)`,
      position: 'top-center',
    });
  };

  const handleDeletePlan = async (id: string) => {
    try {
      await deletePlan(id);
      toast.success('Plan deleted successfully', {
        position: 'top-center',
      });
    } catch (err) {
      // Error handled by useEffect
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await togglePlanStatus(id);
      toast.success('Plan status updated successfully', {
        position: 'top-center',
      });
    } catch (err) {
      // Error handled by useEffect
    }
  };

  const handleCreatePlan = () => {
    setIsCreateModalOpen(true);
  };

  const handleSubmitCreatePlan = async (dto: CreatePlanDto) => {
    try {
      setCreating(true);
      await createPlan(dto);
    } catch (err) {
      // Error handled by hook
      throw err;
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Pricing Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configure and manage subscription plans for parents and learners
          </p>
        </div>
        <Button onClick={handleCreatePlan}>
          <BadgePlus className="h-4 w-4" />
          Create Plan
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Total Plans</p>
          {loading ? (
            <Skeleton className="h-8 w-12 mt-1" />
          ) : (
            <p className="text-2xl font-bold mt-1">{pagination.total}</p>
          )}
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Active Plans</p>
          {loading ? (
            <Skeleton className="h-8 w-12 mt-1" />
          ) : (
            <p className="text-2xl font-bold mt-1">
              {allPlans.filter((p) => p.status === 'active').length}
            </p>
          )}
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Total Subscribers</p>
          {loading ? (
            <Skeleton className="h-8 w-20 mt-1" />
          ) : (
            <p className="text-2xl font-bold mt-1">
              {allPlans.reduce((sum, p) => sum + (p.subscriberCount || 0), 0)}
            </p>
          )}
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Monthly Revenue</p>
          {loading ? (
            <Skeleton className="h-8 w-32 mt-1" />
          ) : (
            <p className="text-2xl font-bold mt-1">
              ${allPlans.reduce((sum, p) => sum + p.monthlyPrice * (p.subscriberCount || 0), 0).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {/* Pricing Table */}
      <PricingTable
        plans={plans}
        loading={loading}
        updating={updating}
        deleting={deleting}
        onEditPlan={handleEditPlan}
        onDeletePlan={handleDeletePlan}
        onToggleStatus={handleToggleStatus}
        pagination={pagination}
        onPageChange={setPage}
      />

      {/* Help Text */}
      <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-2">Tips for Managing Pricing Plans:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>You cannot delete plans with active subscribers</li>
          <li>The default plan cannot be deleted</li>
          <li>Deactivated plans won't be visible to new customers</li>
          <li>Edit plans to update pricing, features, and limits</li>
        </ul>
      </div>

      {/* Create Plan Modal */}
      <CreatePlanModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSubmit={handleSubmitCreatePlan}
        creating={creating}
      />
    </div>
  );
}
