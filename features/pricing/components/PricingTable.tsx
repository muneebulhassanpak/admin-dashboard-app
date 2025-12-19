/**
 * Pricing Table Component
 * Admin table for managing pricing plans with TanStack Table
 */

'use client';

import { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2, Users, CheckCircle, XCircle, Loader } from 'lucide-react';
import type { PricingPlan } from '../types';
import { PlanStatus } from '../types';
import { TableSkeleton } from '@/components/skeletons';

interface PricingTableProps {
  plans: PricingPlan[];
  loading: boolean;
  updating: string | null;
  deleting: string | null;
  onEditPlan: (plan: PricingPlan) => void;
  onDeletePlan: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const getStatusBadgeVariant = (status: PlanStatus) => {
  switch (status) {
    case PlanStatus.ACTIVE:
      return 'default';
    case PlanStatus.INACTIVE:
      return 'secondary';
    case PlanStatus.ARCHIVED:
      return 'outline';
    default:
      return 'secondary';
  }
};

const formatPrice = (price: number) => {
  return price === 0 ? 'Free' : `$${price}`;
};

const formatLimit = (limit: number | null) => {
  return limit === null ? 'Unlimited' : limit.toString();
};

export function PricingTable({
  plans,
  loading,
  updating,
  deleting,
  onEditPlan,
  onDeletePlan,
  onToggleStatus,
}: PricingTableProps) {
  const columns = useMemo<ColumnDef<PricingPlan>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Plan Name',
        cell: ({ row }) => {
          const plan = row.original;
          return (
            <div className="w-[200px]">
              <div className="flex items-center gap-2">
                <span className="font-medium">{plan.name}</span>
                {plan.isDefault && (
                  <Badge variant="outline" className="text-xs">
                    Default
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate mt-1" title={plan.description}>
                {plan.description}
              </p>
            </div>
          );
        },
      },
      {
        id: 'pricing',
        header: 'Pricing',
        cell: ({ row }) => {
          const plan = row.original;
          return (
            <div className="w-[120px]">
              <div className="text-sm font-medium">{formatPrice(plan.monthlyPrice)}/mo</div>
              <div className="text-xs text-muted-foreground">{formatPrice(plan.yearlyPrice)}/yr</div>
            </div>
          );
        },
      },
      {
        id: 'limits',
        header: 'Limits',
        cell: ({ row }) => {
          const plan = row.original;
          return (
            <div className="w-[160px] text-sm">
              <div>{formatLimit(plan.maxLearners)} learners</div>
              <div className="text-xs text-muted-foreground">
                {formatLimit(plan.maxLessonsPerMonth)} lessons/mo
              </div>
            </div>
          );
        },
      },
      {
        id: 'subscribers',
        header: 'Subscribers',
        cell: ({ row }) => {
          const plan = row.original;
          return (
            <div className="w-[100px]">
              <div className="flex items-center gap-1 text-sm">
                <Users className="w-4 h-4" />
                <span>{plan.subscriberCount || 0}</span>
              </div>
            </div>
          );
        },
      },
      {
        id: 'features',
        header: 'Features',
        cell: ({ row }) => {
          const plan = row.original;
          const enabledFeatures = plan.features.filter((f) => f.enabled).length;
          return (
            <div className="w-[100px] text-sm">
              {enabledFeatures} / {plan.features.length}
            </div>
          );
        },
      },
      {
        id: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const plan = row.original;
          const isUpdating = updating === plan.id;

          if (isUpdating) {
            return (
              <div className="w-[90px]">
                <Loader className="h-4 w-4 animate-spin" />
              </div>
            );
          }

          return (
            <div className="w-[90px]">
              <Badge variant={getStatusBadgeVariant(plan.status)}>
                {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
              </Badge>
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
          const plan = row.original;
          const isDeleting = deleting === plan.id;
          const isUpdating = updating === plan.id;

          return (
            <div className="w-[80px] flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    disabled={isDeleting || isUpdating}
                    loading={isDeleting}
                  >
                      <MoreHorizontal className="h-4 w-4" />               
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEditPlan(plan)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Plan
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {plan.status === PlanStatus.ACTIVE ? (
                    <DropdownMenuItem onClick={() => onToggleStatus(plan.id)}>
                      <XCircle className="mr-2 h-4 w-4" />
                      Deactivate
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={() => onToggleStatus(plan.id)}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Activate
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onDeletePlan(plan.id)}
                    className="text-destructive focus:text-destructive"
                    disabled={plan.isDefault || (!!plan.subscriberCount && plan.subscriberCount > 0)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [updating, deleting, onEditPlan, onDeletePlan, onToggleStatus]
  );

  const table = useReactTable({
    data: plans,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  });

  return (
    <div className="rounded-lg border">
      <div className="relative w-full overflow-x-auto">
        <table className="caption-bottom text-sm w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          {loading ? (
            <TableSkeleton
              columns={columns.length}
              rows={5}
              showHeader={false}
              columnWidths={['w-[200px]', 'w-[120px]', 'w-[160px]', 'w-[100px]', 'w-[100px]', 'w-[90px]', 'w-[80px]']}
            />
          ) : (
            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    No pricing plans found
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          )}
        </table>
      </div>
    </div>
  );
}
