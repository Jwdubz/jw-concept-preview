(()=>{const s=document.getElementById('flow');if(!s)return;const root=document.documentElement;
const f=document.getElementById('flowF'),vs=[...f.querySelectorAll('video')],lis=[...document.querySelectorAll('#flowB li')],ix=document.getElementById('flowIx'),rb=document.getElementById('flowR'),labs=[...document.querySelectorAll('.flow-r span')],R=['i','ii','iii','iv'];
let cur=0,near=false,last=-1;
const paused=()=>root.classList.contains('paused');
function ld(v){if(!v.src)v.src=v.dataset.fs}
function play(){vs.forEach((v,j)=>{if(near&&j===cur&&!paused()){ld(v);v.play().catch(()=>{})}else v.pause()});if(near&&vs[cur+1])vs[cur+1].preload='metadata'}
function set(i){if(i===cur)return;const p=cur;cur=i;
 vs.forEach((v,j)=>{v.classList.toggle('on',j===i);v.classList.toggle('was',j===p)});ld(vs[i]);
 lis.forEach((l,j)=>{l.classList.toggle('on',j===i);l.classList.toggle('off',j<i)});
 labs.forEach((l,j)=>l.classList.toggle('on',j<=i));
 ix.classList.add('sw');requestAnimationFrame(()=>{ix.textContent=R[i];requestAnimationFrame(()=>ix.classList.remove('sw'))});play()}
new IntersectionObserver(es=>{near=es[0].isIntersecting;play()},{rootMargin:'200px 0px'}).observe(s);
new IntersectionObserver(es=>{if(es[0].isIntersecting)s.querySelector('.flow-h').classList.add('in')},{rootMargin:'0px 0px -20% 0px'}).observe(s);
labs[0].classList.add('on');
function tick(){const r=s.getBoundingClientRect(),vh=innerHeight;if(r.top<vh&&r.bottom>0){const q=Math.min(1,Math.max(0,-r.top/(r.height-vh)));if(q!==last){last=q;
 const i=Math.min(3,Math.floor(q*4*1.0001));set(i);rb.parentNode.style.setProperty('--fp',q.toFixed(4));
 const g=Math.min(1,Math.max(0,(vh-r.top)/vh));/* film opens as the section arrives */
 const e=1-Math.pow(1-g,3);f.style.setProperty('--fi',(14*(1-e)).toFixed(2));f.style.setProperty('--fr',(4+14*(1-e)).toFixed(1))}}
 requestAnimationFrame(tick)}
tick();
document.getElementById('pp')&&document.getElementById('pp').addEventListener('click',()=>setTimeout(play,0));
})();
