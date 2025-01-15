// pages/projects/[id].js
import { useRouter } from 'next/router';
import React, { useRef, useEffect } from 'react';
import { Globe, ArrowUpRight, Sparkles } from 'lucide-react';

const projectsData = [
  {
    id: 'travel-explorers',
    title: 'TravelExplorer',
    subtitle: 'Comprehensive Travel Platform — January 2024',
    description: 'A comprehensive travel and country information platform',
    imageSrc: '/images/project1.webp',
    details: 'Explore detailed information about countries worldwide...',
    navColor: '#ff0055'
  },
  {
    id: 'project2',
    title: 'Project 2',
    description: 'Revolutionizing user experiences through motion and interaction.',
    imageSrc: '/api/placeholder/500/600',
    navColor: '#6366f1',
  },
  {
    id: 'project3',
    title: 'Project 3',
    description: 'Exploring the future of digital experiences and interactions.',
    imageSrc: '/api/placeholder/500/600',
    navColor: '#ec4899',
  }
];

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const containerRef = useRef(null);
  const contentRef = useRef(null);
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

  const project = projectsData.find(p => p.id === id);

  useEffect(() => {
    if (!project || !window.gsap) return;
    
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

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      gsap.killTweensOf([containerRef.current, contentRef.current, bgRef.current, '.nav-item']);
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#161C24] text-white">
        <div className="text-center">
          <h1 className="text-4xl">Project Not Found</h1>
          <button
            onClick={() => router.push('/')}
            className="mt-8 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        ref={bgRef}
        className="fixed inset-0 w-full h-full"
        style={{ 
          background: 'linear-gradient(180deg, rgba(22, 28, 36, 1) 0%, rgba(10, 12, 16, 1) 100%)',
          zIndex: 10, 
          pointerEvents: 'none'
        }}
      />

      <div
        ref={containerRef}
        className="relative min-h-screen w-full text-white"
        style={{ zIndex: 11 }}
      >
        {/* Back button */}
        <div className="p-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 px-4 py-2 bg-[#1A2942]/20 rounded-lg text-gray-400 hover:text-white transition-colors duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="text-sm font-light">Back</span>
          </button>
        </div>

        <div 
          ref={contentRef} 
          className="max-w-[1400px] mx-auto px-16 pb-24"
        >
          <div className="flex gap-24">
            {/* Main content */}
            <div className="flex-1">
              <div className="mb-16">
                <h1
                  className="text-7xl font-medium mb-4 tracking-tight"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.2))'
                  }}
                >
                  {project.title}
                </h1>
                <div className="text-gray-400">
                  {project.subtitle}
                </div>
              </div>

              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-16">
                <div className="bg-[#1A2332]/90 backdrop-blur-xl px-4 py-2.5 flex items-center gap-3 border-b border-indigo-500/20">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></div>
                  </div>
                  
                  <div className="flex-1 flex items-center justify-center">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A0F1B]/50 border border-indigo-500/20">
                      <Globe size={12} className="text-indigo-400" />
                      <span className="text-xs text-indigo-300">project.demo.app</span>
                    </div>
                  </div>
                </div>
                <img
                  src={project.imageSrc}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-lg prose-invert max-w-none">
                <h2 id="overview">Overview</h2>
                <p>{project.description}</p>
                <p>{project.details}</p>

                {navigationItems.slice(1).map(section => (
                  <React.Fragment key={section}>
                    <h2 id={section.toLowerCase().replace(' ', '-')}>{section}</h2>
                    <p>Example {section.toLowerCase()} content...</p>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Navigation sidebar */}
            <div className="w-48 flex-shrink-0">
              <div className="sticky top-16">
                <h3 className="text-xs uppercase font-light text-gray-400 mb-8">
                  CONTENTS
                </h3>
                <nav className="space-y-4">
                  {navigationItems.map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase().replace(' ', '-')}`}
                      className="nav-item block text-[13px] text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}