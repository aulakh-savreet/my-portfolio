import React, { useEffect, useRef } from 'react';

export default function NavBar({ navColor = '#000' }) {
  // Store animation types
  const animationTypes = {
    'glitch': (letters) => {
      letters.forEach((letter) => {
        const tl = window.gsap.timeline();
        tl.to(letter, {
          duration: 0.1,
          x: () => Math.random() * 10 - 5,
          y: () => Math.random() * 10 - 5,
          opacity: 0.5,
          color: () => `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`,
          repeat: 3,
          yoyo: true,
          ease: 'none'
        })
        .to(letter, {
          duration: 0.2,
          x: 0,
          y: 0,
          opacity: 1,
          color: navColor
        });
      });
    },
    
    'explosion': (letters) => {
      letters.forEach((letter, i) => {
        window.gsap.to(letter, {
          duration: 0.5,
          physics2D: {
            velocity: Math.random() * 200 + 200,
            angle: Math.random() * 360,
            gravity: 500
          },
          opacity: 0,
          rotation: Math.random() * 520,
          ease: 'power4.out',
          onComplete: () => {
            window.gsap.to(letter, {
              duration: 0.1,
              opacity: 1,
              x: 0,
              y: 0,
              rotation: 0,
              ease: 'none'
            });
          }
        });
      });
    },
    
    'magnetic': (container, e) => {
      const bounds = container.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;
      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;
      
      const deltaX = (mouseX - centerX) * 0.3;
      const deltaY = (mouseY - centerY) * 0.3;
      
      window.gsap.to(container.querySelectorAll('span'), {
        duration: 0.3,
        x: deltaX,
        y: deltaY,
        ease: 'power2.out',
        onComplete: () => {
          window.gsap.to(container.querySelectorAll('span'), {
            duration: 0.5,
            x: 0,
            y: 0,
            ease: 'elastic.out(1, 0.3)'
          });
        }
      });
    },
    
    'wave': (letters) => {
      letters.forEach((letter, i) => {
        window.gsap.to(letter, {
          duration: 0.5,
          y: -20,
          scale: 1.2,
          ease: 'power2.out',
          delay: i * 0.05,
          yoyo: true,
          repeat: 1
        });
      });
    }
  };

  const handleClick = (type) => {
    switch (type) {
      case 'github':
        window.open('https://github.com', '_blank');
        break;
      case 'linkedin':
        window.open('https://linkedin.com', '_blank');
        break;
      // Add other cases as needed
    }
  };

  const splitText = (text) => {
    return text.split('').map((char, i) => (
      <span 
        key={i} 
        className="inline-block transform-gpu" 
        style={{ backfaceVisibility: 'hidden' }}
      >
        {char}
      </span>
    ));
  };

  const handleHover = (e, animationType) => {
    if (!window.gsap) return;
    
    const container = e.currentTarget;
    const letters = container.querySelectorAll('span');
    
    if (animationType === 'magnetic') {
      animationTypes[animationType](container, e);
    } else {
      animationTypes[animationType](letters);
    }
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 9999,
        backgroundColor: 'transparent',
        color: navColor,
      }}
      className="flex justify-between items-center px-8 py-4"
    >
      <div 
        className="text-3xl font-bold cursor-pointer select-none"
        style={{ color: navColor }}
      >
        dao
      </div>

      <div className="flex gap-8">
        {/* Glitch Effect */}
        <button
          type="button"
          onClick={() => handleClick('github')}
          onMouseEnter={(e) => handleHover(e, 'glitch')}
          className="relative px-4 py-2 text-lg font-bold cursor-pointer active:opacity-50 select-none"
          style={{ color: navColor }}
        >
          <div className="overflow-hidden">
            {splitText('GitHub')}
          </div>
        </button>

        {/* Explosion Effect */}
        <button
          type="button"
          onClick={() => handleClick('linkedin')}
          onMouseEnter={(e) => handleHover(e, 'explosion')}
          className="relative px-4 py-2 text-lg font-bold cursor-pointer active:opacity-50 select-none"
          style={{ color: navColor }}
        >
          <div className="overflow-hidden">
            {splitText('LinkedIn')}
          </div>
        </button>

        {/* Magnetic Effect */}
        <button
          type="button"
          onClick={() => handleClick('about')}
          onMouseEnter={(e) => handleHover(e, 'magnetic')}
          onMouseMove={(e) => handleHover(e, 'magnetic')}
          className="relative px-4 py-2 text-lg font-bold cursor-pointer active:opacity-50 select-none"
          style={{ color: navColor }}
        >
          <div className="overflow-hidden">
            {splitText('About')}
          </div>
        </button>

        {/* Wave Effect */}
        <button
          type="button"
          onClick={() => handleClick('contact')}
          onMouseEnter={(e) => handleHover(e, 'wave')}
          className="relative px-4 py-2 text-lg font-bold cursor-pointer active:opacity-50 select-none"
          style={{ color: navColor }}
        >
          <div className="overflow-hidden">
            {splitText('Contact')}
          </div>
        </button>
      </div>
    </nav>
  );
}