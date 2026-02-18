const log = document.getElementById("log");
const grid = document.getElementById("grid");
const ctx = grid.getContext("2d");
let paused=false, stopped=false, sent=0, failed=0;

function resize(){ grid.width=innerWidth; grid.height=innerHeight; }
resize(); addEventListener("resize", resize);

// subtle animated grid (unique hacker feel)
let t=0;
setInterval(()=>{
  ctx.clearRect(0,0,grid.width,grid.height);
  ctx.strokeStyle="rgba(0,255,128,.15)";
  ctx.lineWidth=1;
  const step=40;
  for(let x=0;x<grid.width;x+=step){
    ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,grid.height); ctx.stroke();
  }
  for(let y=0;y<grid.height;y+=step){
    ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(grid.width,y); ctx.stroke();
  }
  t++;
},120);

function fmt(d){return d.toISOString().split('T')[0];}
function updateDates(){
  const today=new Date();
  const exp=new Date(localStorage.getItem("exp"));
  const days=Math.max(0, Math.ceil((exp-today)/86400000));
  todayEl.textContent="Today: "+fmt(today);
  expiryEl.textContent="Expiry: "+fmt(exp);
  remainEl.textContent="Remaining: "+days+" days";
}
const todayEl=document.getElementById("today");
const expiryEl=document.getElementById("expiry");
const remainEl=document.getElementById("remain");
updateDates(); setInterval(updateDates,60000);

logoutBtn.onclick=()=>{ localStorage.clear(); location.href="login.html"; };
pauseBtn.onclick=()=>{ paused=true; };
stopBtn.onclick=()=>{ stopped=true; paused=false; };
clearBtn.onclick=()=>{ log.textContent=""; sent=failed=0; upd(); };

function upd(){
  document.getElementById("sent").textContent=sent;
  document.getElementById("failed").textContent=failed;
  document.getElementById("total").textContent=sent+failed;
}

startBtn.onclick = async ()=>{
  stopped=false; paused=false;
  const n=number.value.trim();
  const h=parseInt(hits.value,10);
  const intervalSec=Math.max(0.5, parseFloat(interval.value||"1"));
  if(!n||!h){ line("Enter number & hits"); return; }
  for(let i=1;i<=h;i++){
    if(stopped) break;
    while(paused) await sleep(300);
    line(`[#${i}] dispatch`);
    try{
      await fetch(`/api/hit?number=${encodeURIComponent(n)}`);
      sent++; line("✓ sent");
    }catch{
      failed++; line("✗ failed");
    }
    upd();
    await sleep(intervalSec*1000);
  }
};

function line(t){
  const d=document.createElement("div");
  d.textContent=t;
  log.appendChild(d);
  log.scrollTop=99999;
}
const sleep = ms => new Promise(r=>setTimeout(r,ms));