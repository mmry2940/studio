"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import VmAutoConfigForm from './vm-auto-config-form';
import { Play, StopCircle, Settings2, MonitorSmartphone, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function VmControls() {
  const [vmStatus, setVmStatus] = useState<'stopped' | 'running' | 'pending'>('stopped');
  const { toast } = useToast();

  const handleStartVm = () => {
    setVmStatus('pending');
    toast({ title: 'Starting VM...', description: 'Please wait while the virtual machine boots up.' });
    // Simulate VM start
    setTimeout(() => {
      setVmStatus('running');
      toast({ title: 'VM Started', description: 'The virtual machine is now running.', variant: 'default' });
    }, 2000);
  };

  const handleStopVm = () => {
    setVmStatus('pending');
    toast({ title: 'Stopping VM...', description: 'Please wait while the virtual machine shuts down.' });
    // Simulate VM stop
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
    // Placeholder for actual resize logic
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

      <div className="flex-grow"> {/* This div will take remaining space if VmAutoConfigForm is shorter */}
        <VmAutoConfigForm />
      </div>
    </div>
  );
}
