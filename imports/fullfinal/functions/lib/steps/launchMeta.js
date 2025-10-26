'use strict';
const bizSdk = require('facebook-nodejs-business-sdk');
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;
export async function launchMeta(campaignName) {
    let access_token = process.env.META_TOKEN;
    let ad_account_id = process.env.META_AD_ACCOUNT_ID;
    const api = bizSdk.FacebookAdsApi.init(access_token);
    const showDebugingInfo = true;
    if (showDebugingInfo) {
        api.setDebug(true);
    }
    let fields, params;
    try {
        fields = [];
        params = {
            'name': campaignName,
            'objective': 'OUTCOME_TRAFFIC',
            'status': 'PAUSED',
            'special_ad_categories': [],
        };
        const campaign = await (new AdAccount(ad_account_id)).createCampaign(fields, params);
        return campaign.id;
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to launch Meta campaign.");
    }
}
