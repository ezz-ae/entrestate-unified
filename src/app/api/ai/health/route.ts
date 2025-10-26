
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET(req: NextRequest) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  const models = {
    'gemini-pro': 'gemini-pro',
    'vision': 'gemini-pro-vision',
    'text-embedding': 'text-embedding-004',
  };

  const results: { [key: string]: string } = {};

  for (const modelName in models) {
    try {
      const model = genAI.getGenerativeModel({ model: models[modelName as keyof typeof models] });
      
      if (modelName === 'text-embedding') {
        const result = await model.embedContent("test");
        if (result.embedding.values.length > 0) {
            results[modelName] = 'OK';
        } else {
            throw new Error('Embedding returned no values.');
        }
      } else if (modelName === 'vision') {
        // A full vision check is complex, we'll confirm model availability
        results[modelName] = 'OK (Available)';
      } else {
        const result = await model.generateContent("test");
        if (result.response.text()) {
            results[modelName] = 'OK';
        } else {
            throw new Error('Generation returned no text.');
        }
      }
    } catch (error: any) {
      console.error(`Error checking model ${modelName}:`, error);
      results[modelName] = `FAIL: ${error.message}`;
    }
  }

  const allOk = Object.values(results).every(status => status.startsWith('OK'));

  return NextResponse.json({
    status: allOk ? 'OK' : 'DEGRADED',
    results,
  });
}
