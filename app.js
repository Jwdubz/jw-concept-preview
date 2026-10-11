(()=>{
const W=[
["rainbow","Rainbow Gardens","Wedding Venue","The vow lands first. Then the gardens, the ballroom and the dance floor play behind it until a couple asks to see their date."],
["stirling","Stirling Club","Wedding And Event Venue","Your Forever Deserves Stirling. The club's own ballroom footage carries every step toward a private tour."],
["rana","Rana Levy","Fine Jewelry And Lapidary","The ring catches your eye. Then the stone shifts in the light, and you have to look again."],
["generations","Generations Kitchen","Hawaiian Restaurant","The food gets the first word. By the time the menu appears, you're already deciding what to order."],
["paina","P\u0101\u2018ina Caf\u00e9","Hawaiian Caf\u00e9","P\u0101\u2018ina means gathering. The story starts in the kitchen, then follows the food until it lands in someone's hands."],
["prorok","Dylan Prorok","Japanese Tattoo Artist","A large tattoo has to feel like it belongs on the body. Up close you see the detail, but across the room the whole piece still reads."],
["heritage","Heritage Tattoo","Tattoo Studio","Made Here. Worn Forever. The shop's seal opens the page and walks you straight to starting your tattoo."],
["truheart","Tru Heart Consulting","Outsourced Sales Team","Real payout checks lead the page, so a brand sees what the team earns before it reads a single pitch."],
["purpleflare","Purple Flare Wraps","Wraps And Fleet Graphics","Built for serious owners and fleet operators. The shop floor plays on film, and a free quote is one tap away."],
["starbase","Starbase Wraps","Tesla Wraps And PPF","A loud, Tesla-only opening that dares you to make yours out of this world, with booking on the very first screen."],
["wrapstar","Wrapstar","Wraps, Ceramic Coating And Tint","The shop's own footage runs under Protect, Enhance, Redefine, with the quote button in reach the whole way down."]];
const $=s=>document.querySelector(s), root=document.documentElement;
let paused=false;
// smooth scroll (always on)
const lenis=new Lenis({lerp:.09,wheelMultiplier:1,smoothWheel:true});
function raf(t){lenis.raf(t);requestAnimationFrame(raf)}requestAnimationFrame(raf);
addEventListener('load',()=>root.classList.add('loaded'));setTimeout(()=>root.classList.add('loaded'),1200);
// hero payoff: last word lands 0.25s after payoff cut (8.75s), then stays
const hv=$('#heroV'),po=$('#payoff');const PAY=9.0;
function pay(){if(!po.classList.contains('on')&&(hv.currentTime>=PAY||paused))po.classList.add('on')}
hv.addEventListener('timeupdate',pay);(function tick(){pay();if(!po.classList.contains('on'))requestAnimationFrame(tick)})();
hv.play&&hv.play().catch(()=>{});
// words
const big=$('.words');
(function split(n){[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(p=>{if(!p)return;if(/^\s+$/.test(p))f.append(p);else{const s=document.createElement('span');s.className='wd';s.textContent=p;f.append(s)}});c.replaceWith(f)}else if(c.nodeType===1)split(c)})})(big);
const wds=[...big.querySelectorAll('.wd')];
// work
const list=$('#list'),scr=$('#screen'),steps=$('#steps');const vids=[];
const mob=document.createElement('p');mob.className='mob-name';$('.screen').insertBefore(mob,$('.cap'));
W.forEach((w,i)=>{const li=document.createElement('li');li.innerHTML=`<span class="n">${String(i+1).padStart(2,'0')}</span>${w[1]}`;li.onclick=()=>{const s=steps.children[i];lenis.scrollTo(s,{offset:2,duration:1.4})};list.append(li);
const v=document.createElement('video');v.muted=true;v.loop=true;v.playsInline=true;v.setAttribute('playsinline','');v.preload=i<2?'auto':'none';v.poster=`film/w-${w[0]}.jpg`;v.src=`film/w-${w[0]}.mp4`;scr.append(v);vids.push(v);
steps.append(document.createElement('div'))});
let cur=-1;
function setW(i){if(i===cur)return;const prev=cur;cur=i;[...list.children].forEach((l,j)=>l.classList.toggle('on',j===i));
vids.forEach((v,j)=>{v.classList.remove('was');if(j===prev)v.classList.add('was');v.classList.toggle('on',j===i)});
const v=vids[i];v.preload='auto';v.currentTime=0;if(!paused)v.play().catch(()=>{});
setTimeout(()=>{vids.forEach((x,j)=>{if(j!==cur){x.pause();x.classList.remove('was')}})},1150);
if(vids[i+1])vids[i+1].preload='auto';
const w=W[i];$('#capK').textContent=w[2];$('#capT').textContent=w[3];mob.textContent=w[1];const a=$('#capA');a.href=`https://${w[0]}.jarrettwroten.com/`;a.setAttribute('aria-label',`Open The ${w[1]} Concept`)}
setW(0);
const reveals=[...document.querySelectorAll('.r')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -10% 0px'});reveals.forEach(r=>io.observe(r));
const me=$('.me-p');new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&me.classList.add('in'))).observe(me);
// lazy end film + offscreen pause
const endV=$('.end-v');let endOn=false;
new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){if(!endOn){endV.querySelector('source').src=endV.querySelector('source').dataset.src;endV.load();endOn=true}if(!paused)endV.play().catch(()=>{})}else endV.pause()}),{rootMargin:'200px'}).observe(endV);
new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){if(!paused)hv.play().catch(()=>{})}else hv.pause()})).observe(hv);
// counter
const num=$('#num');let counted=false;
function count(){if(counted)return;counted=true;const to=40114.81,t0=performance.now(),D=2200;(function f(t){const p=Math.min(1,(t-t0)/D),e=1-Math.pow(1-p,4);num.textContent='$'+(to*e).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});if(p<1&&!paused)requestAnimationFrame(f);else num.textContent='$40,114.81'})(t0)}
new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&count()),{threshold:.6}).observe(num);
// scroll driver
function onScroll(){const vh=innerHeight;
 const b=big.getBoundingClientRect();const p=Math.min(1,Math.max(0,(vh*.85-b.top)/(b.height+vh*.35)));const n=Math.round(p*wds.length);wds.forEach((w,i)=>w.classList.toggle('lit',i<n));
 const s=steps.getBoundingClientRect();const k=Math.floor((-s.top+vh*.0)/(steps.children[0].offsetHeight));setW(Math.max(0,Math.min(W.length-1,k)));
 if(scrollY+vh>=document.documentElement.scrollHeight-40){root.classList.add('done');wds.forEach(w=>w.classList.add('lit'))}}
lenis.on('scroll',onScroll);addEventListener('scroll',onScroll,{passive:true});onScroll();
// fail-safe reveals
setInterval(()=>{reveals.forEach(r=>{if(r.getBoundingClientRect().top<innerHeight)r.classList.add('in')})},800);
// pause
const pp=$('#pp');pp.onclick=()=>{paused=!paused;pp.setAttribute('aria-pressed',paused);pp.querySelector('.pp-t').textContent=paused?'Play':'Pause';root.classList.toggle('paused',paused);
 const all=[hv,endV,vids[cur]];if(paused){all.forEach(v=>v.pause());po.classList.add('on');wds.forEach(w=>w.classList.add('lit'));reveals.forEach(r=>r.classList.add('in'));num.textContent='$40,114.81'}else all.forEach(v=>v.play().catch(()=>{}))};
// back to top: eased in-out ~1.8s
$('#top').onclick=()=>lenis.scrollTo(0,{duration:1.8,easing:t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2});
})();
