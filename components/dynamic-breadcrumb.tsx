"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ROUTES } from "@/lib/routes";

// Map route paths to readable names
const routeNames: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/user-management": "User Management",
  "/dashboard/pricing": "Pricing Plans",
  "/dashboard/complaint-center": "Complaint Center",
  "/dashboard/configure-llm": "Configure LLM",
  "/dashboard/other-settings": "Other Settings",
  "/dashboard/manage-knowledge-base": "Manage Knowledge Base",
  "/dashboard/document-uploads": "Document Uploads",
  "/dashboard/settings": "Settings",
  "/dashboard/subscription-management": "Subscription Management",
};

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname
  const pathSegments = pathname.split("/").filter(Boolean);

  // Build breadcrumb items
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const name = routeNames[path] || segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    const isLast = index === pathSegments.length - 1;

    return {
      path,
      name,
      isLast,
    };
  });

  // If we're on the dashboard root, show "Overview"
  if (pathname === "/dashboard") {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href={ROUTES.DASHBOARD.ROOT}>
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Overview</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <div key={item.path} className="contents">
            {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
            <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
              {item.isLast ? (
                <BreadcrumbPage>{item.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.path}>{item.name}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
