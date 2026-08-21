const CONFIG={recipient:"Valonika",fullName:"Valonika Ramadhanti Setianto",sender:"From Someone Who Will Always Love You",birthYear:2010,birthdayMonth:7,birthdayDay:22};
document.querySelectorAll(".name").forEach(x=>x.textContent=CONFIG.recipient);
document.querySelector(".sender").textContent=CONFIG.sender;

const today=new Date();
const currentYear=today.getFullYear();
const birthdayThisYear=new Date(currentYear,CONFIG.birthdayMonth,CONFIG.birthdayDay);
const isBirthday=today.getMonth()===CONFIG.birthdayMonth && today.getDate()===CONFIG.birthdayDay;
const age=isBirthday?currentYear-CONFIG.birthYear:Math.max(0,currentYear-CONFIG.birthYear-((today.getMonth()>CONFIG.birthdayMonth)||(today.getMonth()===CONFIG.birthdayMonth&&today.getDate()>=CONFIG.birthdayDay)?0:1));
const date=`22 / 08 / ${currentYear}`;
document.getElementById("date").textContent=date;
document.getElementById("age").textContent=age>0?age:"∞";

const gate=document.getElementById("gate"),site=document.getElementById("site");
document.getElementById("start").onclick=()=>{gate.style.display="none";site.style.display="block";burst(35);window.scrollTo(0,0)};
document.getElementById("envelope").onclick=()=>document.getElementById("start").click();

const progress=document.getElementById("progress");
addEventListener("scroll",()=>{let h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(scrollY/h*100)+"%"});

document.querySelectorAll(".wish").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".wish").forEach(x=>x.classList.remove("active"));b.classList.add("active");
 const w=document.getElementById("wishText");w.style.opacity=0;
 setTimeout(()=>{w.textContent=b.dataset.text;w.style.opacity=1},120);
});

document.getElementById("secretBtn").onclick=()=>{document.getElementById("secret").classList.add("show");burst(80)};

function spark(x=50,y=70){const s=document.createElement("span");s.className="spark";s.textContent=Math.random()>.3?"✦":"♡";s.style.left=x+"vw";s.style.top=y+"vh";s.style.setProperty("--x",(Math.random()*200-100)+"px");s.style.fontSize=(8+Math.random()*16)+"px";document.getElementById("fx").appendChild(s);setTimeout(()=>s.remove(),4500)}
setInterval(()=>spark(Math.random()*100,100),1100);
function burst(n){for(let i=0;i<n;i++)setTimeout(()=>spark(45+Math.random()*10,55+Math.random()*10),i*12)}

const audio=document.getElementById("audio"),music=document.getElementById("music");
music.onclick=async()=>{try{if(audio.paused){await audio.play();music.classList.add("on");music.textContent="◼"}else{audio.pause();music.classList.remove("on");music.textContent="♫"}}catch(e){alert("Tambahkan file musik sendiri: assets/music.mp3")}};


// Premium responsive polish: reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.animate(
        [{opacity:.16,transform:"translateY(22px)"},{opacity:1,transform:"translateY(0)"}],
        {duration:700,easing:"cubic-bezier(.2,.7,.2,1)",fill:"forwards"}
      );
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".scene:not(.hero)").forEach(el=>revealObserver.observe(el));


const audioPrompt=document.getElementById("audioPrompt");
const playMusicNow=document.getElementById("playMusicNow");
const audioEl=document.getElementById("audio");
const musicBtn=document.getElementById("music");

async function startMusic(){
  try{
    await audioEl.play();
    musicBtn.classList.add("on");
    musicBtn.textContent="◼";
    audioPrompt.classList.remove("show");
    return true;
  }catch(e){
    return false;
  }
}

playMusicNow.addEventListener("click",startMusic);

// Try autoplay immediately. Modern browsers may block audible autoplay.
// If blocked, the first click/tap on the opening screen starts the song.
window.addEventListener("load",async()=>{
  const ok=await startMusic();
  if(!ok) audioPrompt.classList.remove("show");
});

document.getElementById("start").addEventListener("click",async()=>{
  await startMusic();
});
