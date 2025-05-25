import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MonitorPlay } from 'lucide-react';

export default function VmDisplay() {
  return (
    <Card className="w-full h-[calc(100vh-10rem)] shadow-2xl border-2 border-primary/30 bg-card overflow-hidden flex flex-col">
      <CardHeader className="bg-card-foreground/5 border-b border-border">
        <CardTitle className="flex items-center gap-2 text-xl text-foreground">
          <MonitorPlay className="h-6 w-6 text-primary" />
          Virtual Machine Display
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Interactive session will appear here when VM is running.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center p-0 relative">
        {/* Placeholder content */}
        <div 
          className="absolute inset-0 bg-repeat opacity-5" 
          style={{ 
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%233F51B5' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" 
          }}
          aria-hidden="true"
        ></div>
        <div className="text-center p-8 z-10">
          <MonitorPlay className="h-24 w-24 text-primary/40 mx-auto mb-4" />
          <p className="text-2xl font-semibold text-muted-foreground">
            VM Display Area
          </p>
          <p className="text-muted-foreground mt-2">
            Start a VM to begin interaction.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
