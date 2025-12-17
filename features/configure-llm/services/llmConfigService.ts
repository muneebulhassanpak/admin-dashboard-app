/**
 * LLM Configuration Service
 * Handles all data operations for LLM configuration (Mocked)
 */

import { MOCK_AI_MODELS, MOCK_LLM_CONFIG } from '../utils/constants';
import type { AIModel, LLMConfig, UpdateLLMConfigDto } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const llmConfigService = {
  /**
   * Get current LLM configuration
   */
  async getConfig(): Promise<LLMConfig> {
    await delay(500);
    return { ...MOCK_LLM_CONFIG };
  },

  /**
   * Get all available AI models
   */
  async getModels(): Promise<AIModel[]> {
    await delay(300);
    return [...MOCK_AI_MODELS];
  },

  /**
   * Update LLM configuration
   */
  async updateConfig(dto: UpdateLLMConfigDto): Promise<LLMConfig> {
    await delay(800);

    // Simulate validation errors
    if (dto.temperature < 0 || dto.temperature > 1) {
      throw new Error('Temperature must be between 0 and 1');
    }

    if (dto.maxTokens < 100) {
      throw new Error('Max tokens must be at least 100');
    }

    // Find the selected model
    const selectedModel = MOCK_AI_MODELS.find((m) => m.id === dto.modelId);
    if (!selectedModel) {
      throw new Error('Invalid model selected');
    }

    // Create updated configuration
    const updatedConfig: LLMConfig = {
      ...MOCK_LLM_CONFIG,
      ...dto,
      modelName: selectedModel.name,
      provider: selectedModel.provider,
      updatedAt: new Date().toISOString(),
    };

    return updatedConfig;
  },

  /**
   * Reset configuration to defaults
   */
  async resetConfig(): Promise<LLMConfig> {
    await delay(400);
    return { ...MOCK_LLM_CONFIG };
  },
};
