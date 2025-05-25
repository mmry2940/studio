'use server';

import { suggestVmSettings as suggestVmSettingsFlow, type SuggestVmSettingsInput, type SuggestVmSettingsOutput } from '@/ai/flows/suggest-vm-settings';

export async function suggestVmSettings(input: SuggestVmSettingsInput): Promise<SuggestVmSettingsOutput | { error: string }> {
  try {
    const result = await suggestVmSettingsFlow(input);
    return result;
  } catch (error) {
    console.error("Error in suggestVmSettings action:", error);
    // It's good practice to not expose raw error messages to the client
    // For debugging, you might log the specific error server-side
    // For the client, return a generic error message
    if (error instanceof Error) {
        return { error: `An error occurred while suggesting VM settings: ${error.message}`};
    }
    return { error: 'An unexpected error occurred while suggesting VM settings.' };
  }
}
