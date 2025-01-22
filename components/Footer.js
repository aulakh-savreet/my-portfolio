import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const containerRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    gsap.killTweensOf([
      '.footer-title span', 
      '.footer-logo', 
      '.footer-services li', 
      '.footer-links',
      '.glow-text'
    ]);

    // Create glow animation timeline
    const glowTimeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { duration: 2, ease: "power1.inOut" }
    });

    glowTimeline.to('.glow-text', {
      filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.4))',
      stagger: {
        each: 0.1,
        from: "random"
      }
    });

    // Entrance animations
    gsap.from(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'top center',
        scrub: 1,
        onEnter: () => {
          gsap.to('.footer-title span', {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))'
          });

          gsap.to('.footer-logo', {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
          });

          gsap.to('.footer-services li', {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
          });

          gsap.to('.footer-links', {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
          });
        }
      }
    });

    // Set initial states
    gsap.set('.footer-title span', { y: 100, opacity: 0 });
    gsap.set('.footer-logo', { scale: 0.8, opacity: 0 });
    gsap.set('.footer-services li', { x: -20, opacity: 0 });
    gsap.set('.footer-links', { y: 20, opacity: 0 });

    return () => {
      glowTimeline.kill();
      gsap.killTweensOf([
        '.footer-title span', 
        '.footer-logo', 
        '.footer-services li', 
        '.footer-links',
        '.glow-text'
      ]);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services = [
    'FRONTEND DEVELOPMENT',
    'REACT / NEXT.JS',
    'UI DEVELOPMENT',
    'WEB ANIMATION',
    'RESPONSIVE DESIGN',
    'PERFORMANCE OPTIMIZATION'
  ];

  return (
    <footer 
      ref={containerRef}
      className="relative w-full bg-[#030712] text-white min-h-screen flex items-center" 
      style={{ zIndex: 100 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#080C15] via-[#030712] to-black opacity-80" />
      
      <div className="max-w-screen-2xl mx-auto relative px-12 w-full flex flex-col justify-between min-h-screen">
        <div className="grid grid-cols-12 gap-8 h-full" style={{ paddingTop: '15vh' }}>
          {/* Left Column - Logo and Title */}
          <div className="col-span-12 lg:col-span-6">
            <div className="mb-16">
              <div className="footer-logo w-24 h-24 border-2 border-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-medium glow-text">sav</span>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="footer-title text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                {['DESIGN', 'WITH', 'CODE.', 'BUILT', 'TO', 'LAST.'].map((word, index) => (
                  <span 
                    key={index} 
                    className="inline-block mr-4 mb-2 glow-text"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h2>
            </div>
          </div>

          {/* Right Column - Services and Links */}
          <div className="col-span-12 lg:col-span-6 lg:flex lg:flex-col lg:items-end">
            {/* Services section with updated styling */}
            <div className="mb-16 w-full lg:w-auto">
              <h3 className="text-sm tracking-wider text-white/50 mb-6 glow-text">SERVICES</h3>
              <ul className="footer-services space-y-4 text-right">
                {services.map((service) => (
                  <li key={service} className="flex items-center justify-end gap-2 text-lg whitespace-nowrap">
                    <span className="font-light glow-text">{service}</span>
                    <span className="text-white/30">•</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rest of the footer content remains the same */}
            <div className="mb-12">
              <h3 className="text-sm tracking-wider text-white/50 mb-6 glow-text">FOLLOW</h3>
              <div className="footer-links flex gap-6 justify-end">
                <a href="#" className="text-white/75 hover:text-white transition-colors glow-text">
                  <Github size={20} />
                </a>
                <a href="#" className="text-white/75 hover:text-white transition-colors glow-text">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-white/75 hover:text-white transition-colors glow-text">
                  <Mail size={20} />
                </a>
              </div>
            </div>

            <div className="footer-links text-sm text-white/50 mb-8 glow-text">
              • BASED IN CALGARY
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12 mt-auto pt-16">
              <div className="footer-links flex gap-6 text-sm text-white/50">
                <a href="#" className="hover:text-white/75 transition-colors glow-text">TERMS OF USE</a>
                <span>•</span>
                <a href="#" className="hover:text-white/75 transition-colors glow-text">PRIVACY POLICY</a>
              </div>

              <div className="footer-links flex items-center gap-8">
                <button 
                  onClick={handleBackToTop}
                  className="flex items-center gap-2 text-white/75 hover:text-white transition-colors group glow-text"
                >
                  Back to top
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    className="transform transition-transform group-hover:-translate-y-1"
                  >
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  </svg>
                </button>
                <button className="bg-white text-black px-6 py-3 rounded-full hover:bg-white/90 transition-all hover:scale-105 flex items-center gap-2 glow-text">
                  Let's talk
                  <ArrowUpRight size={18} className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
