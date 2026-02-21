const SESSIONS = globalThis.__SESSIONS__ || (globalThis.__SESSIONS__ = {});

export default function handler(req, res) {
  const { id, pass, device } = req.query;
  if (!id || !pass || !device) {
    return res.status(400).json({ ok:false, msg:"missing params" });
  }

  // Licenses with DATE + TIME and Client Name
  const LICENSES = [
    { id:"demo10", pass:"demo10", name:"FOR EVERYONE", exp:"2026-03-01 23:59:59" },
    { id:"0", pass:"0", name:"ABDULLAH 😈", exp:"2026-03-01 23:59:59" },
    { id:"", pass:"", name:"", exp:"2026-03-01 23:59:59" },
    { id:"", pass:"", name:"", exp:"2026-03-01 23:59:59" },
    { id:"", pass:"", name:"", exp:"2026-03-01 23:59:59" },
    { id:"", pass:"", name:"", exp:"2026-03-01 23:59:59" },
    { id:"", pass:"", name:"", exp:"2026-03-01 23:59:59" },
    { id:"", pass:"", name:"", exp:"2026-03-01 23:59:59" },
    { id:"", pass:"", name:"", exp:"2026-03-01 23:59:59" },
    { id:"client1", pass:"client123", name:"Client One", exp:"2026-12-31 23:59:59" }
  ];

  const user = LICENSES.find(u => u.id===id && u.pass===pass);
  if (!user) return res.json({ ok:false, msg:"Invalid credentials" });

  const expTime = new Date(user.exp.replace(" ", "T"));
  if (Date.now() > expTime.getTime()) {
    return res.json({ ok:false, msg:"License expired" });
  }

  const now = Date.now();
  const s = SESSIONS[id];

  // Active block
  if (s && s.blockUntil && now < s.blockUntil) {
    const left = Math.ceil((s.blockUntil - now)/60000);
    return res.json({ ok:false, msg:`Blocked for ${left} min` });
  }

  // Same device relogin allowed
  if (s && s.device === device) {
    s.last = now;
    return res.json({ ok:true, expires:user.exp, name:user.name, note:"same-device" });
  }

  // New device too fast -> block 10 min
  if (s && s.device && s.device !== device) {
    if (now - s.last < 10*60*1000) {
      SESSIONS[id] = { blockUntil: now + 10*60*1000 };
      return res.json({ ok:false, msg:"Another device detected. Blocked 10 min." });
    }
  }

  // Accept login; invalidate old by overwrite
  SESSIONS[id] = { device, last: now };
  return res.json({ ok:true, expires:user.exp, name:user.name, note:"new-device" });
}
