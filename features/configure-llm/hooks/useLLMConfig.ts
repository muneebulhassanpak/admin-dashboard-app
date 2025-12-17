/**
 * useLLMConfig Hook
 * Manages LLM configuration state and operations
 */

'use client';

import { useState, useEffect } from 'react';
import { llmConfigService } from '../services/llmConfigService';
import type {
  LLMConfig,
  AIModel,
  UpdateLLMConfigDto,
  UseLLMConfigReturn,
} from '../types';

export function useLLMConfig(): UseLLMConfigReturn {
  const [config, setConfig] = useState<LLMConfig | null>(null);
  const [models, setModels] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [configData, modelsData] = await Promise.all([
          llmConfigService.getConfig(),
          llmConfigService.getModels(),
        ]);
        setConfig(configData);
        setModels(modelsData);
      } catch (err) {
        setError('Failed to load LLM configuration');
        console.error('Error fetching LLM config:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update configuration
  const updateConfig = async (dto: UpdateLLMConfigDto) => {
    setSaving(true);
    setError(null);
    try {
      const updatedConfig = await llmConfigService.updateConfig(dto);
      setConfig(updatedConfig);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to update configuration';
      setError(errorMessage);
      throw err; // Re-throw so component can handle it
    } finally {
      setSaving(false);
    }
  };

  return {
    config,
    models,
    loading,
    saving,
    error,
    updateConfig,
  };
}
