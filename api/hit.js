export default async function handler(req,res){
  const {number}=req.query;
  if(!number) return res.status(400).json({error:"number required"});
  await new Promise(r=>setTimeout(r,120));
  res.json({ok:true});
}