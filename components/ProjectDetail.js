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
    
    // Kill any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    // Reset scroll position
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }

    // Prevent background scrolling when detail is open
    document.body.style.overflow = 'hidden';

    // Initial states
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

    // Create main animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(containerRef.current, { pointerEvents: 'auto' });
      }
    });

    // Animate in sequence
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

    // Setup scroll-triggered background gradient
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

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      gsap.killTweensOf([containerRef.current, contentRef.current, bgRef.current, '.nav-item']);
      document.body.style.overflow = ''; // Reset overflow
    };
  }, [isOpen]);

  const handleClose = () => {
    const gsap = window.gsap;
    
    gsap.set(containerRef.current, { pointerEvents: 'none' });
    
    const tl = gsap.timeline({
      onComplete: onClose
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

  if (!project) return null;

  return (
    <>
      {/* Background gradient layer */}
      <div
        ref={bgRef}
        className="fixed inset-0 w-full h-full"
        style={{ 
          visibility: 'hidden',
          background: '#0A192F',
          zIndex: 9998, 
          pointerEvents: 'auto'
        }}
      />
      
      {/* Main container */}
      <div
        ref={containerRef}
        className="fixed inset-0 w-full h-full"
        style={{ 
          visibility: 'hidden',
          zIndex: 9999,
          pointerEvents: 'auto'
        }}
      >
        {/* Back button */}
        <button
          onClick={handleClose}
          className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 bg-[#1A2942]/80 rounded-lg text-[#4A5568] hover:text-white transition-colors duration-300"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="text-sm font-light">Back</span>
        </button>

        {/* Main content */}
        <div ref={contentRef} className="w-full h-full overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-16 py-24">
            {/* Content grid */}
            <div className="flex gap-24">
              {/* Navigation sidebar */}
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

              {/* Main content area */}
              <div className="flex-1">
                {/* Title section */}
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

                {/* Project preview */}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-16 bg-[#1A2942]">
                  <img
                    src={project.imageSrc}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Project content */}
                <div className="prose prose-lg prose-invert max-w-none">
                  <h2 id="overview">Overview</h2>
                  <p>{project.description}</p>
                  <p>{project.details}</p>

                  <h2 id="highlights">Highlights</h2>
                  <p>Example highlights content …</p>

                  <h2 id="context">Context</h2>
                  <p>Example context content …</p>

                  <h2 id="the-problem">The Problem</h2>
                  <p>Example problem content …</p>

                  <h2 id="update-flow">Update Flow</h2>
                  <p>Example update flow content …</p>

                  <h2 id="layout">Layout</h2>
                  <p>Example layout content …</p>

                  <h2 id="interactions">Interactions</h2>
                  <p>Example interactions content …</p>

                  <h2 id="visual-design">Visual Design</h2>
                  <p>Example visual design content …</p>

                  <h2 id="final-designs">Final Designs</h2>
                  <p>Example final designs content …</p>

                  <h2 id="retrospective">Retrospective</h2>
                  <p>Example retrospective content …</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
