
import AppLayout from '@/components/layout/app-layout';
import VmDisplay from '@/components/features/vm-display';
import VmControls from '@/components/features/vm-controls';
import Header from '@/components/layout/header';
import AppLogoName from '@/components/layout/app-logo-name';
// SheetTitle import is no longer needed here as it's handled by MobileAwareSidebarHeader

export default function HomePage() {
  return (
    <AppLayout
      sidebarHeaderContent={<AppLogoName />} // Pass AppLogoName directly
      sidebarNavigationContent={<VmControls />}
      mainHeaderContent={<Header />}
    >
      <VmDisplay />
    </AppLayout>
  );
}
