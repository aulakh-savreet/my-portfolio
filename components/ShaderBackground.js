// ShaderBackground.js
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const BlackHoleText = dynamic(() => import('./BlackHoleText'), {
  ssr: false
});

export default function ShaderBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;
  
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <BlackHoleText />
    </div>
  );
}