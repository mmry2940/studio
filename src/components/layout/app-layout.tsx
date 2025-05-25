"use client";

import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarContent,
  SidebarHeader as ShadSidebarHeader,
  SidebarFooter as ShadSidebarFooter,
  SidebarRail,
} from '@/components/ui/sidebar';

interface AppLayoutProps {
  children: ReactNode;
  sidebarHeaderContent: ReactNode;
  sidebarNavigationContent: ReactNode;
  sidebarFooterContent?: ReactNode;
  mainHeaderContent: ReactNode;
}

export default function AppLayout({
  children,
  sidebarHeaderContent,
  sidebarNavigationContent,
  sidebarFooterContent,
  mainHeaderContent,
}: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar
        collapsible="icon" // Collapses to icons
        variant="sidebar" // Standard sidebar style
        side="left"
        className="border-r border-sidebar-border"
      >
        <ShadSidebarHeader className="p-4 border-b border-sidebar-border">
          {sidebarHeaderContent}
        </ShadSidebarHeader>
        <SidebarContent className="p-2 md:p-4">
          {sidebarNavigationContent}
        </SidebarContent>
        {sidebarFooterContent && (
          <ShadSidebarFooter className="p-4 border-t border-sidebar-border">
            {sidebarFooterContent}
          </ShadSidebarFooter>
        )}
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        {mainHeaderContent}
        <main className="flex-1 p-4 md:p-6 bg-background">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
