import { searchProjects } from './steps/searchProjects.js';
import { analyzeMetrics } from './steps/analyzeMetrics.js';
import { generatePDF } from './steps/generatePDF.js';
import { deliver } from './steps/deliver.js';
import { rebrandBrochure } from './steps/rebrandBrochure.js';
import { generateCreatives } from './steps/generateCreatives.js';
import { campaignPlan } from './steps/campaignPlan.js';
import { launchMeta } from './steps/launchMeta.js';
import { smartSearch } from './steps/smartSearch.js';
import type { JobStepName } from './types.js';

export async function runStep(name: JobStepName, ctx: any, input: any) {
  switch (name) {
    case 'searchProjects': return searchProjects(ctx.plan.params);
    case 'analyzeMetrics': return analyzeMetrics(input);
    case 'generatePDF': return generatePDF(input);
    case 'deliver': return deliver({ source: ctx.source, uid: ctx.uid }, input);
    case 'rebrandBrochure': return rebrandBrochure(ctx.plan.params);
    case 'generateCreatives': return generateCreatives(ctx.plan.params);
    case 'campaignPlan': return campaignPlan(ctx.plan.params);
    case 'launchMeta': return launchMeta(ctx.plan.params);
    case 'smartSearch': return smartSearch(ctx.plan.params);
    default: throw new Error(`Unknown step: ${name}`);
  }
}
