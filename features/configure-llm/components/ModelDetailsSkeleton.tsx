/**
 * ModelDetailsSkeleton Component
 * Loading skeleton for model details view
 */

import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export function ModelDetailsSkeleton() {
  return (
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

        <div className="rounded-lg border bg-background p-4">
          <Skeleton className="h-4 w-28 mb-3" />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
