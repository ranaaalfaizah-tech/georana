gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Cursor
if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  window.addEventListener('mousemove', e => {
    gsap.to(dot,{x:e.clientX,y:e.clientY,duration:.08,ease:'none'});
    gsap.to(ring,{x:e.clientX,y:e.clientY,duration:.25,ease:'power2.out'});
  });
  document.querySelectorAll('a,.project-slide,.experience-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>gsap.to(ring,{width:55,height:55,duration:.2}));
    el.addEventListener('mouseleave',()=>gsap.to(ring,{width:32,height:32,duration:.2}));
  });
}

// Smooth hero entrance
if (!reduceMotion) {
  gsap.from('.hero-content .eyebrow',{opacity:0,y:20,duration:.7,delay:.15});
  gsap.from('.hero-content h1 span',{opacity:0,x:-80,duration:1,ease:'power4.out',delay:.25});
  gsap.from('.hero-content h1 em',{opacity:0,x:90,duration:1.1,ease:'power4.out',delay:.35});
  gsap.from('.hero-lead,.hero-actions',{opacity:0,y:30,duration:.8,stagger:.1,delay:.65});
  gsap.from('.hero-image',{scale:1.18,duration:1.8,ease:'power3.out'});

  // Hero image continuously reacts to scroll
  gsap.to('.hero-image',{yPercent:12,scale:1.02,ease:'none',scrollTrigger:{trigger:'.hero-story',start:'top top',end:'bottom top',scrub:1}});

  // Story panels: image parallax + content movement
  document.querySelectorAll('.story-panel').forEach(panel=>{
    const img=panel.querySelector('.panel-art img');
    const copy=panel.querySelector('.panel-copy');
    gsap.fromTo(img,{scale:1.18,y:80,rotate:-2},{scale:1,y:0,rotate:2,ease:'none',scrollTrigger:{trigger:panel,start:'top bottom',end:'bottom top',scrub:1.1}});
    gsap.fromTo(copy,{y:80,opacity:.15},{y:0,opacity:1,ease:'none',scrollTrigger:{trigger:panel,start:'top 75%',end:'center 45%',scrub:.7}});
  });

  // Experience cards stagger upward
  gsap.utils.toArray('.experience-card').forEach((card,i)=>{
    gsap.to(card,{y:0,opacity:1,duration:.9,delay:i*.08,ease:'power3.out',scrollTrigger:{trigger:card,start:'top 88%',once:true}});
  });

  // Horizontal carousel driven by vertical scrolling
  const track=document.querySelector('.project-track');
  const pin=document.querySelector('.project-pin');
  const slides=gsap.utils.toArray('.project-slide');
  function horizontalDistance(){return Math.max(0,track.scrollWidth-window.innerWidth);}
  gsap.to(track,{x:()=>-horizontalDistance(),ease:'none',scrollTrigger:{trigger:pin,start:'top top',end:()=>'+='+Math.max(1600,horizontalDistance()*1.25),scrub:1.15,pin:true,anticipatePin:1,invalidateOnRefresh:true}});

  // Each slide has its own depth/zoom effect based on its position in viewport
  slides.forEach(slide=>{
    const img=slide.querySelector('img');
    gsap.fromTo(img,{scale:1.15},{scale:1,ease:'none',scrollTrigger:{trigger:slide,start:'left 100%',end:'left 10%',containerAnimation:undefined,scrub:1}});
  });

  // Full deck parallax
  document.querySelectorAll('.pdf-card img').forEach(img=>{
    gsap.fromTo(img,{yPercent:-7,scale:1.05},{yPercent:7,scale:1,ease:'none',scrollTrigger:{trigger:img.closest('.pdf-card'),start:'top bottom',end:'bottom top',scrub:1.2}});
  });

  // Contact background moves with scroll
  gsap.to('.contact-bg img',{yPercent:8,ease:'none',scrollTrigger:{trigger:'.contact-section',start:'top bottom',end:'bottom top',scrub:1.2}});

  // Section headings reveal
  document.querySelectorAll('.section-heading h2,.project-intro h2').forEach(title=>{
    gsap.from(title,{y:70,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:title,start:'top 85%',once:true}});
  });
}

// Refresh after images load
window.addEventListener('load',()=>ScrollTrigger.refresh());
window.addEventListener('resize',()=>ScrollTrigger.refresh());
