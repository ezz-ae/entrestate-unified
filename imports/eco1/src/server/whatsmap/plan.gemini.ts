/**
 * Gemini-backed planner (stub).
 * Replace with a real Vertex/Genkit call that returns { flowId, steps[], params }.
 */
type Plan = { flowId: string; steps: string[]; params: Record<string, any> };

export async function planFromTextGemini(text: string, ctx: { uid: string }) : Promise<Plan> {
  const lc = text.toLowerCase();
  if (lc.includes('compare') && lc.includes('pdf')) {
    return { flowId: 'compareProjectsAndPDF', steps: ['searchProjects','analyzeMetrics','generatePDF','deliver'], params: {} };
  }
  if (lc.includes('rebrand') && lc.includes('brochure')) {
    return { flowId: 'rebrandBrochureAndLaunch', steps: ['rebrandBrochure','generateCreatives','campaignPlan','launchMeta'], params: {} };
  }
  return { flowId: 'smartSearch', steps: ['smartSearch'], params: { q: text } };
}
