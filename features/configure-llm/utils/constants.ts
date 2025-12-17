/**
 * LLM Configuration Constants and Mock Data
 */

import type { AIModel, LLMConfig } from '../types';
import { AIProvider } from '../types';

// Available AI Models
export const MOCK_AI_MODELS: AIModel[] = [
  // OpenAI Models
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: AIProvider.OPENAI,
    description: 'Most capable GPT-4 model with 128K context window',
    contextWindow: 128000,
    maxOutputTokens: 4096,
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: AIProvider.OPENAI,
    description: 'More capable than GPT-3.5, better at reasoning',
    contextWindow: 8192,
    maxOutputTokens: 4096,
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: AIProvider.OPENAI,
    description: 'Fast and cost-effective for most tasks',
    contextWindow: 16385,
    maxOutputTokens: 4096,
  },
  // Anthropic Models
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: AIProvider.ANTHROPIC,
    description: 'Most intelligent Claude model for complex tasks',
    contextWindow: 200000,
    maxOutputTokens: 4096,
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    provider: AIProvider.ANTHROPIC,
    description: 'Balanced performance and speed',
    contextWindow: 200000,
    maxOutputTokens: 4096,
  },
  {
    id: 'claude-3-haiku',
    name: 'Claude 3 Haiku',
    provider: AIProvider.ANTHROPIC,
    description: 'Fastest Claude model for quick responses',
    contextWindow: 200000,
    maxOutputTokens: 4096,
  },
  // Google Models
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: AIProvider.GOOGLE,
    description: 'Google\'s most capable multimodal model',
    contextWindow: 32768,
    maxOutputTokens: 8192,
  },
  {
    id: 'gemini-pro-vision',
    name: 'Gemini Pro Vision',
    provider: AIProvider.GOOGLE,
    description: 'Gemini with vision capabilities',
    contextWindow: 16384,
    maxOutputTokens: 8192,
  },
  // Meta Models
  {
    id: 'llama-2-70b',
    name: 'Llama 2 70B',
    provider: AIProvider.META,
    description: 'Open-source large language model',
    contextWindow: 4096,
    maxOutputTokens: 2048,
  },
  {
    id: 'llama-2-13b',
    name: 'Llama 2 13B',
    provider: AIProvider.META,
    description: 'Efficient open-source model',
    contextWindow: 4096,
    maxOutputTokens: 2048,
  },
  // Cohere Models
  {
    id: 'command',
    name: 'Command',
    provider: AIProvider.COHERE,
    description: 'Cohere\'s flagship text generation model',
    contextWindow: 4096,
    maxOutputTokens: 2048,
  },
  {
    id: 'command-light',
    name: 'Command Light',
    provider: AIProvider.COHERE,
    description: 'Faster, lighter version of Command',
    contextWindow: 4096,
    maxOutputTokens: 2048,
  },
];

// Current LLM Configuration (Mock)
export const MOCK_LLM_CONFIG: LLMConfig = {
  id: '1',
  modelId: 'gpt-4-turbo',
  modelName: 'GPT-4 Turbo',
  provider: AIProvider.OPENAI,
  temperature: 0.7,
  maxTokens: 2048,
  topP: 0.9,
  frequencyPenalty: 0,
  presencePenalty: 0,
  systemPrompt:
    'You are a helpful AI assistant for an educational platform. Provide clear, accurate, and concise responses to student queries. Be encouraging and supportive in your tone.',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-15T10:30:00Z',
};

// Default system prompts for different use cases
export const DEFAULT_SYSTEM_PROMPTS = {
  EDUCATIONAL:
    'You are a helpful AI assistant for an educational platform. Provide clear, accurate, and concise responses to student queries. Be encouraging and supportive in your tone.',
  CUSTOMER_SUPPORT:
    'You are a professional customer support assistant. Help users resolve their issues efficiently and courteously. Always maintain a helpful and patient demeanor.',
  CREATIVE_WRITING:
    'You are a creative writing assistant. Help users with brainstorming, editing, and improving their creative content. Be imaginative and supportive.',
  TECHNICAL:
    'You are a technical assistant specializing in software development and engineering topics. Provide accurate, detailed technical information and code examples when relevant.',
  GENERAL:
    'You are a helpful, harmless, and honest AI assistant. Provide accurate information and assist users with their questions to the best of your ability.',
};

// Temperature presets
export const TEMPERATURE_PRESETS = [
  { label: 'Precise', value: 0.2, description: 'More focused and deterministic' },
  { label: 'Balanced', value: 0.7, description: 'Good balance of creativity and consistency' },
  { label: 'Creative', value: 1.0, description: 'More random and creative' },
];

// Configuration limits
export const CONFIG_LIMITS = {
  TEMPERATURE: { MIN: 0, MAX: 1, STEP: 0.1 },
  TOP_P: { MIN: 0, MAX: 1, STEP: 0.1 },
  MAX_TOKENS: { MIN: 100, MAX: 8192, STEP: 100 },
  FREQUENCY_PENALTY: { MIN: -2, MAX: 2, STEP: 0.1 },
  PRESENCE_PENALTY: { MIN: -2, MAX: 2, STEP: 0.1 },
  SYSTEM_PROMPT_MAX_LENGTH: 2000,
};
