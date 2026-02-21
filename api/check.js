const SESSIONS = globalThis.__SESSIONS__ || (globalThis.__SESSIONS__ = {});

export default function handler(req, res){
  const { id, device } = req.query;
  if (!id || !device) return res.json({ ok:false });
  const s = SESSIONS[id];
  if (!s || s.device !== device) {
    return res.json({ ok:false, action:"logout" });
  }
  return res.json({ ok:true });
}