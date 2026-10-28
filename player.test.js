const {test}=require('node:test');const assert=require('node:assert/strict');const {lookup}=require('./lib/player');
test('reject invalid UID before network',async()=>assert.equal((await lookup('x')).status,400));
test('preserve Unicode nickname',async()=>{const r=await lookup('9578818632','BD',async()=>({ok:true,json:async()=>({basicInfo:{accountId:'9578818632',nickname:'亗 Player ✓',region:'BD'}})}));assert.equal(r.body.name,'亗 Player ✓');});
test('reject mismatched account',async()=>assert.equal((await lookup('9578818632','BD',async()=>({ok:true,json:async()=>({basicInfo:{accountId:'123456',nickname:'Wrong'}})}))).status,503));
test('upstream failure never invents player',async()=>assert.equal((await lookup('9578818632','BD',async()=>{throw Error('offline')})).status,503));
