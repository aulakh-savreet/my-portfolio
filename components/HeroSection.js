// components/HeroSection.js
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ShaderBackground = dynamic(() => import('./ShaderBackground'), {
  ssr: false
});

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Black Hole Text Layer */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          zIndex: 20,
          mixBlendMode: 'normal',
          pointerEvents: 'auto'
        }}
      >
        {isMounted && <ShaderBackground />}
      </div>

      {/* Studio Info */}
      <div className="absolute bottom-12 left-12 text-neutral-200/80 z-30 space-y-1">
        <p className="text-sm tracking-wider font-light">EST 2015</p>
        <div className="space-y-0.5">
          <p className="text-sm tracking-wider font-light">VISUAL</p>
          <p className="text-sm tracking-wider font-light">EFFECTS STUDIO</p>
        </div>
      </div>
    </div>
  );
}