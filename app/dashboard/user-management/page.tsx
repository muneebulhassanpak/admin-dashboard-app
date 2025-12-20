/**
 * User Management Page
 * Route: /dashboard/user-management
 */

import type { Metadata } from 'next';
import { UserManagementClient } from '@/features/user-management/components';

export const metadata: Metadata = {
  title: 'User Management',
  description: 'Manage parent accounts and learner profiles. Add, edit, delete users, control access, and monitor user activity across the platform.',
};

export default function UserManagementPage() {
  return <UserManagementClient />;
}
