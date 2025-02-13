import React, { useEffect, useRef } from 'react';
import PixelBackground from './PixelBackground';
import dynamic from 'next/dynamic';
import ShaderBackground from './ShaderBackground';

export default function HeroSection() {
  const mainTextRef = useRef(null);
  const subtitle1Ref = useRef(null);
  const subtitle2Ref = useRef(null);

  const isMobile = typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    
    const scrambleText = (element, finalText, duration = 30) => {
      if (!element) return;
      
      let iteration = 0;
      const originalText = finalText;
      clearInterval(element.scrambleInterval);
      
      element.scrambleInterval = setInterval(() => {
        element.innerText = originalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
        
        if (iteration >= originalText.length) {
          clearInterval(element.scrambleInterval);
          element.innerText = originalText;
        }
        
        iteration += 1/2;
      }, duration);
    };

    const texts = [
      {
        ref: mainTextRef.current,
        text: "Crafting digital experiences through code and creativity"
      },
      {
        ref: subtitle1Ref.current,
        text: "FULL-STACK DEVELOPER"
      },
      {
        ref: subtitle2Ref.current,
        text: "UI/UX DESIGNER"
      }
    ];

    texts.forEach((item, index) => {
      setTimeout(() => {
        const duration = index === 0 ? 15 : 30;
        scrambleText(item.ref, item.text, duration);
      }, index * 300);
    });

    if (mainTextRef.current) {
      mainTextRef.current.addEventListener('mouseenter', () => {
        scrambleText(mainTextRef.current, "Crafting digital experiences through code and creativity", 15);
      });
    }

    return () => {
      texts.forEach(item => {
        if (item.ref && item.ref.scrambleInterval) {
          clearInterval(item.ref.scrambleInterval);
        }
      });
      
      gsap.killTweensOf([mainTextRef.current, subtitle1Ref.current, subtitle2Ref.current]);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="hero-element absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black" />

      <div className="hero-element">
        <PixelBackground />
      </div>

      <div 
        className="hero-element absolute inset-0"
        style={{ 
          zIndex: 20,
          pointerEvents: 'auto'
        }}
      >
        <ShaderBackground />
      </div>

      <div className="hero-element absolute inset-0 z-10 flex flex-col items-center">
        <div className="mt-[30vh] md:mt-[60vh] text-center">
          {/* Mobile: SAVREET logo above main text */}
          {isMobile && (
            <div className="mb-4">
              <h1 
                className="text-3xl font-bold text-white"
                style={{ 
                  fontFamily: 'Space Grotesk',
                  letterSpacing: '0.1em'
                }}
              >
                SAVREET
              </h1>
            </div>
          )}
          <p 
            ref={mainTextRef}
            className="text-lg md:text-xl text-white/80 mb-8 cursor-pointer"
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
              <span ref={subtitle1Ref} className="text-sm md:text-base">FULL-STACK DEVELOPER</span>
              <span className="w-1 h-1 rounded-full bg-indigo-500/50" />
            </div>
            <div className="flex items-center gap-3">
              <span className="w-1 h-1 rounded-full bg-indigo-500/50" />
              <span ref={subtitle2Ref} className="text-sm md:text-base">UI/UX DESIGNER</span>
              <span className="w-1 h-1 rounded-full bg-indigo-500/50" />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-element absolute bottom-12 left-1/2 -translate-x-1/2 z-30">
        <span 
          className="block text-white/40 text-sm text-center mb-4"
          style={{ 
            fontFamily: 'Space Grotesk',
            letterSpacing: '0.3em',
            fontWeight: 300,
            animation: 'pulse 2s infinite'
          }}
        >
          SCROLL
        </span>
        <div 
          className="relative w-px h-16 mx-auto overflow-hidden"
          style={{ animation: 'bounce 2s infinite cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)',
              animation: 'glow 2s infinite'
            }}
          />
        </div>
        <style jsx>{`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-18px);
            }
            60% {
              transform: translateY(-10px);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 0.4;
            }
            50% {
              opacity: 0.8;
            }
          }
          
          @keyframes glow {
            0%, 100% {
              opacity: 0.7;
            }
            50% {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
