import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const CustomCursor = ({ isLeftHalf }) => {
  // Do not render on mobile devices
  const isMobile = typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) return null;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const updateCursor = (e) => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const isPassedHero = scrollY >= windowHeight;
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(isPassedHero);
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsVisible(scrollY >= windowHeight);
    });
    
    return () => {
      window.removeEventListener('mousemove', updateCursor);
      // (Scroll event cleanup omitted for brevity)
    };
  }, []);

  return (
    <div 
      className="fixed pointer-events-none z-[60]"
      style={{ 
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) scale(${isVisible && isLeftHalf ? 1 : 0})`,
        opacity: isVisible ? 1 : 0,
        transition: 'transform 0.1s ease-out, opacity 0.2s ease-out',
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
  );
};

export default CustomCursor;
