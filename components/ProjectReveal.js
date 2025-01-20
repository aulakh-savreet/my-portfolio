import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectReveal() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLeftHalf, setIsLeftHalf] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const router = useRouter();

  const projects = [
    {
      id: 'project1',
      name: 'Travel Explorer',
      description: 'Dpt.',
      technologies: ['Vue.js', 'NuxtJS', 'PixiJS', 'Akufen'],
      image: '/api/placeholder/600/400'
    },
    {
      id: 'project2',
      name: 'Task Buddy',
      description: 'Interactive historical experience',
      technologies: ['React', 'Three.js', 'GSAP'],
      image: '/api/placeholder/600/400'
    },
    {
      id: 'Village Rentals',
      name: 'Vie Noire',
      description: 'Digital art platform',
      technologies: ['Next.js', 'WebGL', 'Framer Motion'],
      image: '/api/placeholder/600/400'
    }
  ];

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger || !containerRef.current) return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Kill any existing ScrollTriggers before creating new ones
    ScrollTrigger.getAll().forEach(st => st.kill());

    // Set initial state
    gsap.set(containerRef.current, { 
      backgroundColor: '#000000',
      y: '100vh'
    });

    gsap.set('.project-item', { 
      opacity: 0,
      y: 50
    });

    // Create scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'main',
        start: 'top top',
        end: '+=200%',
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress > 0) {
            gsap.to('.hero-element', {
              y: -100 * progress,
              opacity: 1 - progress * 2,
              duration: 0.1
            });
          }
        }
      }
    });

    // Animate projects section in
    tl.to(containerRef.current, {
      y: 0,
      duration: 1,
      ease: 'power2.inOut'
    })
    .to('.project-item', {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.5');

    // Handle mouse movement for background color
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsLeftHalf(x < rect.width / 2);
      
      gsap.to(containerRef.current, {
        backgroundColor: x < rect.width / 2 ? '#4C1D95' : '#000000',
        duration: 0.3
      });
    };

    const currentContainer = containerRef.current;
    currentContainer.addEventListener('mousemove', handleMouseMove);

    // Cleanup function
    return () => {
      // Remove event listener
      currentContainer.removeEventListener('mousemove', handleMouseMove);
      
      // Kill all ScrollTriggers
      ScrollTrigger.getAll().forEach(st => st.kill());
      
      // Kill all GSAP animations
      gsap.killTweensOf(['.project-item', '.hero-element', currentContainer]);
      
      // Reset styles
      gsap.set(['.project-item', '.hero-element', currentContainer], { clearProps: 'all' });
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div 
        className="fixed pointer-events-none z-50 transition-transform duration-100"
        style={{ 
          left: mousePosition.x,
          top: mousePosition.y,
          transform: `translate(-50%, -50%) scale(${isLeftHalf ? 1 : 0})`,
          willChange: 'transform'
        }}
      >
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#F5E6C4' }}
        >
          <ArrowUpRight className="w-4 h-4 text-black" />
        </div>
      </div>

      {/* Main Container */}
      <div 
        ref={containerRef} 
        className="fixed top-0 left-0 w-full h-screen bg-black cursor-none"
        style={{ zIndex: 30 }}
      >
        <div className="relative h-screen">
          {/* Scrollable Projects Container */}
          <div className="absolute inset-0 overflow-y-auto">
            <div className="py-20 px-12 mb-32">
              <h2 className="text-2xl mb-16 uppercase tracking-wider">Projets</h2>
              
              <div className="flex">
                <div className="w-full max-w-5xl">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="project-item relative mb-24 group cursor-none"
                      onMouseEnter={() => setActiveProject(project)}
                      onMouseLeave={() => setActiveProject(null)}
                      onClick={() => router.push(`/projects/${project.id}`)}
                    >
                      <div className="relative flex items-center">
                        <div className="flex-shrink-0">
                          <h3 className="text-6xl font-light mb-4 text-white tracking-tight">
                            {project.name}
                          </h3>
                          <p className="text-xl text-white/60">{project.description}</p>
                        </div>

                        {isLeftHalf && (
                          <div 
                            className="flex gap-3 ml-8 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                          >
                            {project.technologies.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 text-sm bg-[#F5E6C4] text-black rounded-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Preview Window */}
          <div 
            className="preview-window fixed bottom-8 right-8 w-96 h-64 rounded-3xl overflow-hidden shadow-2xl"
            style={{
              opacity: activeProject ? 1 : 0,
              transform: `scale(${activeProject ? 1 : 0.8})`,
              zIndex: 40,
              pointerEvents: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            {activeProject && (
              <img
                src={activeProject.image}
                alt={activeProject.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}