import React from 'react';
import PixelBackground from './PixelBackground';
import dynamic from 'next/dynamic';

const ShaderBackground = dynamic(() => import('./ShaderBackground'), {
  ssr: false
});

export default function HeroSection() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background with purple gradient */}
      <div className="hero-element absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black" />

      {/* Pixel Background */}
      <div className="hero-element">
        <PixelBackground />
      </div>

      {/* Black Hole Effect Layer */}
      <div 
        className="hero-element absolute inset-0"
        style={{ 
          zIndex: 20,
          pointerEvents: 'auto'
        }}
      >
        <ShaderBackground />
      </div>

      {/* Content Layer */}
      <div className="hero-element absolute inset-0 z-10 flex flex-col items-center">
        <div className="mt-[60vh] text-center">
          <p 
            className="text-xl text-white/80 mb-8"
            style={{ 
              fontFamily: 'Space Grotesk',
              letterSpacing: '0.1em',
              fontWeight: 300
            }}
          >
            Crafting digital experiences through code and creativity
          </p>
          
          <div 
            className="flex flex-col items-center gap-4 text-neutral-400"
            style={{ 
              fontFamily: 'Space Grotesk',
              letterSpacing: '0.2em',
              fontWeight: 300
            }}
          >
            <div className="flex items-center gap-3">
              <span className="w-1 h-1 rounded-full bg-indigo-500/50" />
              <span>FRONTEND DEVELOPER</span>
              <span className="w-1 h-1 rounded-full bg-indigo-500/50" />
            </div>
            <div className="flex items-center gap-3">
              <span className="w-1 h-1 rounded-full bg-indigo-500/50" />
              <span>UI/UX DESIGNER</span>
              <span className="w-1 h-1 rounded-full bg-indigo-500/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-element absolute bottom-12 left-1/2 -translate-x-1/2 z-30">
        <span 
          className="block text-white/40 text-sm text-center mb-4"
          style={{ 
            fontFamily: 'Space Grotesk',
            letterSpacing: '0.3em',
            fontWeight: 300
          }}
        >
          SCROLL
        </span>
        <div className="w-px h-16 mx-auto bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </div>
  );
}