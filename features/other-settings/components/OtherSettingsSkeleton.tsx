/**
 * OtherSettingsSkeleton Component
 * Loading skeleton for Other Settings form
 */

import { Settings2, AlertTriangle, Save } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export function OtherSettingsSkeleton() {
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
      <div className="flex-1 flex flex-col min-h-0">
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
              {/* Child Disclaimer Skeleton */}
              <div className="space-y-2">
                <Label htmlFor="childDisclaimer" className="text-sm font-medium">
                  Child Disclaimer
                </Label>
                <Skeleton className="h-[120px] w-full rounded-md" />
                <Skeleton className="h-3 w-20 ml-auto" />
              </div>

              {/* Parent Disclaimer Skeleton */}
              <div className="space-y-2">
                <Label htmlFor="parentDisclaimer" className="text-sm font-medium">
                  Parent Disclaimer
                </Label>
                <Skeleton className="h-[120px] w-full rounded-md" />
                <Skeleton className="h-3 w-20 ml-auto" />
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
                <Skeleton className="h-4 w-64 mt-1" />
              </div>
              <Switch disabled className="ml-4" />
            </div>
          </div>
        </div>

        {/* Sticky Footer - Static */}
        <div className="flex-shrink-0 flex items-center justify-between pt-4 pb-2 border-t bg-card sticky bottom-0 z-10">
          <div className="text-sm text-muted-foreground"></div>
          <div className="flex items-center gap-3">
            <Button type="submit" disabled size="lg">
              <Save className="mr-2 h-4 w-4" />
              Update Disclaimers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
