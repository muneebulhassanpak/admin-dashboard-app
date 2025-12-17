/**
 * OtherSettingsForm Component
 * Form for managing disclaimers and maintenance mode
 */

'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Save, AlertTriangle, Settings2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import type { UpdateOtherSettingsDto, OtherSettings } from '../types';
import { SETTINGS_LIMITS } from '../utils/constants';

interface OtherSettingsFormProps {
  settings: OtherSettings;
  onSave: (settings: UpdateOtherSettingsDto) => Promise<void>;
  onToggleMaintenance: () => Promise<void>;
  saving: boolean;
}

export function OtherSettingsForm({
  settings,
  onSave,
  onToggleMaintenance,
  saving,
}: OtherSettingsFormProps) {
  const [formData, setFormData] = useState<UpdateOtherSettingsDto>({
    childDisclaimer: settings.childDisclaimer,
    parentDisclaimer: settings.parentDisclaimer,
    maintenanceMode: settings.maintenanceMode,
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [togglingMaintenance, setTogglingMaintenance] = useState(false);

  // Track changes
  useEffect(() => {
    const changed =
      formData.childDisclaimer !== settings.childDisclaimer ||
      formData.parentDisclaimer !== settings.parentDisclaimer;
    setHasChanges(changed);
  }, [formData, settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(formData);
      toast.success('Settings updated successfully', {
        description: 'Your disclaimers have been updated.',
        position: 'top-center',
      });
      setHasChanges(false);
    } catch (error) {
      toast.error('Failed to update settings', {
        description:
          error instanceof Error ? error.message : 'An error occurred',
        position: 'top-center',
      });
    }
  };

  const handleMaintenanceToggle = async () => {
    setTogglingMaintenance(true);
    try {
      await onToggleMaintenance();
      const newState = !settings.maintenanceMode;
      toast.success(
        `Maintenance mode ${newState ? 'enabled' : 'disabled'}`,
        {
          description: newState
            ? 'Users will see a maintenance notice.'
            : 'Application is now accessible to users.',
          position: 'top-center',
        }
      );
    } catch (error) {
      toast.error('Failed to toggle maintenance mode', {
        description:
          error instanceof Error ? error.message : 'An error occurred',
        position: 'top-center',
      });
    } finally {
      setTogglingMaintenance(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="space-y-0.5 mb-4">
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <Settings2 className="h-5 w-5 text-primary" />
          Other Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Update disclaimers and logo, put on maintenance notice and trigger
          google drive file import feature.
        </p>
      </div>

      {/* Scrollable Content */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto pr-3 space-y-8">
          {/* Disclaimers Section */}
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold">Disclaimers</h2>
              <p className="text-sm text-muted-foreground">
                Set custom disclaimer messages for different user types
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Child Disclaimer */}
              <div className="space-y-2">
                <Label htmlFor="childDisclaimer" className="text-sm font-medium">
                  Child Disclaimer
                </Label>
                <Textarea
                  id="childDisclaimer"
                  value={formData.childDisclaimer}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      childDisclaimer: e.target.value,
                    })
                  }
                  placeholder="Enter child disclaimer..."
                  className="min-h-[120px] resize-none"
                  maxLength={SETTINGS_LIMITS.CHILD_DISCLAIMER_MAX_LENGTH}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {formData.childDisclaimer.length} /{' '}
                  {SETTINGS_LIMITS.CHILD_DISCLAIMER_MAX_LENGTH}
                </p>
              </div>

              {/* Parent Disclaimer */}
              <div className="space-y-2">
                <Label htmlFor="parentDisclaimer" className="text-sm font-medium">
                  Parent Disclaimer
                </Label>
                <Textarea
                  id="parentDisclaimer"
                  value={formData.parentDisclaimer}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      parentDisclaimer: e.target.value,
                    })
                  }
                  placeholder="Enter parent disclaimer..."
                  className="min-h-[120px] resize-none"
                  maxLength={SETTINGS_LIMITS.PARENT_DISCLAIMER_MAX_LENGTH}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {formData.parentDisclaimer.length} /{' '}
                  {SETTINGS_LIMITS.PARENT_DISCLAIMER_MAX_LENGTH}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Maintenance Mode Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <div>
                <h2 className="text-base font-semibold">Maintenance Mode</h2>
                <p className="text-sm text-muted-foreground">
                  Enable maintenance mode to prevent user access during updates
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex-1">
                <p className="font-medium text-sm">Maintenance Notice</p>
                <p className="text-sm text-muted-foreground">
                  {settings.maintenanceMode
                    ? 'Application is currently in maintenance mode'
                    : 'Application is accessible to users'}
                </p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={handleMaintenanceToggle}
                disabled={togglingMaintenance}
                className="ml-4"
              />
            </div>
          </div>
        </div>

        {/* Sticky Footer - Action Buttons */}
        <div className="flex-shrink-0 flex items-center justify-between pt-4 pb-2 border-t bg-card sticky bottom-0 z-10">
          <div className="text-sm text-muted-foreground">
            {hasChanges && '• Unsaved changes'}
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="submit"
              disabled={!hasChanges || saving}
              size="lg"
            >
              {saving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Update Disclaimers
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
