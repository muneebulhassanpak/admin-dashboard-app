'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Users,
  DollarSign,
  MessageSquare,
  Settings,
  CreditCard,
  Sliders,
  BookOpen,
  Upload,
  Home,
  LogOut,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/lib/routes';

const menuItems = [
  {
    title: 'Dashboard',
    url: ROUTES.DASHBOARD.ROOT,
    icon: Home,
  },
  {
    title: 'User Management',
    url: ROUTES.DASHBOARD.USER_MANAGEMENT,
    icon: Users,
  },
  {
    title: 'Pricing',
    url: ROUTES.DASHBOARD.PRICING,
    icon: DollarSign,
  },
  {
    title: 'Complaint Center',
    url: ROUTES.DASHBOARD.COMPLAINT_CENTER,
    icon: MessageSquare,
  },
  {
    title: 'Configure LLM',
    url: ROUTES.DASHBOARD.CONFIGURE_LLM,
    icon: Settings,
  },
  {
    title: 'Subscription Management',
    url: ROUTES.DASHBOARD.SUBSCRIPTION_MANAGEMENT,
    icon: CreditCard,
  },
  {
    title: 'Other Settings',
    url: ROUTES.DASHBOARD.OTHER_SETTINGS,
    icon: Sliders,
  },
  {
    title: 'Manage Knowledge Base',
    url: ROUTES.DASHBOARD.MANAGE_KNOWLEDGE_BASE,
    icon: BookOpen,
  },
  {
    title: 'Document Uploads',
    url: ROUTES.DASHBOARD.DOCUMENT_UPLOADS,
    icon: Upload,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear user from localStorage
    localStorage.removeItem('user');
    // Redirect to login
   router.push(ROUTES.LOGIN);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm">
            <span className="text-xl font-bold">A</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight">
              Admin Portal
            </span>
            <span className="text-xs text-muted-foreground">Dashboard v1.0</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                      className="group"
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t px-3 py-3">
        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start hover:bg-accent"
            asChild
          >
            <Link href={ROUTES.DASHBOARD.SETTINGS}>
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start hover:bg-destructive/10 hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
