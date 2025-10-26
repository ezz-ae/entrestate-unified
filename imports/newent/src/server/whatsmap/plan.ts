/**
 * WhatsMAP Planner
 * Given user text, return a strict plan: flowId, steps[], params.
 * Replace the simple rules below with a Gemini call constrained by a schema.
 */
export async function planFromText(text: string, ctx: { uid: string; source?: 'web'|'wa' }) {
  const t = text.toLowerCase()
  if (t.includes('compare') && t.includes('pdf')) {
    // naive parse; replace with NER on project names
    return {
      flowId: 'compareProjectsAndPDF',
      steps: ['searchProjects','analyzeMetrics','generatePDF','deliver'],
      params: { projectA: '', projectB: '' }
    }
  }
  if (t.includes('rebrand') && (t.includes('brochure') || t.includes('pdf'))) {
    return {
      flowId: 'rebrandBrochureAndLaunch',
      steps: ['rebrandBrochure','generateCreatives','campaignPlan','launchMeta'],
      params: {}
    }
  }
  return {
    flowId: 'smartSearch',
    steps: ['smartSearch'],
    params: { q: text }
  }
}
