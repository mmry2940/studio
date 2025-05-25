import { Tv2 } from 'lucide-react';
import Link from 'next/link';

export default function AppLogoName() {
  return (
    <Link href="/" className="flex items-center gap-2 text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors">
      <Tv2 className="h-7 w-7 text-primary" />
      <span className="font-semibold text-xl">RemoteBox</span>
    </Link>
  );
}
