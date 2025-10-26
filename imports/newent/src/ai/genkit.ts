
'use server';

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { enableFirebaseTelemetry } from '@genkit-ai/firebase';
import { getAdminApp } from '@/lib/firebaseAdmin';

// (Optional) enable Genkit → Firebase telemetry
enableFirebaseTelemetry();

export const ai = genkit({
  plugins: [
    // The googleAI plugin uses Gemini models by default.
    googleAI({
      apiVersion: 'v1',
    }),
  ],
});
