import type { Metadata } from 'next';
import { ComplaintCenterClient } from '@/features/complaint-center/components';

export const metadata: Metadata = {
  title: 'Complaint Center',
  description: 'Manage and resolve user complaints, monitor flagged content, and maintain platform quality. Track complaint status and take appropriate actions.',
};

export default function ComplaintCenterPage() {
  return <ComplaintCenterClient />;
}
