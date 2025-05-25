
'use server';

import { suggestContainerSettings as suggestContainerSettingsFlow, type SuggestContainerSettingsInput, type SuggestContainerSettingsOutput } from '@/ai/flows/suggest-container-settings'; // Renamed flow and types

export async function suggestContainerSettings(input: SuggestContainerSettingsInput): Promise<SuggestContainerSettingsOutput | { error: string }> { // Renamed function and types
  try {
    const result = await suggestContainerSettingsFlow(input);
    return result;
  } catch (error) {
    console.error("Error in suggestContainerSettings action:", error);
    if (error instanceof Error) {
        return { error: `An error occurred while suggesting container settings: ${error.message}`};
    }
    return { error: 'An unexpected error occurred while suggesting container settings.' };
  }
}
