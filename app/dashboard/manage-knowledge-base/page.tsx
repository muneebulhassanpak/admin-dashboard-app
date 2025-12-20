/**
 * Manage Knowledge Base Page
 * Admin page for managing educational content and resources
 */

import type { Metadata } from 'next';
import { KnowledgeBaseClient } from '@/features/manage-knowledge-base';

export const metadata: Metadata = {
  title: 'Manage Knowledge Base',
  description: 'Upload, organize, and manage educational content and resources. Control what the AI tutor can access and teach to students.',
};

export default function ManageKnowledgeBasePage() {
  return <KnowledgeBaseClient />;
}
