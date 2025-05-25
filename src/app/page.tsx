
import AppLayout from '@/components/layout/app-layout';
import ContainerDisplay from '@/components/features/container-display'; // Renamed import
import ContainerControls from '@/components/features/container-controls'; // Renamed import
import Header from '@/components/layout/header';
import AppLogoName from '@/components/layout/app-logo-name';
import { SheetTitle } from '@/components/ui/sheet'; // Keep for MobileAwareSidebarHeader

export default function HomePage() {
  return (
    <AppLayout
      sidebarHeaderContent={<AppLogoName />}
      sidebarNavigationContent={<ContainerControls />} // Use renamed component
      mainHeaderContent={<Header />}
    >
      <ContainerDisplay /> {/* Use renamed component */}
    </AppLayout>
  );
}
