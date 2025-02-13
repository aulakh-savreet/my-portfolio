import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectReveal() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLeftHalf, setIsLeftHalf] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  // Check for mobile once on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
      
      // If on mobile, disable any GSAP ScrollTrigger animations
      if (isMobileDevice && window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    }
  }, []);

  const projects = [
    {
      id: 'travel-explorer',
      name: 'Travel Explorer',
      description: 'Travel Information APP',
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'REST Countries API', 'OpenWeather API', 'SWR', 'Vercel'],
      image: '/images/travel-explorer/hero.webp'
    },
    {
      id: 'task-buddy',
      name: 'Task Buddy',
      description: 'Productivity APP',
      technologies: ['Figma', 'Auto-layout', 'Components', 'Variants', 'Design Tokens', 'Prototyping'],
      image: '/images/task-buddy/hero.webp'
    },
    {
      id: 'village-rentals',
      name: 'VIllage Rentals',
      description: 'Equipment rental System',
      technologies: ['Python', 'MySQL', 'Figma', 'OOP', 'Tkinter', 'SQL'],
      image: '/images/village-rentals/hero.webp'
    },
    {
      id: 'Odyssey-detaling',
      name: 'Odyssey Detaling',
      description: 'Car detaling website',
      technologies: ['Coming soon'],
      image: '/images/comingsoon.webp'
    },
    {
      id: '',
      name: 'DaVinci',
      description: 'Library Management System',
      technologies: ['C#', '.NET MAUI', 'Blazor'],
      image: '/images/comingsoon.webp'
    },
    {
      id: '',
      name: 'Flight-Booking',
      description: 'Flight Boooking System',
      technologies: ['C#', '.NET MAUI', 'Blazor', 'HTML', 'CSS'],
      image: '/images/FlightBooking.webp'
    },
  ];

  // Desktop-only mouse logic
  useEffect(() => {
    if (!containerRef.current || isMobile) return;

    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const isInBounds = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      setShowCursor(isInBounds);

      if (isInBounds) {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsLeftHalf(x < rect.width / 2);
      } else {
        setIsLeftHalf(false);
      }
    };

    const handleMouseLeave = () => {
      setShowCursor(false);
      setIsLeftHalf(false);
    };

    const current = containerRef.current;
    current.addEventListener('mousemove', handleMouseMove);
    current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      current.removeEventListener('mousemove', handleMouseMove);
      current.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  const containerStyle = {
    backgroundColor: isMobile
      ? '#4C1D95'
      : isLeftHalf
        ? '#4C1D95'
        : '#000000',
    transition: 'background-color 0.3s ease'
  };

  const handleProjectClick = (project) => {
    if (project.name === 'DaVinci') {
      window.open('https://github.com/aulakh-savreet/DaVinci', '_blank');
    } else if (project.name === 'Flight-Booking') {
      window.open('https://github.com/aulakh-savreet/Flight-Booking', '_blank');
    } else if (project.id) {
      sessionStorage.setItem('projectScroll', window.scrollY);
      router.push(`/projects/${project.id}`);
    }
  };

  return (
    <>
      {/* Desktop custom cursor */}
      {!isMobile && showCursor && (
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
      )}

      {/* Main container */}
      <section
        ref={containerRef}
        className="relative w-full text-white"
        style={containerStyle}
      >
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
          <h2 className="text-2xl mb-6 uppercase tracking-wider">Projects</h2>

          {/* Projects List */}
          <div className={isMobile ? "space-y-16" : "space-y-24"}>
            {projects.map((project) => (
              <div key={project.name}>
                {/* Mobile Preview Window */}
                {isMobile && (
                  <div className="w-full h-64 mb-8 overflow-hidden shadow-2xl rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                )}

                {/* Project Content */}
                <div
                  className="project-item relative group"
                  style={{ cursor: isMobile ? 'pointer' : 'none' }}
                  onMouseEnter={() => !isMobile && setActiveProject(project)}
                  onMouseLeave={() => !isMobile && setActiveProject(null)}
                  onClick={() => handleProjectClick(project)}
                >
                  {/* Project Name */}
                  <h3 className="text-5xl md:text-6xl font-light mb-4 text-white tracking-tight">
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xl text-white/60 mb-6">
                    {project.description}
                  </p>

                  {/* Technologies - Always visible on mobile */}
                  <div className={`flex flex-wrap gap-3 mt-4 ${isMobile ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'} transition-all duration-300`}>
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-[#F5E6C4] text-black rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Preview Window */}
        {!isMobile && (
          <div
            className="fixed bottom-8 right-8 w-[360px] h-[240px] overflow-hidden shadow-2xl rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm"
            style={{
              opacity: activeProject ? 1 : 0,
              transform: activeProject ? 'scale(1)' : 'scale(0.8)',
              pointerEvents: 'none',
              transition: 'all 0.3s ease',
              zIndex: 40
            }}
          >
            {activeProject && (
              <img
                src={activeProject.image}
                alt={activeProject.name}
                className="w-full h-full object-cover object-center"
              />
            )}
          </div>
        )}
      </section>
    </>
  );
}
