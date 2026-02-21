export default function handler(req,res){
  const {id,pass}=req.query;
  const LICENSES=[
    {id:"demo10",pass:"demo10",exp:"2026-02-24"},
    {id:"RAKIB",pass:"1",exp:"2026-02-22"},
    {id:"mahabubremon925",pass:"Remon@1200",exp:"2028-03-01"},
    {id:"client1",pass:"client123",exp:"2026-12-31"}
  ];
  const u=LICENSES.find(x=>x.id===id&&x.pass===pass);
  if(!u) return res.json({ok:false,msg:"Invalid"});
  if(new Date()>new Date(u.exp)) return res.json({ok:false,msg:"Expired"});
  res.json({ok:true,expires:u.exp});
}
