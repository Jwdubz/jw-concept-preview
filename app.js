(()=>{
const W=[
["rainbow","Rainbow Gardens","Wedding Venue"],["stirling","Stirling Club","Wedding And Event Venue"],["rana","Rana Levy","Fine Jewelry And Lapidary"],["generations","Generations Kitchen","Hawaiian Restaurant"],["paina","P\u0101\u2018ina Caf\u00e9","Hawaiian Caf\u00e9"],["prorok","Dylan Prorok","Japanese Tattoo Artist"],["heritage","Heritage Tattoo","Tattoo Studio"],["truheart","Tru Heart Consulting","Outsourced Sales Team"],["purpleflare","Purple Flare Wraps","Wraps And Fleet Graphics"],["starbase","Starbase Wraps","Tesla Wraps And PPF"],["wrapstar","Wrapstar","Wraps, Ceramic Coating And Tint"]];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],root=document.documentElement;
let paused=false;
const lenis=new Lenis({lerp:.1,smoothWheel:true});
(function raf(t){lenis.raf(t);requestAnimationFrame(raf)})();
lenis.stop();scrollTo(0,0);
// intro: counter 0-100, then curtain up
const intro=$('#intro'),iN=$('#introN'),iB=$('#introBar'),hv=$('#heroV');
hv.play&&hv.play().catch(()=>{});
requestAnimationFrame(()=>intro.classList.add('go'));
const t0=performance.now(),DUR=1500;
(function tick(t){const p=Math.min(1,(t-t0)/DUR),e=1-Math.pow(1-p,3);iN.textContent=Math.round(e*100);iB.style.width=(e*100)+'%';
 if(p<1)requestAnimationFrame(tick);else setTimeout(()=>{intro.classList.add('out');root.classList.add('ready');try{hv.currentTime=0;hv.play()}catch(_){}lenis.start();setTimeout(()=>intro.remove(),1200)},180)})(t0);
// payoff word lands 0.25s after payoff cut (5.5s), then stays
const po=$('#payoff'),PAY=5.75;
function pay(){if(!po.classList.contains('on')&&root.classList.contains('ready')&&(hv.currentTime>=PAY||paused))po.classList.add('on')}
hv.addEventListener('timeupdate',pay);
// words
const big=$('.words');
(function split(n){[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(p=>{if(!p)return;if(/^\s+$/.test(p))f.append(p);else{const s=document.createElement('span');s.className='wd';s.textContent=p;f.append(s)}});c.replaceWith(f)}else if(c.nodeType===1)split(c)})})(big);
const wds=[...big.querySelectorAll('.wd')];
// horizontal track
const track=$('#track'),work=$('.work'),wCount=$('#wCount'),wProg=$('#wProg');const cards=[];
W.forEach((w,i)=>{const a=document.createElement('a');a.className='pc';a.href=`https://${w[0]}.jarrettwroten.com/`;a.target='_blank';a.rel='noopener';a.setAttribute('aria-label',`Open The ${w[1]} Concept`);
a.innerHTML=`<div class="pc-f"><video muted loop playsinline preload="${i<3?'auto':'none'}" poster="film/w-${w[0]}.jpg" src="film/w-${w[0]}.mp4"></video></div><div class="pc-i"><span class="pc-n">${String(i+1).padStart(2,'0')}</span><span class="pc-h">${w[1]}<span class="pc-c">${w[2]}</span></span><span class="pc-o">Open The Concept</span></div>`;
track.append(a);cards.push(a)});
let cur=-1;
function setCur(i){if(i===cur)return;cur=i;cards.forEach((c,j)=>{c.classList.toggle('on',j===i);const v=c.querySelector('video');if(Math.abs(j-i)<=1){v.preload='auto';if(!paused)v.play().catch(()=>{})}else v.pause()});wCount.textContent=String(i+1).padStart(2,'0');const wn=$('#wName');const old=wn.querySelector('.cur');if(old){old.classList.remove('cur');old.classList.add('gone');setTimeout(()=>old.remove(),1000)}const sp=document.createElement('span');sp.className='nm';sp.innerHTML=W[i][1].replace(/(\S+)$/,'<em>$1</em>');wn.append(sp);requestAnimationFrame(()=>requestAnimationFrame(()=>sp.classList.add('cur')))}
// reveals
const obs=$$('.fade,.mask,.me-p');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -12% 0px'});obs.forEach(o=>io.observe(o));
// lazy videos
const lz=$$('video[data-src]');
const lio=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){if(!v.src)v.src=v.dataset.src;if(!paused)v.play().catch(()=>{})}else v.pause()}),{rootMargin:'300px'});lz.forEach(v=>lio.observe(v));
new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){if(!paused)hv.play().catch(()=>{})}else hv.pause()})).observe(hv);
// counter
const num=$('#num');let counted=false;
function count(){if(counted)return;counted=true;const to=40114.81,s=performance.now(),D=2400;(function f(t){const p=Math.min(1,(t-s)/D),e=1-Math.pow(1-p,4);num.textContent='$'+(to*e).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});if(p<1&&!paused)requestAnimationFrame(f);else num.textContent='$40,114.81'})(s)}
new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&count()),{threshold:.5}).observe(num);
// stacked cards + end film + header
const stackCards=$$('.card'),endW=$('.end-v-w'),bar=$('#bar');let last=0;
function onScroll(){const vh=innerHeight,y=scrollY;
 const b=big.getBoundingClientRect();const p=Math.min(1,Math.max(0,(vh*.85-b.top)/(b.height+vh*.3)));const n=Math.round(p*wds.length);wds.forEach((w,i)=>w.classList.toggle('lit',i<n||paused));
 const r=work.getBoundingClientRect(),span=r.height-vh;const q=Math.min(1,Math.max(0,-r.top/span));
 const max=track.scrollWidth-innerWidth;track.style.transform=`translate3d(${-q*max}px,0,0)`;wProg.style.width=(q*100)+'%';
 const center=innerWidth/2;let best=0,bd=1e9;cards.forEach((c,j)=>{const cr=c.getBoundingClientRect();const d=Math.abs(cr.left+cr.width/2-center);if(d<bd){bd=d;best=j}});if(r.top<vh&&r.bottom>0)setCur(best);
 if(innerWidth>860)stackCards.forEach((c,i)=>{const nx=stackCards[i+1];if(!nx){c.style.transform='';return}const nr=nx.getBoundingClientRect(),cr=c.getBoundingClientRect();const k=Math.min(1,Math.max(0,(cr.bottom-nr.top)/cr.height));c.style.transform=`scale(${1-k*.06})`;c.style.filter=`brightness(${1-k*.35})`});
 const er=endW.getBoundingClientRect();const ep=Math.min(1,Math.max(0,(vh-er.top)/(vh*.9)));const ins=18*(1-ep);endW.style.clipPath=`inset(0 ${ins}% 0 ${ins}% round 8px)`;
 bar.classList.toggle('solid',y>vh*.85);if(y>vh*.85&&y>last+2)bar.classList.add('hide');if(y<last-2||y<vh*.85)bar.classList.remove('hide');last=y;
 if(y+vh>=document.documentElement.scrollHeight-40){root.classList.add('done');obs.forEach(o=>o.classList.add('in'))}}
lenis.on('scroll',onScroll);addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);onScroll();setCur(0);
setInterval(()=>obs.forEach(o=>{if(o.getBoundingClientRect().top<innerHeight)o.classList.add('in')}),900);
// pause
const pp=$('#pp');pp.onclick=()=>{paused=!paused;pp.setAttribute('aria-pressed',paused);pp.querySelector('.pp-t').textContent=paused?'Play':'Pause';root.classList.toggle('paused',paused);
 const vs=$$('video');if(paused){vs.forEach(v=>v.pause());po.classList.add('on');wds.forEach(w=>w.classList.add('lit'));obs.forEach(o=>o.classList.add('in'));num.textContent='$40,114.81'}else{hv.play().catch(()=>{});const c=cards[cur];c&&c.querySelector('video').play().catch(()=>{});lz.forEach(v=>{if(v.src&&v.getBoundingClientRect().top<innerHeight&&v.getBoundingClientRect().bottom>0)v.play().catch(()=>{})})}};
$('#top').onclick=()=>lenis.scrollTo(0,{duration:1.8,easing:t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2});
})();
