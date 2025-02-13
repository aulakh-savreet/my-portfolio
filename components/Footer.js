import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';

export default function Footer() {
  const containerRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    gsap.killTweensOf([
      '.footer-title span', 
      '.footer-logo', 
      '.footer-technologies span', 
      '.footer-links',
      '.glow-text'
    ]);

    const glowTimeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { duration: 2, ease: 'power1.inOut' }
    });

    glowTimeline.to('.glow-text', {
      filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.4))',
      stagger: {
        each: 0.1,
        from: 'random'
      }
    });

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

          gsap.to('.footer-technologies span', {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
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

    gsap.set('.footer-title span', { y: 100, opacity: 0 });
    gsap.set('.footer-logo', { scale: 0.8, opacity: 0 });
    gsap.set('.footer-technologies span', { y: 20, opacity: 0 });
    gsap.set('.footer-links', { y: 20, opacity: 0 });

    return () => {
      glowTimeline.kill();
      gsap.killTweensOf([
        '.footer-title span', 
        '.footer-logo', 
        '.footer-technologies span', 
        '.footer-links',
        '.glow-text'
      ]);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={containerRef}
      className="relative w-full bg-[#030712] text-white h-auto md:h-screen flex flex-col items-center"
      style={{ zIndex: 100 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#080C15] via-[#030712] to-black opacity-80" />

      <div className="max-w-screen-2xl mx-auto relative px-4 md:px-12 w-full flex flex-col h-auto md:h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full" style={{ paddingTop: '10vh' }}>
          {/* Left side */}
          <div className="col-span-12 lg:col-span-6">
            <div className="footer-logo w-24 h-24 border-2 border-white rounded-full flex items-center justify-center mb-16">
              <span className="text-white text-2xl font-bold">SAV</span>
            </div>

            <div className="footer-title text-4xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-16">
              {['DESIGN', 'ENVISIONS.', 'CODE', 'MANIFESTS.'].map((word, index) => (
                <span 
                  key={index} 
                  className="inline-block mr-2 md:mr-4 mb-2 glow-text"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Right side: technologies + social links */}
          <div className="col-span-12 lg:col-span-6 lg:flex lg:flex-col lg:items-end">
            {/* Tech stacks */}
            <div className="mb-12 w-full">
              <h3 className="relative text-2xl md:text-3xl tracking-wider text-white mb-6 inline-block">
                <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                  TECHNOLOGIES
                </span>
                <div className="absolute -bottom-4 left-0 w-1/3 h-1 bg-gradient-to-r from-purple-500 to-transparent" />
              </h3>

              <div className="footer-technologies grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Example: Frontend */}
                <div className="tech-section relative group bg-gradient-to-b from-purple-500/10 to-transparent 
                  backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-purple-500/50 
                  transition-all duration-500"
                >
                  <h4 className="text-lg font-medium text-white mb-4 relative">
                    <span className="bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent">
                      Frontend
                    </span>
                  </h4>
                  <div className="space-y-2 relative">
                    {["React", "Next.js", "TypeScript", "JavaScript", "Three.js", "GSAP"].map((tech) => (
                      <div key={tech} className="flex items-center gap-3 p-2 rounded-lg bg-black/20 border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500/50" />
                        <span className="text-sm text-white/70">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Example: Backend */}
                <div className="tech-section relative group bg-gradient-to-b from-blue-500/10 to-transparent 
                  backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-blue-500/50 
                  transition-all duration-500"
                >
                  <h4 className="text-lg font-medium text-white mb-4 relative">
                    <span className="bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
                      Backend
                    </span>
                  </h4>
                  <div className="space-y-2 relative">
                    {["Node.js", "Python", "Java", "C#", ".NET", "SQL"].map((tech) => (
                      <div key={tech} className="flex items-center gap-3 p-2 rounded-lg bg-black/20 border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                        <span className="text-sm text-white/70">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Example: Tools & Design */}
                <div className="tech-section relative group bg-gradient-to-b from-emerald-500/10 to-transparent 
                  backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-emerald-500/50 
                  transition-all duration-500"
                >
                  <h4 className="text-lg font-medium text-white mb-4 relative">
                    <span className="bg-gradient-to-r from-emerald-400 to-white bg-clip-text text-transparent">
                      Tools & Design
                    </span>
                  </h4>
                  <div className="space-y-2 relative">
                    {["Git", "Firebase", "Figma", "AWS", "Docker", "Vercel"].map((tech) => (
                      <div key={tech} className="flex items-center gap-3 p-2 rounded-lg bg-black/20 border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                        <span className="text-sm text-white/70">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="mb-12">
              <h3 className="text-sm tracking-wider text-white/50 mb-6 glow-text text-right">
                LINKS
              </h3>
              <div className="footer-links flex gap-4 md:gap-6 justify-end">
                <a 
                  href="https://github.com/aulakh-savreet" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/75 hover:text-white transition-colors glow-text"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://linkedin.com/in/savreet-aulakh" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/75 hover:text-white transition-colors glow-text"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="mailto:aulakh.savreet@gmail.com" 
                  className="text-white/75 hover:text-white transition-colors glow-text"
                >
                  <Mail size={20} />
                </a>
                <a 
                  href="https://www.instagram.com/savreeet__/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/75 hover:text-white transition-colors glow-text"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            {/* Desktop: old disclaimers (absolute) */}
            <div className="hidden md:block">
              <div className="absolute bottom-4 md:bottom-8 left-4 md:left-12 text-sm text-white/50">
                <a href="#" className="hover:text-white/75 transition-colors glow-text">TERMS OF USE</a>
                <span className="mx-2">•</span>
                <a href="#" className="hover:text-white/75 transition-colors glow-text">PRIVACY POLICY</a>
                <span className="mx-2">•</span>
                <a href="#" className="hover:text-white/75 transition-colors glow-text">BASED IN CALGARY</a>
              </div>

              <div className="absolute bottom-4 md:bottom-8 right-4 md:right-12">
                <button 
                  onClick={handleBackToTop}
                  className="bg-white text-black px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-white/90 
                    transition-all hover:scale-105 flex items-center gap-2 glow-text"
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
              </div>
            </div>

            {/* Mobile: disclaimers + back-to-top in normal flow */}
            <div className="block md:hidden mt-auto mb-4">
              {/* Disclaimers in a simple row */}
              <div className="flex flex-wrap gap-2 items-center justify-center text-xs text-white/50 mb-6">
                <a href="#" className="hover:text-white/75 transition-colors glow-text">
                  TERMS OF USE
                </a>
                <span className="mx-1">•</span>
                <a href="#" className="hover:text-white/75 transition-colors glow-text">
                  PRIVACY POLICY
                </a>
                <span className="mx-1">•</span>
                <a href="#" className="hover:text-white/75 transition-colors glow-text">
                  BASED IN CALGARY
                </a>
              </div>

              {/* “Back to top” in normal flow */}
              <div className="flex justify-center">
                <button 
                  onClick={handleBackToTop}
                  className="bg-white text-black px-4 py-2 rounded-full hover:bg-white/90 
                    transition-all hover:scale-105 flex items-center gap-2 glow-text"
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
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
