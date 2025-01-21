import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const CustomCursor = ({ isLeftHalf }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <div 
      className="fixed pointer-events-none z-50 transition-transform duration-100"
      style={{ 
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) scale(${isLeftHalf ? 1 : 0})`,
        willChange: 'transform',
        pointerEvents: 'none !important'
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