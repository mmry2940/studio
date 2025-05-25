
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ContainerAutoConfigForm from './container-auto-config-form'; // Renamed import
import { Play, StopCircle, Settings2, Cpu, MemoryStick, HardDrive, Laptop, SlidersHorizontal, Package } from 'lucide-react'; // Added Package
import { useToast } from '@/hooks/use-toast';

export default function ContainerControls() {
  const [containerStatus, setContainerStatus] = useState<'stopped' | 'running' | 'pending'>('stopped');
  const { toast } = useToast();

  // State for manual configuration
  const [manualCpu, setManualCpu] = useState<number>(1); // Default to 1 core for containers
  const [manualRam, setManualRam] = useState<number>(2); // Default to 2GB RAM
  const [manualDisk, setManualDisk] = useState<number>(10); // Default to 10GB (might represent overlay size or volume)
  const [manualOs, setManualOs] = useState<string>('alpine'); // Default to Alpine Linux

  const handleStartContainer = () => {
    setContainerStatus('pending');
    toast({ title: 'Starting Container...', description: 'Please wait while the container instance starts up.' });
    setTimeout(() => {
      setContainerStatus('running');
      toast({ title: 'Container Started', description: 'The container instance is now running.', variant: 'default' });
    }, 2000);
  };

  const handleStopContainer = () => {
    setContainerStatus('pending');
    toast({ title: 'Stopping Container...', description: 'Please wait while the container instance shuts down.' });
    setTimeout(() => {
      setContainerStatus('stopped');
      toast({ title: 'Container Stopped', description: 'The container instance has been shut down.', variant: 'default' });
    }, 1500);
  };
  
  const handleApplyManualConfig = () => {
    toast({
      title: 'Manual Configuration Applied',
      description: `Container configured with: ${manualCpu} Cores, ${manualRam}GB RAM, ${manualDisk}GB Storage, Base Image: ${manualOs}`,
    });
    // Placeholder for actual config application logic
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <Card className="bg-sidebar border-sidebar-border shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-sidebar-foreground">
            <Settings2 className="h-5 w-5 text-primary" />
            Container Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={handleStartContainer}
            disabled={containerStatus === 'running' || containerStatus === 'pending'}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            aria-label="Start Container Instance"
          >
            <Play className="mr-2 h-4 w-4" />
            Start Container
          </Button>
          <Button
            onClick={handleStopContainer}
            disabled={containerStatus === 'stopped' || containerStatus === 'pending'}
            variant="destructive"
            className="w-full"
            aria-label="Stop Container Instance"
          >
            <StopCircle className="mr-2 h-4 w-4" />
            Stop Container
          </Button>
          <p className="text-xs text-sidebar-foreground/70 text-center">
            Current status: <span className={`font-semibold ${containerStatus === 'running' ? 'text-accent' : 'text-destructive'}`}>{containerStatus}</span>
          </p>
        </CardContent>
      </Card>

      <Separator className="bg-sidebar-border" />

      {/* AI Configuration Form */}
      <ContainerAutoConfigForm />

      <Separator className="bg-sidebar-border" />

      {/* Manual Configuration Card */}
      <Card className="bg-sidebar border-sidebar-border shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-sidebar-foreground">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            Manual Container Configuration
          </CardTitle>
          <CardDescription className="text-sidebar-foreground/70">
            Fine-tune your container's resources and base image.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="manual-cpu" className="flex items-center gap-1 text-sm text-sidebar-foreground/80">
              <Cpu className="h-4 w-4" /> CPU Cores
            </Label>
            <Input 
              id="manual-cpu" 
              type="number" 
              value={manualCpu} 
              onChange={(e) => setManualCpu(parseFloat(e.target.value) || 0.1)} // Allow fractional CPUs
              min="0.1"
              step="0.1"
              className="bg-input border-border focus:ring-primary text-sidebar-foreground" 
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="manual-ram" className="flex items-center gap-1 text-sm text-sidebar-foreground/80">
              <MemoryStick className="h-4 w-4" /> RAM (GB)
            </Label>
            <Input 
              id="manual-ram" 
              type="number" 
              value={manualRam} 
              onChange={(e) => setManualRam(parseFloat(e.target.value) || 0.5)} 
              min="0.1"
              step="0.1"
              className="bg-input border-border focus:ring-primary text-sidebar-foreground" 
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="manual-disk" className="flex items-center gap-1 text-sm text-sidebar-foreground/80">
              <HardDrive className="h-4 w-4" /> Storage (GB)
            </Label>
            <Input 
              id="manual-disk" 
              type="number" 
              value={manualDisk} 
              onChange={(e) => setManualDisk(parseInt(e.target.value) || 1)} 
              min="1"
              className="bg-input border-border focus:ring-primary text-sidebar-foreground" 
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="manual-os" className="flex items-center gap-1 text-sm text-sidebar-foreground/80">
              <Package className="h-4 w-4" /> Base Image / OS
            </Label>
            <Select value={manualOs} onValueChange={setManualOs}>
              <SelectTrigger id="manual-os" className="w-full bg-input border-border focus:ring-primary text-sidebar-foreground">
                <SelectValue placeholder="Select Base Image" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-popover text-popover-foreground">
                <SelectItem value="alpine">Alpine Linux</SelectItem>
                <SelectItem value="ubuntu">Ubuntu</SelectItem>
                <SelectItem value="debian">Debian</SelectItem>
                <SelectItem value="centos">CentOS</SelectItem>
                <SelectItem value="windows_servercore">Windows Server Core</SelectItem>
                <SelectItem value="custom">Custom Image</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleApplyManualConfig} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Apply Manual Configuration
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
