// HeroSection.js
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ShaderBackground = dynamic(() => import('./ShaderBackground'), {
  ssr: false
});

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    if (!window.gsap) return;
    const tl = window.gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.7 } });
    tl.from('.hero-image', { y: 40, opacity: 0 }, '-=0.3');
    tl.from('.hero-description', { y: 40, opacity: 0 }, '-=0.3');
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image Layer */}
      <div 
        className="fixed inset-0 w-full h-full"
        style={{ 
          zIndex: 0,
          backgroundImage: `url('images/background.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Overlay for better text visibility */}
      <div 
        className="fixed inset-0 w-full h-full"
        style={{ 
          zIndex: 1,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(230,243,255,0.6) 15%, rgba(74,144,226,0.5) 50%, rgba(27,59,111,0.4) 100%)',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 h-screen">
        <div className="absolute inset-0 grid grid-cols-2">
          {/* Left side - empty space for particle text */}
          <div className="col-span-1" />

          {/* Right side: image & text */}
          <div className="col-span-1 relative flex items-center hero-image">
            <div className="w-full relative">
              <img
                src="/api/placeholder/800/1000"
                alt="Profile"
                className="w-full h-[90vh] object-cover brightness-90 contrast-125"
              />
              <div className="absolute bottom-20 right-8 max-w-sm text-right hero-description">
                <span className="inline-block mb-4 text-2xl text-white">↓</span>
                <p className="text-base leading-relaxed text-white">
                  A freelance art director and designer based in the Netherlands...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Particle Text Layer - Topmost Layer */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          zIndex: 20,
          mixBlendMode: 'multiply',
        }}
      >
        {isMounted && <ShaderBackground />}
      </div>
    </div>
  );
}