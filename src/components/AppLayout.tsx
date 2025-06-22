
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Mail,
  PenSquare,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/builder", label: "Resume Builder", icon: FileText },
  { href: "/cover-letter", label: "Cover Letter AI", icon: Mail },
  { href: "/review", label: "Resume Review AI", icon: PenSquare },
];

function AppLayoutUI({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div
            className={cn(
              "flex items-center gap-2 p-2",
              state === "collapsed" ? "justify-center" : "justify-start"
            )}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 shrink-0"
              asChild
            >
              <Link href="/">
                <Sparkles className="h-6 w-6 text-primary" />
              </Link>
            </Button>
            <h1
              className={cn(
                "text-xl font-headline font-semibold whitespace-nowrap",
                state === "collapsed" ? "hidden" : "block"
              )}
            >
              CareerCraft AI
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{
                    children: item.label,
                    className: "font-headline",
                  }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppLayoutUI>{children}</AppLayoutUI>
    </SidebarProvider>
  );
}
