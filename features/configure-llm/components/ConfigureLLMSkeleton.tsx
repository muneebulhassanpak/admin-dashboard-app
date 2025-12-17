/**
 * ConfigureLLMSkeleton Component
 * Loading skeleton for the Configure LLM form - only shows skeletons for fetched data
 */

import { Sparkles, Cpu, Sliders, MessageSquare, Search } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Save, RotateCcw } from 'lucide-react';

export function ConfigureLLMSkeleton() {
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
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto pr-3 space-y-4">
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

            {/* Model Selection Tab - Only skeleton for data */}
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
                    {/* Left side - Model List Skeleton */}
                    <div className="lg:col-span-2 space-y-3">
                      {/* Search Bar - Static */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search models..."
                          disabled
                          className="pl-9"
                        />
                      </div>

                      {/* Model List Skeleton */}
                      <ScrollArea className="h-[500px] rounded-lg border">
                        <div className="p-2 pr-4 space-y-1">
                          {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                              key={i}
                              className="p-3 rounded-lg border"
                            >
                              <Skeleton className="h-4 w-32 mb-2" />
                              <Skeleton className="h-3 w-full mb-1" />
                              <Skeleton className="h-3 w-3/4 mb-2" />
                              <Skeleton className="h-5 w-16" />
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>

                    {/* Right side - Model Details Skeleton */}
                    <div className="lg:col-span-3">
                      <div className="rounded-lg border bg-muted/30 p-6 h-[500px] flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <Skeleton className="h-7 w-48 mb-2" />
                            <Skeleton className="h-5 w-24" />
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-6 flex-1">
                          <div>
                            <Skeleton className="h-4 w-20 mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-3/4" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg border bg-background p-4">
                              <Skeleton className="h-3 w-24 mb-2" />
                              <Skeleton className="h-6 w-20 mb-1" />
                              <Skeleton className="h-3 w-12" />
                            </div>
                            <div className="rounded-lg border bg-background p-4">
                              <Skeleton className="h-3 w-20 mb-2" />
                              <Skeleton className="h-6 w-16 mb-1" />
                              <Skeleton className="h-3 w-12" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Parameters Tab - Full skeleton for config data */}
            <TabsContent value="parameters" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Model Parameters</CardTitle>
                  <CardDescription>
                    Fine-tune the model&apos;s behavior and output characteristics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-5 w-12" />
                      </div>
                      <Skeleton className="h-2 w-full" />
                      {i === 1 && (
                        <div className="flex gap-2">
                          <Skeleton className="h-9 flex-1" />
                          <Skeleton className="h-9 flex-1" />
                          <Skeleton className="h-9 flex-1" />
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Prompt Tab - Only skeleton for textarea */}
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
                    <Label htmlFor="systemPrompt" className="text-base">
                      Custom Prompt
                    </Label>
                    <Skeleton className="h-[250px] w-full rounded-md" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        Define how the AI should behave, its tone, and any specific instructions
                      </span>
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sticky Footer - Static */}
        <div className="flex-shrink-0 flex items-center justify-between pt-4 pb-2 border-t bg-card sticky bottom-0 z-10">
          <div className="text-sm text-muted-foreground"></div>
          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" disabled>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button type="submit" disabled size="lg">
              <Save className="mr-2 h-4 w-4" />
              Save Configuration
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
