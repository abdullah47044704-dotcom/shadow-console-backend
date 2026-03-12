export default function handler(req,res){
  const {id,pass}=req.query;

  const LICENSES=[
    {id:"blueanzo حكر",pass:"463910",exp:"2027-03-01",status:"active"},
    {id:"1",pass:"1",exp:"2027-03-26",status:"offline"},
    {id:"fahim",pass:"056810",exp:"2027-03-26",status:"offline"},
    {id:"client1",pass:"client123",exp:"2026-12-31",status:"active"}
  ];

  const u=LICENSES.find(x=>x.id===id&&x.pass===pass);

  if(!u) return res.json({ok:false,msg:"Invalid Login"});

  if(u.status!=="active"){
    return res.json({ok:false,msg:"Account Disabled By Admin"});
  }

  if(new Date()>new Date(u.exp)){
    return res.json({ok:false,msg:"License Expired"});
  }

  res.json({
    ok:true,
    exp:u.exp
  });

}
