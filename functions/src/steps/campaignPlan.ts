export async function campaignPlan(params: any) {
  // TODO: build adsets/ads skeleton, estimate reach/cost
  return { plan: { objective: 'LEADS', budget: params.budget ?? 100 } };
}
