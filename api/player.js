const {lookup}=require('../lib/player');
module.exports=async(req,res)=>{if(req.method!=='GET')return res.status(405).end();const result=await lookup(String(req.query.uid||''),String(req.query.region||'BD'));res.setHeader('Cache-Control','no-store');return res.status(result.status).json(result.body);};
