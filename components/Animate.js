// components/Animate.js
import { useEffect, useRef } from 'react';

export default function Animate({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) {
      console.error('GSAP or ScrollTrigger not loaded');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // For each .project-overlay, animate from below as user scrolls
    gsap.utils.toArray('.project-overlay').forEach((overlay) => {
      gsap.fromTo(
        overlay,
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: overlay,
            start: 'top 80%',   // Adjust as desired
            end: 'center center',
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {children}
    </div>
  );
}
