
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { suggestVmSettings } from '@/app/actions';
import type { SuggestVmSettingsOutput } from '@/ai/flows/suggest-vm-settings';
import { Loader2, Lightbulb, Server, Cpu, MemoryStick } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  applications: z.string().min(3, { message: "Please list at least one application." }),
});

type FormData = z.infer<typeof FormSchema>;

interface VmSuggestion extends SuggestVmSettingsOutput {}

export default function VmAutoConfigForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<VmSuggestion | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      applications: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setSuggestion(null);
    setError(null);
    toast({
      title: "Analyzing Applications...",
      description: "AI is crafting the optimal VM configuration.",
    });

    const result = await suggestVmSettings(data);

    setIsLoading(false);
    if ('error' in result) {
      setError(result.error);
      toast({
        title: "Configuration Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      setSuggestion(result);
      toast({
        title: "Configuration Ready!",
        description: "VM settings have been suggested.",
      });
    }
  };

  return (
    <Card className="w-full shadow-md bg-sidebar border-sidebar-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sidebar-foreground">
          <Lightbulb className="h-6 w-6 text-primary" />
          <span>AI VM Configurator</span>
        </CardTitle>
        <CardDescription className="text-sidebar-foreground/70">
          Describe the applications you plan to run, and our AI will suggest optimal VM settings.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="applications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="applications" className="text-sm font-medium text-sidebar-foreground/80">
                    Applications (comma-separated)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="applications"
                      placeholder="e.g., Web Server, Database, Development IDE, Minecraft Server"
                      className="min-h-[80px] bg-input border-border focus:ring-primary text-sidebar-foreground"
                      {...field}
                      aria-describedby="applications-help"
                    />
                  </FormControl>
                  <p id="applications-help" className="text-xs text-muted-foreground"> {/* text-muted-foreground is standard for help text */}
                    The more specific you are, the better the suggestion.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Suggesting...
                </>
              ) : (
                <>
                  <Server className="mr-2 h-4 w-4" />
                  Suggest Settings
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>

      {error && (
        <div className="p-4 m-4 border border-destructive/50 bg-destructive/10 rounded-md text-destructive">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {suggestion && !error && (
        <div className="p-4 m-4 border border-accent/50 bg-accent/10 rounded-md text-accent-foreground">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-accent">
            <Lightbulb className="h-5 w-5" /> {/* Icon inherits text-accent from h3 */}
            Suggested Configuration:
          </h3>
          <div className="space-y-2 text-sm"> {/* Children inherit text-accent-foreground from parent div */}
            <p className="flex items-center gap-2"><Cpu className="h-4 w-4 opacity-70" /> CPU Cores: <span className="font-medium">{suggestion.cpu}</span></p>
            <p className="flex items-center gap-2"><MemoryStick className="h-4 w-4 opacity-70" /> RAM: <span className="font-medium">{suggestion.ram} GB</span></p>
            {suggestion.notes && (
              <div>
                <p className="font-medium mt-2 opacity-80">Notes:</p>
                <p className="opacity-90 whitespace-pre-wrap">{suggestion.notes}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
