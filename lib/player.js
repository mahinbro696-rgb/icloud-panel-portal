'use strict';
async function lookup(uid, region='BD', fetcher=fetch) {
 if (!/^\d{5,15}$/.test(uid)) return {status:400,body:{error:'Enter a valid 5–15 digit player UID.'}};
 if (!['BD','IND','SG','BR','ID','TH','VN','TW','US','ME','PK','RU'].includes(region)) return {status:400,body:{error:'Select a supported region.'}};
 const keyed=!!process.env.FF_API_KEY;
 const url=keyed?new URL('https://developers.freefirecommunity.com/api/v1/info'):new URL('https://api2.nftoken.info/get');
 url.searchParams.set('uid',uid);url.searchParams.set('region',keyed?region.toLowerCase():region);
 try {
 const response=await fetcher(url,{headers:{'User-Agent':'PanelPortal/1.0',...(keyed?{'x-api-key':process.env.FF_API_KEY}:{})},signal:AbortSignal.timeout(12000)});
 if(!response.ok) throw new Error('Upstream unavailable');
 const data=await response.json(); const profile=data.basicInfo||data.AccountInfo;
 const name=profile?.nickname||profile?.AccountName;
 const returnedId=profile?.accountId||profile?.AccountId;
 if(returnedId && String(returnedId)!==uid) throw new Error('Mismatched player');
 if(typeof name!=='string'||!name.trim()) return {status:404,body:{error:'Player not found on this region. Check the UID and region.'}};
 return {status:200,body:{uid,name,region:profile.region||profile.AccountRegion||region,level:profile.level||profile.AccountLevel||null}};
 } catch {return {status:503,body:{error:'Player service is unavailable. Please try again later.'}};}
}
module.exports={lookup};
