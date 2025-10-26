import fetch from 'node-fetch';

export async function launchMeta(params: any) {
  const token = process.env.META_TOKEN
  const adAccountId = process.env.META_AD_ACCOUNT_ID
  if (!token || !adAccountId) {
    throw new Error('META_TOKEN and META_AD_ACCOUNT_ID are required env vars')
  }

  // 1) Create Campaign (paused by default)
  const campaignRes = await fetch(`https://graph.facebook.com/v20.0/act_${adAccountId}/campaigns`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: params.name || 'Entrestate Auto Campaign',
      objective: 'LEAD_GENERATION',
      status: 'PAUSED',
      special_ad_categories: []
    })
  })
  const campaign = await campaignRes.json()
  if (!campaignRes.ok) throw new Error('Create campaign failed: ' + JSON.stringify(campaign))

  // 2) Create Ad Set (basic; you will extend targeting/budget/schedule)
  const adsetRes = await fetch(`https://graph.facebook.com/v20.0/act_${adAccountId}/adsets`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: params.adsetName || 'Entrestate Leads AdSet',
      campaign_id: campaign.id,
      daily_budget: String(params.budgetCents ?? 1000), // in cents
      billing_event: 'IMPRESSIONS',
      optimization_goal: 'LEAD_GENERATION',
      promoted_object: params.promoted_object || undefined,
      targeting: params.targeting || { geo_locations: { countries: ['AE'] } },
      start_time: params.start_time || undefined,
      end_time: params.end_time || undefined,
      status: 'PAUSED'
    })
  })
  const adset = await adsetRes.json()
  if (!adsetRes.ok) throw new Error('Create adset failed: ' + JSON.stringify(adset))

  // 3) (Optional) Create Ad Creative & Ad here… (skipped for now)
  return { campaign, adset }
}
