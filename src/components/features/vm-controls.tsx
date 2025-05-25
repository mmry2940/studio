
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import VmAutoConfigForm from './vm-auto-config-form';
import { Play, StopCircle, Settings2, MonitorSmartphone, Cpu, MemoryStick, HardDrive, Laptop, SlidersHorizontal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function VmControls() {
  const [vmStatus, setVmStatus] = useState<'stopped' | 'running' | 'pending'>('stopped');
  const { toast } = useToast();

  // State for manual configuration
  const [manualCpu, setManualCpu] = useState<number>(2);
  const [manualRam, setManualRam] = useState<number>(4);
  const [manualDisk, setManualDisk] = useState<number>(50);
  const [manualOs, setManualOs] = useState<string>('linux');

  const handleStartVm = () => {
    setVmStatus('pending');
    toast({ title: 'Starting VM...', description: 'Please wait while the virtual machine boots up.' });
    setTimeout(() => {
      setVmStatus('running');
      toast({ title: 'VM Started', description: 'The virtual machine is now running.', variant: 'default' });
    }, 2000);
  };

  const handleStopVm = () => {
    setVmStatus('pending');
    toast({ title: 'Stopping VM...', description: 'Please wait while the virtual machine shuts down.' });
    setTimeout(() => {
      setVmStatus('stopped');
      toast({ title: 'VM Stopped', description: 'The virtual machine has been shut down.', variant: 'default' });
    }, 1500);
  };
  
  const handleDisplayResize = (value: string) => {
    toast({
      title: 'Display Setting Changed',
      description: `Display set to: ${value}`,
    });
  };

  const handleApplyManualConfig = () => {
    toast({
      title: 'Manual Configuration Applied',
      description: `VM configured with: ${manualCpu} Cores, ${manualRam}GB RAM, ${manualDisk}GB Disk, OS: ${manualOs.toUpperCase()}`,
    });
    // Placeholder for actual config application logic
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <Card className="bg-sidebar border-sidebar-border shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-sidebar-foreground">
            <Settings2 className="h-5 w-5 text-primary" />
            VM Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={handleStartVm}
            disabled={vmStatus === 'running' || vmStatus === 'pending'}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            aria-label="Start Virtual Machine"
          >
            <Play className="mr-2 h-4 w-4" />
            Start VM
          </Button>
          <Button
            onClick={handleStopVm}
            disabled={vmStatus === 'stopped' || vmStatus === 'pending'}
            variant="destructive"
            className="w-full"
            aria-label="Stop Virtual Machine"
          >
            <StopCircle className="mr-2 h-4 w-4" />
            Stop VM
          </Button>
          <p className="text-xs text-sidebar-foreground/70 text-center">
            Current status: <span className={`font-semibold ${vmStatus === 'running' ? 'text-accent' : 'text-destructive'}`}>{vmStatus}</span>
          </p>
        </CardContent>
      </Card>

      <Separator className="bg-sidebar-border" />
      
      <Card className="bg-sidebar border-sidebar-border shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-sidebar-foreground">
            <MonitorSmartphone className="h-5 w-5 text-primary" />
            Display Settings
          </CardTitle>
          <CardDescription className="text-sidebar-foreground/70">Adjust the virtual machine display.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="auto" onValueChange={handleDisplayResize} className="text-sidebar-foreground/90">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="auto" id="disp-auto" />
              <Label htmlFor="disp-auto" className="cursor-pointer">Auto-fit</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1024x768" id="disp-1024" />
              <Label htmlFor="disp-1024" className="cursor-pointer">1024x768</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1920x1080" id="disp-1920" />
              <Label htmlFor="disp-1920" className="cursor-pointer">1920x1080</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Separator className="bg-sidebar-border" />

      {/* AI Configuration Form */}
      <VmAutoConfigForm />

      <Separator className="bg-sidebar-border" />

      {/* Manual Configuration Card */}
      <Card className="bg-sidebar border-sidebar-border shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-sidebar-foreground">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            Manual VM Configuration
          </CardTitle>
          <CardDescription className="text-sidebar-foreground/70">
            Fine-tune your VM's resources and operating system.
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
              onChange={(e) => setManualCpu(parseInt(e.target.value) || 1)} 
              min="1"
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
              onChange={(e) => setManualRam(parseInt(e.target.value) || 1)} 
              min="1"
              className="bg-input border-border focus:ring-primary text-sidebar-foreground" 
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="manual-disk" className="flex items-center gap-1 text-sm text-sidebar-foreground/80">
              <HardDrive className="h-4 w-4" /> Disk Size (GB)
            </Label>
            <Input 
              id="manual-disk" 
              type="number" 
              value={manualDisk} 
              onChange={(e) => setManualDisk(parseInt(e.target.value) || 10)} 
              min="10"
              className="bg-input border-border focus:ring-primary text-sidebar-foreground" 
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="manual-os" className="flex items-center gap-1 text-sm text-sidebar-foreground/80">
              <Laptop className="h-4 w-4" /> Operating System
            </Label>
            <Select value={manualOs} onValueChange={setManualOs}>
              <SelectTrigger id="manual-os" className="w-full bg-input border-border focus:ring-primary text-sidebar-foreground">
                <SelectValue placeholder="Select OS" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-popover text-popover-foreground">
                <SelectItem value="linux">Linux (Generic)</SelectItem>
                <SelectItem value="ubuntu">Linux (Ubuntu)</SelectItem>
                <SelectItem value="debian">Linux (Debian)</SelectItem>
                <SelectItem value="centos">Linux (CentOS)</SelectItem>
                <SelectItem value="windows_server">Windows Server</SelectItem>
                <SelectItem value="windows_desktop">Windows Desktop</SelectItem>
                <SelectItem value="macos">macOS</SelectItem>
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

