// components/ProjectReveal.js
import { useRef, useEffect } from 'react';

export default function ProjectReveal({ hero, projects }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) {
      console.error('GSAP or ScrollTrigger not found.');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const overlays = containerRef.current.querySelectorAll('.project-overlay');

    // Create a timeline that pins the entire container
    // so the hero stays behind everything while we scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${projects.length * 100}%`, 
        pin: true,
        scrub: true,
        // markers: true, // debug markers if needed
      },
    });

    // For each overlay, animate from bottom to covering the hero
    overlays.forEach((overlay, i) => {
      // Each overlay gets ~1 "screen" worth of scrolling
      // so total scroll distance is (# overlays * 100%).
      tl.fromTo(
        overlay,
        { y: '100%' },
        { y: '0%', duration: 1 },
        i // place each overlay’s animation at time index = i
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
      style={{ height: `${(projects.length + 1) * 100}vh` }}
    >
      {/* HERO (z-index 1) */}
      <div className="absolute w-full h-screen top-0 left-0 z-10">
        {hero /* This is your <HeroSection /> component */}
      </div>

      {/* PROJECT OVERLAYS (z-index 20) */}
      {projects.map((project, i) => (
        <div
          key={project.id}
          className="project-overlay absolute w-full h-screen z-20"
          style={{
            top: 0,
          }}
        >
          {/* Example layout: two columns or whatever you like */}
          <div className="h-full flex items-center justify-between p-16 bg-white">
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
        </div>
      ))}
    </div>
  );
}
