/**
 * Complaint Center Types
 */

// Complaint Status Enum
export enum ComplaintStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  RESOLVED = 'resolved',
  DISMISSED = 'dismissed',
}

// Complaint Priority Enum
export enum ComplaintPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

// Complaint Entity
export interface Complaint {
  id: string;
  date: string; // ISO date string
  complaint: string; // The complaint text/description
  flaggedMessage: string; // The message that was flagged
  studentUsername: string;
  studentEmail: string;
  parentEmail: string;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  assignedTo: string | null; // Admin who is handling it
  createdAt: string;
  updatedAt: string;
  notes?: string; // Internal notes
}

// Pagination
export interface PaginationParams {
  page: number;
  pageSize: number;
  search?: string;
  status?: ComplaintStatus;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// DTOs
export interface CreateComplaintDto {
  complaint: string;
  flaggedMessage: string;
  studentUsername: string;
  studentEmail: string;
  parentEmail: string;
  priority?: ComplaintPriority;
}

export interface UpdateComplaintDto {
  id: string;
  status?: ComplaintStatus;
  priority?: ComplaintPriority;
  assignedTo?: string | null;
  notes?: string;
}

// Hook Return Type
export interface UseComplaintCenterReturn {
  complaints: Complaint[];
  loading: boolean;
  updating: string | null; // complaint id being updated
  deleting: string | null; // complaint id being deleted
  error: string | null;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  searchQuery: string;
  statusFilter: ComplaintStatus | 'all';
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: ComplaintStatus | 'all') => void;
  setPage: (page: number) => void;
  updateComplaintStatus: (id: string, status: ComplaintStatus) => Promise<void>;
  deleteComplaint: (id: string) => Promise<void>;
  refreshComplaints: () => Promise<void>;
}
