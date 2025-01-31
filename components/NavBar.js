import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, User } from 'lucide-react';
import Link from 'next/link';

export default function NavBar() {
  const linksRef = useRef([]);
  const nameRef = useRef(null);
  
  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    // Initial state
    gsap.set(linksRef.current, { y: 50, opacity: 0 });
    gsap.set(nameRef.current, { y: -50, opacity: 0 });

    // Animate nav items
    gsap.to(nameRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    });

    gsap.to(linksRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    });
    
    // SAV text glow animation
    const glowTimeline = gsap.timeline({
      repeat: -1,
      yoyo: true
    });
    
    glowTimeline.to(nameRef.current, {
      filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.5))',
      duration: 2,
      ease: "power2.inOut"
    });

    // Text scramble effect
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    
    linksRef.current.forEach(link => {
      if (!link) return;
      const originalText = link.textContent;
      let currentText = originalText;
      let interval;
      
      link.addEventListener('mouseenter', () => {
        let iteration = 0;
        clearInterval(interval);
        
        interval = setInterval(() => {
          link.textContent = currentText
            .split("")
            .map((letter, index) => {
              if(index < iteration) {
                return originalText[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
          
          if(iteration >= originalText.length) {
            clearInterval(interval);
            link.textContent = originalText;
          }
          
          iteration += 1/3;
        }, 30);
      });

      link.addEventListener('mouseleave', () => {
        clearInterval(interval);
        link.textContent = originalText;
      });
    });

    return () => {
      glowTimeline.kill();
    };
  }, []);

  const navItems = [
    { text: 'GITHUB', link: 'https://github.com/aulakh-savreet' },
    { text: 'LINKEDIN', link: 'https://linkedin.com/in/savreet-aulakh' },
    { text: 'ABOUT', link: '/about' },
    { text: 'CONTACT', link: '#Contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-12 py-8">
      <div className="flex justify-between items-center">
        {/* Logo/Name */}
        <Link href="/" // Changed from "to" to "href"
          ref={nameRef}
          className="relative overflow-hidden cursor-pointer"
        >
          <span className="text-3xl font-bold text-white">
            SAV
          </span>
        </Link>

        {/* Navigation Items */}
        <div className="flex gap-12">
          {navItems.map((item, index) => (
            item.link.startsWith('http') ? (
              <a
                key={index}
                ref={el => linksRef.current[index] = el}
                href={item.link}
                className="text-sm tracking-wider text-white/80 hover:text-white transition-colors"
              >
                {item.text}
              </a>
            ) : (
              <Link
                key={index}
                ref={el => linksRef.current[index] = el}
                href={item.link} // Changed from "to" to "href"
                className="text-sm tracking-wider text-white/80 hover:text-white transition-colors"
              >
                {item.text}
              </Link>
            )
          ))}
        </div>
      </div>
    </nav>
  );
}