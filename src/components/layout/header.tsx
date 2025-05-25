import { SidebarTrigger } from '@/components/ui/sidebar';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:h-16 sm:px-6">
      <SidebarTrigger className="text-foreground hover:text-accent-foreground" />
      {/* Placeholder for potential breadcrumbs or page title if needed */}
      <div className="flex-1">
        {/* <h1 className="text-lg font-semibold">Dashboard</h1> */}
      </div>
      {/* Placeholder for user profile or other actions */}
      {/* <UserNav /> */}
    </header>
  );
}
