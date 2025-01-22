import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const CustomCursor = ({ isLeftHalf }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Get references to sections
    const mainSection = document.querySelector('main');
    const heroSection = document.querySelector('.hero-element');
    
    const updateCursor = (e) => {
      // Get current scroll position
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Check if we've scrolled past hero (where projects begin)
      const isPassedHero = scrollY >= windowHeight;
      
      // Update cursor position
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Only show cursor when we've scrolled past hero section
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
      window.removeEventListener('scroll', () => {});
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