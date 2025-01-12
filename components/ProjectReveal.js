// ProjectReveal.js
import { useRef, useEffect } from 'react';

export default function ProjectReveal({ hero, projects }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    const overlays = containerRef.current.querySelectorAll('.project-overlay');
    const contents = containerRef.current.querySelectorAll('.content-wrapper');
    const viewMoreBtns = containerRef.current.querySelectorAll('.view-more-wrapper');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${projects.length * 200}%`,
        pin: true,
        scrub: 1,
      },
      ease: 'power2.inOut',
    });

    overlays.forEach((overlay, i) => {
      // Container grows and slides up
      tl.fromTo(
        overlay,
        { 
          y: '100%',
          scale: 0.8 
        },
        { 
          y: '0%',
          scale: 1,
          duration: 1 
        },
        i
      );

      // Content moves opposite
      tl.fromTo(
        contents[i],
        { y: '-50%' },
        { y: '0%', duration: 1 },
        i
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [projects]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ 
        height: `${(projects.length + 1) * 100}vh`,
        zIndex: 1,
        pointerEvents: 'none'
      }}
    >
      {/* The Hero behind everything */}
      <div className="absolute w-full h-screen top-0 left-0 overflow-hidden">
        {hero}
      </div>

      {/* Overlays in front of hero */}
      {projects.map((project) => (
        <div
          key={project.id}
          className="project-overlay absolute w-full h-screen"
          style={{ 
            top: 0,
            pointerEvents: 'auto' 
          }}
        >
          <div className="h-full bg-white">
            {/* Content wrapper - will move opposite to container */}
            <div className="content-wrapper h-full flex items-center justify-between p-16">
              <div className="flex-1">
                <h2 className="text-6xl font-black mb-4">{project.title}</h2>
                <p className="max-w-md text-lg">{project.description}</p>
              </div>
              <div className="flex-1 flex justify-end">
                <img
                  src={project.imageSrc}
                  alt={project.title}
                  className="w-2/3 object-cover"
                />
              </div>
            </div>

            {/* View More text */}
            <div className="view-more-wrapper absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-end">
              <button className="text-lg uppercase tracking-wider hover:opacity-75 transition-opacity">
                <span className="block">View</span>
                <span className="block">More</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}