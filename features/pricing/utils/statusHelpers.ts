/**
 * Status helper functions for Pricing module
 */

import { PlanStatus } from '../types';

/**
 * Get badge variant for plan status
 */
export const getStatusBadgeVariant = (status: PlanStatus) => {
  switch (status) {
    case PlanStatus.ACTIVE:
      return 'default';
    case PlanStatus.INACTIVE:
      return 'secondary';
    case PlanStatus.ARCHIVED:
      return 'outline';
    default:
      return 'secondary';
  }
};
