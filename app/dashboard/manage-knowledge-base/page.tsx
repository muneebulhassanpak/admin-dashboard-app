/**
 * Manage Knowledge Base Page
 * Admin page for managing educational content and resources
 */

import type { Metadata } from 'next';
import { KnowledgeBaseClient } from '@/features/manage-knowledge-base';

export const metadata: Metadata = {
  title: 'Manage Knowledge Base | Admin Portal',
  description: 'Upload, organize, and manage educational content for the AI tutor',
};

export default function ManageKnowledgeBasePage() {
  return <KnowledgeBaseClient />;
}
