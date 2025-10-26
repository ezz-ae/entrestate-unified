export async function analyzeMetrics(input: any) {
  // TODO: compute comparisons (priceFrom, handover, unit mix)
  return { summary: 'Comparison summary (stub)', inputSampleCount: Array.isArray(input) ? input.length : 1 };
}
