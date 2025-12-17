/**
 * LLM Configuration Types
 */

// AI Model Providers
export enum AIProvider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  GOOGLE = 'google',
  META = 'meta',
  COHERE = 'cohere',
}

// LLM Configuration Entity
export interface LLMConfig {
  id: string;
  modelId: string;
  modelName: string;
  provider: AIProvider;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  systemPrompt: string;
  createdAt: string;
  updatedAt: string;
}

// DTO for creating/updating LLM configuration
export interface UpdateLLMConfigDto {
  modelId: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  systemPrompt: string;
}

// Available AI Model
export interface AIModel {
  id: string;
  name: string;
  provider: AIProvider;
  description: string;
  contextWindow: number;
  maxOutputTokens: number;
}

// Component Props
export interface ConfigureLLMFormProps {
  config: LLMConfig | null;
  models: AIModel[];
  onSave: (config: UpdateLLMConfigDto) => void;
  loading: boolean;
}

// Hook Return Type
export interface UseLLMConfigReturn {
  config: LLMConfig | null;
  models: AIModel[];
  loading: boolean;
  saving: boolean;
  error: string | null;
  updateConfig: (config: UpdateLLMConfigDto) => Promise<void>;
}
