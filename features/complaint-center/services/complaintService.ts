/**
 * Complaint Service
 * Handles all data operations for complaints (Mocked)
 */

import { MOCK_COMPLAINTS } from '../utils/constants';
import type {
  Complaint,
  PaginationParams,
  PaginatedResponse,
  CreateComplaintDto,
  UpdateComplaintDto,
  ComplaintStatus,
} from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory storage for demonstration
let complaintsData = [...MOCK_COMPLAINTS];

export const complaintService = {
  /**
   * Get paginated and filtered complaints
   * Server-side pagination, search, and status filtering
   */
  async getComplaints(params: PaginationParams): Promise<PaginatedResponse<Complaint>> {
    await delay(600);

    let filteredComplaints = [...complaintsData];

    // Apply status filter
    if (params.status) {
      filteredComplaints = filteredComplaints.filter(
        (complaint) => complaint.status === params.status
      );
    }

    // Apply search filter
    if (params.search && params.search.trim().length > 0) {
      const searchLower = params.search.toLowerCase();
      filteredComplaints = filteredComplaints.filter(
        (complaint) =>
          complaint.complaint.toLowerCase().includes(searchLower) ||
          complaint.studentUsername.toLowerCase().includes(searchLower) ||
          complaint.parentEmail.toLowerCase().includes(searchLower) ||
          complaint.flaggedMessage.toLowerCase().includes(searchLower)
      );
    }

    // Sort by date (newest first)
    filteredComplaints.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Calculate pagination
    const total = filteredComplaints.length;
    const totalPages = Math.ceil(total / params.pageSize);
    const startIndex = (params.page - 1) * params.pageSize;
    const endIndex = startIndex + params.pageSize;
    const paginatedData = filteredComplaints.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total,
      page: params.page,
      pageSize: params.pageSize,
      totalPages,
    };
  },

  /**
   * Get a single complaint by ID
   */
  async getComplaintById(id: string): Promise<Complaint | null> {
    await delay(300);
    return complaintsData.find((c) => c.id === id) || null;
  },

  /**
   * Create a new complaint
   */
  async createComplaint(dto: CreateComplaintDto): Promise<Complaint> {
    await delay(700);

    const newId = (Math.max(...complaintsData.map((c) => parseInt(c.id))) + 1).toString();

    const newComplaint: Complaint = {
      id: newId,
      date: new Date().toISOString().split('T')[0],
      complaint: dto.complaint,
      flaggedMessage: dto.flaggedMessage,
      studentUsername: dto.studentUsername,
      studentEmail: dto.studentEmail,
      parentEmail: dto.parentEmail,
      status: 'pending' as ComplaintStatus,
      priority: dto.priority || 'medium' as any,
      assignedTo: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: '',
    };

    complaintsData.push(newComplaint);
    return newComplaint;
  },

  /**
   * Update a complaint
   */
  async updateComplaint(dto: UpdateComplaintDto): Promise<Complaint> {
    await delay(500);

    const complaintIndex = complaintsData.findIndex((c) => c.id === dto.id);

    if (complaintIndex === -1) {
      throw new Error('Complaint not found');
    }

    // Update complaint
    complaintsData[complaintIndex] = {
      ...complaintsData[complaintIndex],
      ...(dto.status !== undefined && { status: dto.status }),
      ...(dto.priority !== undefined && { priority: dto.priority }),
      ...(dto.assignedTo !== undefined && { assignedTo: dto.assignedTo }),
      ...(dto.notes !== undefined && { notes: dto.notes }),
      updatedAt: new Date().toISOString(),
    };

    return { ...complaintsData[complaintIndex] };
  },

  /**
   * Update complaint status
   */
  async updateComplaintStatus(id: string, status: ComplaintStatus): Promise<Complaint> {
    return this.updateComplaint({ id, status });
  },

  /**
   * Delete a complaint
   */
  async deleteComplaint(id: string): Promise<void> {
    await delay(800);

    const complaintIndex = complaintsData.findIndex((c) => c.id === id);

    if (complaintIndex === -1) {
      throw new Error('Complaint not found');
    }

    complaintsData = complaintsData.filter((c) => c.id !== id);
  },

  /**
   * Get complaints statistics
   */
  async getComplaintStats(): Promise<{
    total: number;
    pending: number;
    inReview: number;
    resolved: number;
    dismissed: number;
  }> {
    await delay(400);

    return {
      total: complaintsData.length,
      pending: complaintsData.filter((c) => c.status === 'pending').length,
      inReview: complaintsData.filter((c) => c.status === 'in_review').length,
      resolved: complaintsData.filter((c) => c.status === 'resolved').length,
      dismissed: complaintsData.filter((c) => c.status === 'dismissed').length,
    };
  },
};
