/**
 * Reusable Table Skeleton Component
 * Used for loading states in tables across the application
 */

import { Skeleton } from '@/components/ui/skeleton';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TableSkeletonProps {
  columns: number;
  rows?: number;
  showHeader?: boolean;
  columnWidths?: string[]; // Array of Tailwind width classes like ['w-[100px]', 'w-[250px]']
}

export function TableSkeleton({
  columns,
  rows = 5,
  showHeader = true,
  columnWidths
}: TableSkeletonProps) {
  return (
    <>
      {showHeader && (
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }).map((_, index) => (
              <TableHead key={index}>
                <div className={columnWidths?.[index] || 'w-full'}>
                  <Skeleton className="h-4 w-full" />
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      )}
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableCell key={colIndex}>
                <div className={columnWidths?.[colIndex] || 'w-full'}>
                  <Skeleton className="h-4 w-full" />
                </div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}
