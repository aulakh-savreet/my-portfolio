import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, User } from 'lucide-react';

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

    // Hover animations for nav items
    linksRef.current.forEach(link => {
      if (!link) return;
      
      const text = link.querySelector('.nav-text');
      const icon = link.querySelector('.nav-icon');
      
      link.addEventListener('mouseenter', () => {
        gsap.to(text, {
          y: -20,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        });
        gsap.to(icon, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          delay: 0.1,
          ease: "power2.out"
        });
      });

      link.addEventListener('mouseleave', () => {
        gsap.to(text, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          delay: 0.1,
          ease: "power2.out"
        });
        gsap.to(icon, {
          y: 20,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        });
      });
    });
  }, []);

  const navItems = [
    { text: 'GITHUB', link: 'https://github.com/yourusername' },
    { text: 'LINKEDIN', link: 'https://linkedin.com/in/yourusername' },
    { text: 'ABOUT', link: '#about' },
    { text: 'CONTACT', link: '#contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-12 py-8">
      <div className="flex justify-between items-center">
        {/* Logo/Name */}
        <div 
          ref={nameRef}
          className="relative overflow-hidden cursor-pointer group"
        >
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text group-hover:to-indigo-400 transition-all duration-300">
            SAV
          </span>
        </div>

        {/* Navigation Items */}
        <div className="flex gap-12">
          {navItems.map((item, index) => (
            <a
              key={index}
              ref={el => linksRef.current[index] = el}
              href={item.link}
              className="text-sm tracking-wider text-white/80 hover:text-white transition-colors"
            >
              {item.text}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}