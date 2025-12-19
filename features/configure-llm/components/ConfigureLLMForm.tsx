/**
 * ConfigureLLMForm Component
 * Enhanced form for configuring LLM parameters with tabbed interface
 */

'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Save, RotateCcw, Info, Sparkles, Cpu, Sliders, MessageSquare, Search, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ModelDetailsSkeleton } from './ModelDetailsSkeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import type { UpdateLLMConfigDto, AIModel, LLMConfig } from '../types';
import { AIProvider } from '../types';
import {
  CONFIG_LIMITS,
  TEMPERATURE_PRESETS,
} from '../utils/constants';

interface ConfigureLLMFormProps {
  config: LLMConfig;
  models: AIModel[];
  onSave: (config: UpdateLLMConfigDto) => Promise<void>;
  saving: boolean;
}

export function ConfigureLLMForm({
  config,
  models,
  onSave,
  saving,
}: ConfigureLLMFormProps) {
  const [formData, setFormData] = useState<UpdateLLMConfigDto>({
    modelId: config.modelId,
    temperature: config.temperature,
    maxTokens: config.maxTokens,
    topP: config.topP,
    frequencyPenalty: config.frequencyPenalty,
    presencePenalty: config.presencePenalty,
    systemPrompt: config.systemPrompt,
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingModelId, setLoadingModelId] = useState<string | null>(null);

  // Track changes
  useEffect(() => {
    const changed =
      formData.modelId !== config.modelId ||
      formData.temperature !== config.temperature ||
      formData.maxTokens !== config.maxTokens ||
      formData.topP !== config.topP ||
      formData.frequencyPenalty !== config.frequencyPenalty ||
      formData.presencePenalty !== config.presencePenalty ||
      formData.systemPrompt !== config.systemPrompt;
    setHasChanges(changed);
  }, [formData, config]);

  const selectedModel = models.find((m) => m.id === formData.modelId);

  // Group models by provider
  const modelsByProvider = models.reduce(
    (acc, model) => {
      if (!acc[model.provider]) {
        acc[model.provider] = [];
      }
      acc[model.provider].push(model);
      return acc;
    },
    {} as Record<AIProvider, AIModel[]>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(formData);
      toast.success('Configuration saved successfully', {
        description: 'Your LLM settings have been updated.',
        position: 'top-center',
      });
      setHasChanges(false);
    } catch (error) {
      toast.error('Failed to save configuration', {
        description:
          error instanceof Error ? error.message : 'An error occurred',
        position: 'top-center',
      });
    }
  };

  const handleReset = () => {
    setFormData({
      modelId: config.modelId,
      temperature: config.temperature,
      maxTokens: config.maxTokens,
      topP: config.topP,
      frequencyPenalty: config.frequencyPenalty,
      presencePenalty: config.presencePenalty,
      systemPrompt: config.systemPrompt,
    });
    toast.info('Changes discarded');
  };

  const applyTemperaturePreset = (value: number) => {
    setFormData({ ...formData, temperature: value });
  };

  const handleModelSelect = async (modelId: string) => {
    setLoadingModelId(modelId);
    // Simulate fetching model data
    await new Promise((resolve) => setTimeout(resolve, 400));
    setFormData({ ...formData, modelId });
    setLoadingModelId(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-0.5">
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Configure LLM
          </h1>
          <p className="text-sm text-muted-foreground">
            Customize your AI assistant&apos;s performance, behavior, and response style
          </p>
        </div>
        {selectedModel && (
          <Badge variant="outline" className="text-sm px-3 py-1">
            {selectedModel.provider.toUpperCase()}
          </Badge>
        )}
      </div>

      {/* Scrollable Content */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto pr-3 space-y-4">

        {/* Tabbed Content */}
        <Tabs defaultValue="model" className="w-full h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="model" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            <span>Model</span>
          </TabsTrigger>
          <TabsTrigger value="parameters" className="flex items-center gap-2">
            <Sliders className="h-4 w-4" />
            <span>Parameters</span>
          </TabsTrigger>
          <TabsTrigger value="prompt" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>System Prompt</span>
          </TabsTrigger>
        </TabsList>

        {/* Model Selection Tab */}
        <TabsContent value="model" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Selection</CardTitle>
              <CardDescription>
                Choose the AI model that best fits your use case
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Left side - Model List */}
                <div className="lg:col-span-2 space-y-3">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search models..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>

                  {/* Model List */}
                  <ScrollArea className="h-[500px] rounded-lg border">
                    <div className="p-2 pr-4 space-y-1">
                      {models
                        .filter((model) => {
                          const query = searchQuery.toLowerCase();
                          return (
                            model.name.toLowerCase().includes(query) ||
                            model.description.toLowerCase().includes(query) ||
                            model.provider.toLowerCase().includes(query)
                          );
                        })
                        .map((model) => {
                          const isSelected = formData.modelId === model.id;
                          return (
                            <button
                              key={model.id}
                              type="button"
                              onClick={() => handleModelSelect(model.id)}
                              disabled={loadingModelId !== null}
                              className={`w-full text-left p-3 rounded-lg transition-all hover:bg-accent ${
                                isSelected
                                  ? 'bg-primary/10 border-2 border-primary'
                                  : 'border border-transparent hover:border-border'
                              } ${loadingModelId !== null ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate mb-1">
                                    {model.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground line-clamp-2">
                                    {model.description}
                                  </p>
                                  <Badge
                                    variant="secondary"
                                    className="mt-2 text-xs"
                                  >
                                    {model.provider.toUpperCase()}
                                  </Badge>
                                </div>
                                {isSelected && (
                                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                    </div>
                  </ScrollArea>
                </div>

                {/* Right side - Model Details */}
                <div className="lg:col-span-3">
                  {loadingModelId ? (
                    <ModelDetailsSkeleton />
                  ) : selectedModel ? (
                    <div className="rounded-lg border bg-muted/30 p-6 h-[500px] flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">
                            {selectedModel.name}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {selectedModel.provider.toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="space-y-6 flex-1">
                        <div>
                          <p className="text-sm font-semibold mb-2">Description</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {selectedModel.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-lg border bg-background p-4">
                            <p className="text-xs text-muted-foreground mb-1">
                              Context Window
                            </p>
                            <p className="text-lg font-semibold">
                              {selectedModel.contextWindow.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">tokens</p>
                          </div>
                          <div className="rounded-lg border bg-background p-4">
                            <p className="text-xs text-muted-foreground mb-1">
                              Max Output
                            </p>
                            <p className="text-lg font-semibold">
                              {selectedModel.maxOutputTokens.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">tokens</p>
                          </div>
                        </div>

                        <div className="rounded-lg border bg-background p-4">
                          <p className="text-sm font-semibold mb-3">Specifications</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Provider</span>
                              <span className="font-medium">
                                {selectedModel.provider.charAt(0).toUpperCase() +
                                  selectedModel.provider.slice(1)}
                              </span>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Model ID</span>
                              <span className="font-mono text-xs">
                                {selectedModel.id}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-lg border bg-muted/30 p-6 h-[500px] flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Cpu className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">Select a model to view details</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Parameters Tab */}
        <TabsContent value="parameters" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Model Parameters</CardTitle>
              <CardDescription>
                Fine-tune the model&apos;s behavior and output characteristics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Temperature */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="temperature" className="text-base">Temperature</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>
                            Controls randomness. Lower values make output more
                            focused and deterministic, higher values more creative.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Badge variant="secondary" className="text-sm font-mono">
                    {formData.temperature.toFixed(1)}
                  </Badge>
                </div>
                <Slider
                  id="temperature"
                  value={[formData.temperature]}
                  onValueChange={(value) =>
                    setFormData({ ...formData, temperature: value[0] })
                  }
                  min={CONFIG_LIMITS.TEMPERATURE.MIN}
                  max={CONFIG_LIMITS.TEMPERATURE.MAX}
                  step={CONFIG_LIMITS.TEMPERATURE.STEP}
                  className="w-full"
                />
                <div className="flex gap-2">
                  {TEMPERATURE_PRESETS.map((preset) => (
                    <Button
                      key={preset.label}
                      type="button"
                      variant={
                        formData.temperature === preset.value ? 'default' : 'outline'
                      }
                      size="sm"
                      onClick={() => applyTemperaturePreset(preset.value)}
                      className="flex-1"
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Max Tokens and Top P in one row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Max Tokens */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="maxTokens" className="text-base">Max Tokens</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Maximum number of tokens to generate in the response.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Badge variant="secondary" className="text-sm font-mono">
                      {formData.maxTokens.toLocaleString()}
                    </Badge>
                  </div>
                  <Slider
                    id="maxTokens"
                    value={[formData.maxTokens]}
                    onValueChange={(value) =>
                      setFormData({ ...formData, maxTokens: value[0] })
                    }
                    min={CONFIG_LIMITS.MAX_TOKENS.MIN}
                    max={CONFIG_LIMITS.MAX_TOKENS.MAX}
                    step={CONFIG_LIMITS.MAX_TOKENS.STEP}
                    className="w-full"
                  />
                </div>

                {/* Top P */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="topP" className="text-base">Top P</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>
                              Controls diversity via nucleus sampling. Lower values
                              make output more focused.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Badge variant="secondary" className="text-sm font-mono">
                      {formData.topP.toFixed(1)}
                    </Badge>
                  </div>
                  <Slider
                    id="topP"
                    value={[formData.topP]}
                    onValueChange={(value) =>
                      setFormData({ ...formData, topP: value[0] })
                    }
                    min={CONFIG_LIMITS.TOP_P.MIN}
                    max={CONFIG_LIMITS.TOP_P.MAX}
                    step={CONFIG_LIMITS.TOP_P.STEP}
                    className="w-full"
                  />
                </div>
              </div>

              <Separator />

              {/* Advanced Parameters */}
              <div className="space-y-6">
                <h3 className="text-sm font-semibold">Advanced Parameters</h3>

                {/* Frequency Penalty and Presence Penalty in one row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Frequency Penalty */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="frequencyPenalty" className="text-base">Frequency Penalty</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>
                                Reduces repetition of tokens based on their frequency
                                in the text.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Badge variant="secondary" className="text-sm font-mono">
                        {formData.frequencyPenalty.toFixed(1)}
                      </Badge>
                    </div>
                    <Slider
                      id="frequencyPenalty"
                      value={[formData.frequencyPenalty]}
                      onValueChange={(value) =>
                        setFormData({ ...formData, frequencyPenalty: value[0] })
                      }
                      min={CONFIG_LIMITS.FREQUENCY_PENALTY.MIN}
                      max={CONFIG_LIMITS.FREQUENCY_PENALTY.MAX}
                      step={CONFIG_LIMITS.FREQUENCY_PENALTY.STEP}
                      className="w-full"
                    />
                  </div>

                  {/* Presence Penalty */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="presencePenalty" className="text-base">Presence Penalty</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>
                                Encourages the model to talk about new topics by
                                penalizing repeated tokens.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Badge variant="secondary" className="text-sm font-mono">
                        {formData.presencePenalty.toFixed(1)}
                      </Badge>
                    </div>
                    <Slider
                      id="presencePenalty"
                      value={[formData.presencePenalty]}
                      onValueChange={(value) =>
                        setFormData({ ...formData, presencePenalty: value[0] })
                      }
                      min={CONFIG_LIMITS.PRESENCE_PENALTY.MIN}
                      max={CONFIG_LIMITS.PRESENCE_PENALTY.MAX}
                      step={CONFIG_LIMITS.PRESENCE_PENALTY.STEP}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Prompt Tab */}
        <TabsContent value="prompt" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Prompt</CardTitle>
              <CardDescription>
                Define the AI assistant&apos;s role, behavior, and personality
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="systemPrompt" className="text-base">Custom Prompt</Label>
                <Textarea
                  id="systemPrompt"
                  value={formData.systemPrompt}
                  onChange={(e) =>
                    setFormData({ ...formData, systemPrompt: e.target.value })
                  }
                  placeholder="Enter system prompt..."
                  className="min-h-[250px] resize-y font-mono text-sm"
                  maxLength={CONFIG_LIMITS.SYSTEM_PROMPT_MAX_LENGTH}
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Define how the AI should behave, its tone, and any specific instructions
                  </span>
                  <span>
                    {formData.systemPrompt.length} / {CONFIG_LIMITS.SYSTEM_PROMPT_MAX_LENGTH}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        </Tabs>
        </div>

        {/* Sticky Footer - Action Buttons */}
        <div className="flex-shrink-0 flex items-center justify-between pt-4 pb-2 border-t bg-card sticky bottom-0 z-10">
          <div className="text-sm text-muted-foreground">
            {hasChanges && '• Unsaved changes'}
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={!hasChanges || saving}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button type="submit" disabled={!hasChanges || saving} size="lg" loading={saving}>
                <Save className="h-4 w-4" />
              Save Configuration
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
