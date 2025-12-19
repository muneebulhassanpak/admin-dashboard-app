import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { DynamicBreadcrumb } from '@/components/dynamic-breadcrumb';
import { ModeToggle } from '@/components/theme-toggle';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar variant='floating' />
      <SidebarInset className='p-2 pr-0 h-screen'>
        <div className="flex flex-col h-full rounded-xl border bg-card shadow-sm">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-card">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <DynamicBreadcrumb />
            <div className="ml-auto">
              <ModeToggle />
            </div>
          </header>
          <div className="flex-1 overflow-y-auto p-4 md:p-6">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
