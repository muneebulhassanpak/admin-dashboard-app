'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Users,
  DollarSign,
  MessageSquare,
  Settings,
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
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="h-16 border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="data-[state=collapsed]:justify-center">
              <Link href={ROUTES.DASHBOARD.ROOT} className="flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm transition-all">
                  <span className="text-lg font-bold">A</span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Admin Portal</span>
                  <span className="truncate text-xs text-muted-foreground">Dashboard v1.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="transition-all duration-200">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                      className="transition-all duration-200"
                    >
                      <Link href={item.url}>
                        <item.icon className="transition-transform duration-200" />
                        <span className="transition-opacity duration-200">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="transition-all duration-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings" className="transition-all duration-200">
              <Link href={ROUTES.DASHBOARD.SETTINGS}>
                <Settings className="transition-transform duration-200" />
                <span className="transition-opacity duration-200">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip="Logout" className="transition-all duration-200">
              <LogOut className="transition-transform duration-200" />
              <span className="transition-opacity duration-200">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
