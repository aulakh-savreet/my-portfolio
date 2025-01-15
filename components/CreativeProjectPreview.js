// components/ProjectReveal.js
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import CreativeProjectPreview from './CreativeProjectPreview';

export default function ProjectReveal({ hero, onColorChange }) {
  const containerRef = useRef(null);
  const router = useRouter();

  const projects = [
    {
      id: 'travel-explorers',
      title: 'TravelExplorer',
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
    },
  ];

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    // Clean up any existing ScrollTriggers to prevent memory leaks
    ScrollTrigger.getAll().forEach(t => t.kill());

    const overlays = gsap.utils.toArray('.project-overlay');
    const contents = gsap.utils.toArray('.content-wrapper');

    // Set initial states
    gsap.set(overlays, {
      yPercent: 100,
      opacity: 0,
      scale: 0.8
    });

    gsap.set(contents, {
      opacity: 0,
      y: 50
    });

    // Main scroll-triggered timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${projects.length * 100}vh`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(Math.floor(progress * projects.length), projects.length - 1);
          if (onColorChange && projects[index]) {
            onColorChange('#000000');
          }
        }
      }
    });

    // Add animations for each project
    overlays.forEach((overlay, i) => {
      const content = contents[i];
      const nextOverlay = overlays[i + 1];

      tl
        // Animate current project in
        .to(overlay, {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out'
        }, i)
        .to(content, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        }, i + 0.2)
        
        // If there's a next project, animate current one out
        .to(overlay, {
          yPercent: -30,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: 'power2.in'
        }, i + 0.8);
    });

    // Add simple hover effect
    overlays.forEach((overlay) => {
      overlay.addEventListener('mouseenter', () => {
        gsap.to(overlay, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      overlay.addEventListener('mouseleave', () => {
        gsap.to(overlay, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [projects, onColorChange]);

  const handleViewMore = (project) => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ 
        height: `${(projects.length + 1) * 100}vh`,
        zIndex: 30
      }}
    >
      {/* Hero Section */}
      <div 
        className="absolute w-full h-screen top-0 left-0 overflow-hidden" 
        style={{ zIndex: 31 }}
      >
        {hero}
      </div>

      {/* Project Overlays */}
      <div style={{ position: 'relative', zIndex: 32 }}>
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-overlay absolute w-full h-screen overflow-hidden"
            style={{ top: 0 }}
          >
            <div className="h-full bg-[#020617]">
              <div className="content-wrapper h-full flex items-center justify-center p-16">
                <div className="max-w-6xl w-full transform-gpu">
                  <CreativeProjectPreview 
                    mainImage={project.imageSrc}
                    onClick={() => handleViewMore(project)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}