/**
 * Status and Priority helper functions for Complaint Center module
 */

import type { ComplaintStatus, ComplaintPriority } from '../types';
import { ComplaintStatus as ComplaintStatusEnum, ComplaintPriority as ComplaintPriorityEnum } from '../types';

/**
 * Get badge variant for complaint status
 */
export const getStatusBadgeVariant = (status: ComplaintStatus) => {
  switch (status) {
    case ComplaintStatusEnum.PENDING:
      return 'secondary';
    case ComplaintStatusEnum.IN_REVIEW:
      return 'default';
    case ComplaintStatusEnum.RESOLVED:
      return 'default';
    case ComplaintStatusEnum.DISMISSED:
      return 'outline';
    default:
      return 'secondary';
  }
};

/**
 * Get label for complaint status
 */
export const getStatusLabel = (status: ComplaintStatus) => {
  switch (status) {
    case ComplaintStatusEnum.PENDING:
      return 'Pending';
    case ComplaintStatusEnum.IN_REVIEW:
      return 'In Review';
    case ComplaintStatusEnum.RESOLVED:
      return 'Resolved';
    case ComplaintStatusEnum.DISMISSED:
      return 'Dismissed';
    default:
      return status;
  }
};

/**
 * Get badge variant for complaint priority
 */
export const getPriorityBadgeVariant = (priority: ComplaintPriority) => {
  switch (priority) {
    case ComplaintPriorityEnum.LOW:
      return 'outline';
    case ComplaintPriorityEnum.MEDIUM:
      return 'secondary';
    case ComplaintPriorityEnum.HIGH:
      return 'default';
    case ComplaintPriorityEnum.URGENT:
      return 'destructive';
    default:
      return 'secondary';
  }
};

/**
 * Get label for complaint priority
 */
export const getPriorityLabel = (priority: ComplaintPriority) => {
  switch (priority) {
    case ComplaintPriorityEnum.LOW:
      return 'Low';
    case ComplaintPriorityEnum.MEDIUM:
      return 'Medium';
    case ComplaintPriorityEnum.HIGH:
      return 'High';
    case ComplaintPriorityEnum.URGENT:
      return 'Urgent';
    default:
      return priority;
  }
};
