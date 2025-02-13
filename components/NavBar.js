// NavBar.js
import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export default function NavBar() {
  const linksRef = useRef([]);
  const nameRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showBack, setShowBack] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowBack(currentScrollY < lastScrollY || currentScrollY < 100);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check for mobile devices
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // GSAP animations
    const gsap = window.gsap;
    if (!gsap) return;

    gsap.set(linksRef.current, { y: 50, opacity: 0 });
    gsap.set(nameRef.current, { y: -50, opacity: 0 });

    gsap.to(nameRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.to(linksRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });

    // Glow effect on brand name
    const glowTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    if (nameRef.current) {
      glowTimeline.to(nameRef.current, {
        filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.5))',
        duration: 2,
        ease: 'power2.inOut',
      });
    }

    // Text scramble effect cleanup functions
    const textScrambleCleanups = [];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    linksRef.current.forEach((link) => {
      if (!link) return;
      const originalText = link.textContent;
      let interval;

      const handleHover = () => {
        let iteration = 0;
        clearInterval(interval);

        interval = setInterval(() => {
          link.textContent = originalText
            .split('')
            .map((letter, index) => {
              if (index < iteration) {
                return originalText[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

          if (iteration >= originalText.length) {
            clearInterval(interval);
            link.textContent = originalText;
          }
          iteration += 1 / 3;
        }, 30);
      };

      const handleLeave = () => {
        clearInterval(interval);
        link.textContent = originalText;
      };

      link.addEventListener('mouseenter', handleHover);
      link.addEventListener('mouseleave', handleLeave);

      // Store cleanup for this link
      textScrambleCleanups.push(() => {
        link.removeEventListener('mouseenter', handleHover);
        link.removeEventListener('mouseleave', handleLeave);
      });
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
      textScrambleCleanups.forEach((cleanup) => cleanup());
      glowTimeline.kill();
    };
  }, []);

  const navItems = [
    { text: 'GITHUB', link: 'https://github.com/aulakh-savreet' },
    { text: 'LINKEDIN', link: 'https://linkedin.com/in/savreet-aulakh' },
    { text: 'ABOUT', link: '/about' },
    { text: 'CONTACT', link: '#Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="w-full px-4 py-4 md:px-8 md:py-6">
        <div className={`flex ${isMobile ? 'justify-center' : 'justify-between'} items-center`}>
          {/* Logo - Only show on desktop */}
          {!isMobile && (
            <Link 
              href="/" 
              ref={nameRef}
              className={`relative overflow-hidden cursor-pointer select-none transition-opacity duration-300 ${
                showBack ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span className="text-3xl md:text-5xl font-bold text-white">
                SAVREET
              </span>
            </Link>
          )}

          {/* Navigation Links */}
          <div className={`flex gap-4 md:gap-8 ${isMobile ? 'w-full justify-around' : ''}`}>
            {navItems.map((item, index) => (
              item.link.startsWith('http') ? (
                <a
                  key={index}
                  ref={(el) => (linksRef.current[index] = el)}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm tracking-wider text-white/80 hover:text-white transition-colors whitespace-nowrap select-none"
                >
                  {item.text}
                </a>
              ) : (
                <Link
                  key={index}
                  ref={(el) => (linksRef.current[index] = el)}
                  href={item.link}
                  className="text-xs md:text-sm tracking-wider text-white/80 hover:text-white transition-colors whitespace-nowrap select-none"
                >
                  {item.text}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}