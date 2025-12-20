/**
 * Create Plan Modal Component
 * Modal for creating new pricing plans
 */

'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { CreatePlanDto, PricingFeature } from '../types';
import { AVAILABLE_FEATURES } from '../utils/constants';

interface CreatePlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreatePlanDto) => Promise<void>;
  creating?: boolean;
}

export function CreatePlanModal({
  open,
  onOpenChange,
  onSubmit,
  creating = false,
}: CreatePlanModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    monthlyPrice: '',
    yearlyPrice: '',
    maxLearners: '',
    maxLessonsPerMonth: '',
  });

  const [features, setFeatures] = useState<PricingFeature[]>(
    AVAILABLE_FEATURES.map((name) => ({ name, enabled: false }))
  );

  const [unlimitedLearners, setUnlimitedLearners] = useState(false);
  const [unlimitedLessons, setUnlimitedLessons] = useState(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setFormData({
        name: '',
        description: '',
        monthlyPrice: '',
        yearlyPrice: '',
        maxLearners: '',
        maxLessonsPerMonth: '',
      });
      setFeatures(AVAILABLE_FEATURES.map((name) => ({ name, enabled: false })));
      setUnlimitedLearners(false);
      setUnlimitedLessons(false);
    }
  }, [open]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFeatureToggle = (index: number) => {
    setFeatures((prev) =>
      prev.map((f, i) => (i === index ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error('Plan name is required', { position: 'top-center' });
      return;
    }

    if (!formData.description.trim()) {
      toast.error('Plan description is required', { position: 'top-center' });
      return;
    }

    const monthlyPrice = parseFloat(formData.monthlyPrice);
    const yearlyPrice = parseFloat(formData.yearlyPrice);

    if (isNaN(monthlyPrice) || monthlyPrice < 0) {
      toast.error('Please enter a valid monthly price', { position: 'top-center' });
      return;
    }

    if (isNaN(yearlyPrice) || yearlyPrice < 0) {
      toast.error('Please enter a valid yearly price', { position: 'top-center' });
      return;
    }

    const maxLearners = unlimitedLearners
      ? null
      : parseInt(formData.maxLearners);

    if (!unlimitedLearners && (isNaN(maxLearners!) || maxLearners! <= 0)) {
      toast.error('Please enter a valid maximum number of learners', { position: 'top-center' });
      return;
    }

    const maxLessonsPerMonth = unlimitedLessons
      ? null
      : parseInt(formData.maxLessonsPerMonth);

    if (!unlimitedLessons && (isNaN(maxLessonsPerMonth!) || maxLessonsPerMonth! <= 0)) {
      toast.error('Please enter a valid maximum lessons per month', { position: 'top-center' });
      return;
    }

    const enabledFeatures = features.filter((f) => f.enabled);
    if (enabledFeatures.length === 0) {
      toast.error('Please select at least one feature', { position: 'top-center' });
      return;
    }

    const dto: CreatePlanDto = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      monthlyPrice,
      yearlyPrice,
      maxLearners,
      maxLessonsPerMonth,
      features,
    };

    try {
      await onSubmit(dto);
      toast.success('Plan created successfully', { position: 'top-center' });
      onOpenChange(false);
    } catch (err) {
      // Error is handled by parent
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-3xl max-h-[90vh] flex flex-col p-0 gap-0">
        <div className="px-6 pt-6 pb-4 border-b">
          <DialogHeader>
            <DialogTitle>Create New Pricing Plan</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new pricing plan for your users.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <ScrollArea className="flex-1 px-6 py-4">
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Basic Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="name">Plan Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Premium Plan"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={creating}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the plan and what makes it unique..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    disabled={creating}
                    rows={3}
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Pricing</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyPrice">Monthly Price ($) *</Label>
                    <Input
                      id="monthlyPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.monthlyPrice}
                      onChange={(e) => handleInputChange('monthlyPrice', e.target.value)}
                      disabled={creating}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yearlyPrice">Yearly Price ($) *</Label>
                    <Input
                      id="yearlyPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.yearlyPrice}
                      onChange={(e) => handleInputChange('yearlyPrice', e.target.value)}
                      disabled={creating}
                    />
                  </div>
                </div>
              </div>

              {/* Limits */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Usage Limits</h3>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="unlimitedLearners"
                      checked={unlimitedLearners}
                      onCheckedChange={(checked) => setUnlimitedLearners(checked as boolean)}
                      disabled={creating}
                    />
                    <Label htmlFor="unlimitedLearners" className="cursor-pointer">
                      Unlimited Learners
                    </Label>
                  </div>

                  {!unlimitedLearners && (
                    <Input
                      id="maxLearners"
                      type="number"
                      min="1"
                      placeholder="e.g., 5"
                      value={formData.maxLearners}
                      onChange={(e) => handleInputChange('maxLearners', e.target.value)}
                      disabled={creating}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="unlimitedLessons"
                      checked={unlimitedLessons}
                      onCheckedChange={(checked) => setUnlimitedLessons(checked as boolean)}
                      disabled={creating}
                    />
                    <Label htmlFor="unlimitedLessons" className="cursor-pointer">
                      Unlimited Lessons per Month
                    </Label>
                  </div>

                  {!unlimitedLessons && (
                    <Input
                      id="maxLessonsPerMonth"
                      type="number"
                      min="1"
                      placeholder="e.g., 100"
                      value={formData.maxLessonsPerMonth}
                      onChange={(e) => handleInputChange('maxLessonsPerMonth', e.target.value)}
                      disabled={creating}
                    />
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Features *</h3>
                <p className="text-sm text-muted-foreground">
                  Select the features included in this plan
                </p>

                <div className="space-y-3 border rounded-lg p-4">
                  {features.map((feature, index) => (
                    <div key={feature.name} className="flex items-center gap-2">
                      <Checkbox
                        id={`feature-${index}`}
                        checked={feature.enabled}
                        onCheckedChange={() => handleFeatureToggle(index)}
                        disabled={creating}
                      />
                      <Label htmlFor={`feature-${index}`} className="cursor-pointer font-normal">
                        {feature.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="px-6 py-4 border-t bg-background flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={creating}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={creating}
              loading={creating}
              className="flex-1"
            >
              Create Plan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
