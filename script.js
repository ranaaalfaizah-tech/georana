gsap.registerPlugin(ScrollTrigger);
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!reduce){
 gsap.from(".hero-copy>*",{opacity:0,y:35,stagger:.12,duration:.8,ease:"power3.out"});
 gsap.from(".portrait",{opacity:0,scale:.88,rotate:-3,duration:1.1,ease:"expo.out",delay:.2});
 gsap.utils.toArray(".section,.experience,.tools,.contact").forEach(sec=>{
   gsap.utils.toArray(".label,.about h2,.about-text,.edu-card,.timeline article,.tool-grid span,.contact h2,.contact p,.contact-links").forEach(el=>{
     if(sec.contains(el)) gsap.to(el,{opacity:1,y:0,duration:.75,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%",once:true}});
   });
 });
 const track=document.querySelector(".track");
 const distance=()=>Math.max(0,track.scrollWidth-innerWidth);
 gsap.to(track,{x:()=>-distance(),ease:"none",scrollTrigger:{trigger:".projects",start:"top top",end:()=>"+="+(distance()+innerHeight*.85),pin:true,scrub:1,invalidateOnRefresh:true,anticipatePin:1}});
}
const portrait=document.querySelector(".portrait");
if(!reduce&&portrait){portrait.addEventListener("mousemove",e=>{const r=portrait.getBoundingClientRect(),x=e.clientX/r.width-(r.left/r.width)-.5,y=e.clientY/r.height-(r.top/r.height)-.5;gsap.to(portrait,{rotationY:x*5,rotationX:-y*5,duration:.4})});portrait.addEventListener("mouseleave",()=>gsap.to(portrait,{rotationY:0,rotationX:0,duration:.5}))}
window.addEventListener("resize",()=>ScrollTrigger.refresh());
