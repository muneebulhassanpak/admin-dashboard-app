/**
 * Configure LLM Page
 * Page for configuring AI model parameters and behavior
 */

import type { Metadata } from 'next';
import { ConfigureLLMClient } from '@/features/configure-llm/components';

export const metadata: Metadata = {
  title: 'Configure LLM',
  description: 'Configure AI language model settings, parameters, and behavior. Customize the AI tutor\'s responses and teaching style.',
};

export default function ConfigureLLMPage() {
  return <ConfigureLLMClient />;
}
