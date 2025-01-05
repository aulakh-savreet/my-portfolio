'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const sections = gsap.utils.toArray('.snapSection');
    sections.forEach((section, idx) => {
      gsap.fromTo(section, 
        { opacity: 0 }, 
        {
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            pin: true,
            pinSpacing: false,
            onEnter: () => {
              gsap.to('body', {
                backgroundColor: idx % 2 === 0 ? '#ff6bcb' : '#6bafff',
                duration: 1,
              });
            },
          },
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen w-full overflow-auto scroll-smooth snap-y snap-mandatory">
      {/* Fixed navigation at top */}
      <nav className="fixed top-0 left-0 w-full z-10 bg-black/50 text-white flex justify-between items-center px-6 py-4">
        <span className="text-xl font-semibold">My Portfolio</span>
        <button className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition">
          Contact
        </button>
      </nav>

      {/* Section 1 */}
      <section className="snapSection snap-start w-full h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl mb-6">Project One</h1>
          <button className="border px-4 py-2 rounded">View More</button>
        </div>
      </section>

      {/* Section 2 */}
      <section className="snapSection snap-start w-full h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl mb-6">Project Two</h1>
          <button className="border px-4 py-2 rounded">View More</button>
        </div>
      </section>

      {/* Section 3 */}
      <section className="snapSection snap-start w-full h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl mb-6">Project Three</h1>
          <button className="border px-4 py-2 rounded">View More</button>
        </div>
      </section>
    </div>
  );
}