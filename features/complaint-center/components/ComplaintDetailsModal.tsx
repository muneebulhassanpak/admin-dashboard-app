'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Mail, User, AlertCircle, FileText, Clock, X } from 'lucide-react';
import type { Complaint, ComplaintStatus, ComplaintPriority } from '../types';
import { ComplaintStatus as ComplaintStatusEnum, ComplaintPriority as ComplaintPriorityEnum } from '../types';

interface ComplaintDetailsModalProps {
  complaint: Complaint | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getStatusBadgeVariant = (status: ComplaintStatus) => {
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

const getStatusLabel = (status: ComplaintStatus) => {
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

const getPriorityBadgeVariant = (priority: ComplaintPriority) => {
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

const getPriorityLabel = (priority: ComplaintPriority) => {
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export function ComplaintDetailsModal({
  complaint,
  open,
  onOpenChange,
}: ComplaintDetailsModalProps) {
  if (!complaint) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-20 h-6 w-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>

        <DialogHeader className="sticky top-0 z-10 bg-background border-b px-6 py-3 space-y-1">
          <DialogTitle className="text-lg">Complaint Details</DialogTitle>
          <DialogDescription className="text-xs">
            Full information about this complaint
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 overflow-y-auto px-6 py-4">
          {/* Status and Priority */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Status:</span>
              <Badge variant={getStatusBadgeVariant(complaint.status)} className="text-xs">
                {getStatusLabel(complaint.status)}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Priority:</span>
              <Badge variant={getPriorityBadgeVariant(complaint.priority)} className="text-xs">
                {getPriorityLabel(complaint.priority)}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Complaint Details */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <AlertCircle className="h-3.5 w-3.5 text-muted-foreground" />
                <h3 className="text-xs font-semibold">Complaint</h3>
              </div>
              <p className="text-sm pl-5">{complaint.complaint}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                <h3 className="text-xs font-semibold">Flagged Message</h3>
              </div>
              <p className="text-sm pl-5 italic text-muted-foreground">
                &ldquo;{complaint.flaggedMessage}&rdquo;
              </p>
            </div>
          </div>

          <Separator />

          {/* Student Information */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold flex items-center gap-2">
              <User className="h-3.5 w-3.5" />
              Student Information
            </h3>
            <div className="grid grid-cols-2 gap-3 pl-5">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Username</p>
                <p className="text-sm font-medium">{complaint.studentUsername}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                <p className="text-sm font-medium break-all">{complaint.studentEmail}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Parent Information */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" />
              Parent Contact
            </h3>
            <div className="pl-5">
              <p className="text-xs text-muted-foreground mb-0.5">Email</p>
              <p className="text-sm font-medium break-all">{complaint.parentEmail}</p>
            </div>
          </div>

          {/* Assignment */}
          {complaint.assignedTo && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-xs font-semibold">Assigned To</h3>
                <p className="text-sm pl-5">{complaint.assignedTo}</p>
              </div>
            </>
          )}

          {/* Notes */}
          {complaint.notes && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-xs font-semibold">Internal Notes</h3>
                <p className="text-sm pl-5 text-muted-foreground">{complaint.notes}</p>
              </div>
            </>
          )}

          <Separator />

          {/* Timestamps */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              Timeline
            </h3>
            <div className="grid grid-cols-1 gap-2 pl-5">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Submitted</p>
                <p className="text-sm">{formatDate(complaint.date)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Created At</p>
                <p className="text-sm">{formatDate(complaint.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Last Updated</p>
                <p className="text-sm">{formatDate(complaint.updatedAt)}</p>
              </div>
            </div>
          </div>

          {/* Complaint ID */}
          <div className="pt-3 border-t">
            <p className="text-xs text-muted-foreground">
              Complaint ID: <span className="font-mono">{complaint.id}</span>
            </p>
          </div>
        </div>

        <DialogFooter className="sticky bottom-0 z-10 bg-background border-t px-6 py-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
