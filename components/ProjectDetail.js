import React, { useEffect, useRef } from 'react';

export default function ProjectDetail({ project, onClose, isOpen }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const bgRef = useRef(null);

  const navigationItems = [
    'Overview',
    'Highlights',
    'Context',
    'The Problem',
    'Update Flow',
    'Layout',
    'Interactions',
    'Visual Design',
    'Final Designs',
    'Retrospective'
  ];

  useEffect(() => {
    if (!window.gsap || !isOpen) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    
    ScrollTrigger.getAll().forEach(st => st.kill());

    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }

    document.body.style.overflow = 'hidden';

    gsap.set([containerRef.current, bgRef.current], { 
      visibility: 'visible',
      opacity: 0,
      pointerEvents: 'none'
    });
    
    gsap.set(contentRef.current, { 
      y: 50,
      opacity: 0 
    });
    
    gsap.set('.nav-item', {
      x: 20,
      opacity: 0
    });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(containerRef.current, { pointerEvents: 'auto' });
      }
    });

    tl.to([containerRef.current, bgRef.current], {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    })
    .to(contentRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3')
    .to('.nav-item', {
      x: 0,
      opacity: 1,
      stagger: 0.03,
      duration: 0.4,
      ease: 'power2.out'
    }, '-=0.3');

    ScrollTrigger.create({
      trigger: contentRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(bgRef.current, {
          background: `linear-gradient(180deg, #0A192F ${100 - progress * 100}%, #000000 100%)`,
          duration: 0.1,
          overwrite: true
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      gsap.killTweensOf([containerRef.current, contentRef.current, bgRef.current, '.nav-item']);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    const gsap = window.gsap;
    window.history.replaceState(null, '', window.location.pathname);
    window.scrollTo(0, 0);
    gsap.set(containerRef.current, { pointerEvents: 'none' });
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onClose();
      },
    });

    tl.to('.nav-item', {
      x: -20,
      opacity: 0,
      stagger: 0.02,
      duration: 0.3,
      ease: 'power2.in'
    })
    .to(contentRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in'
    }, '-=0.2')
    .to([containerRef.current, bgRef.current], {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in'
    }, '-=0.3');
  };

  if (!project) {
    return null;
  }

  return (
    <>
      <div
        ref={bgRef}
        style={{
          visibility: isOpen ? 'visible' : 'hidden',
          pointerEvents: isOpen ? 'auto' : 'none',
          zIndex: 9998,
          background: '#0A192F'
        }}
        className="fixed inset-0 w-full h-full"
      />
      
      <div
        ref={containerRef}
        style={{
          visibility: isOpen ? 'visible' : 'hidden',
          pointerEvents: isOpen ? 'auto' : 'none',
          zIndex: 9999
        }}
        className="fixed inset-0 w-full h-full"
      >
        <button
          onClick={handleClose}
          className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 bg-[#1A2942]/80 rounded-lg text-[#4A5568] hover:text-white transition-colors duration-300"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="text-sm font-light">Back</span>
        </button>

        <div ref={contentRef} className="w-full h-full overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-16 py-24">
            <div className="flex gap-24">
              <div className="w-48 flex-shrink-0">
                <div className="fixed">
                  <h3 className="tracking-widest text-xs uppercase font-light text-[#4A5568] mb-8">
                    CONTENTS
                  </h3>
                  <nav className="space-y-3">
                    {navigationItems.map((item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase().replace(' ', '-')}`}
                        className="nav-item block text-[13px] text-[#4A5568] hover:text-white transition-colors duration-300"
                      >
                        {item}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>

              <div className="flex-1">
                <div className="mb-16">
                  <h1 
                    ref={titleRef}
                    className="text-7xl font-bold mb-4 tracking-tight text-white"
                    style={{
                      background: 'linear-gradient(to bottom, #fff, rgba(255,255,255,0.7))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.3))'
                    }}
                  >
                    {project.title}
                  </h1>
                  <div className="text-[#4A5568]">
                    Personal Project — January 2024
                  </div>
                </div>

                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-16 bg-[#1A2942]">
                  <img
                    src={project.imageSrc}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="prose prose-lg prose-invert max-w-none">
                  {/* ... rest of your content ... */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}