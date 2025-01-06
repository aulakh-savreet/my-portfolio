// components/Navigation.js
import React from 'react';

/**
 * This component shows 5 buttons (GitHub, LinkedIn, About, Contact, Let's Talk).
 * On hover, the text scrolls up and reappears from below, courtesy of GSAP.
 */
export default function Navigation() {
  // Hover handler: run small GSAP animation
  const handleMouseEnter = (e) => {
    if (!window.gsap) return;
    const textEl = e.currentTarget.querySelector('.nav-btn-text');
    if (!textEl) return;

    const tl = window.gsap.timeline();

    // 1) Slide text up & fade out
    tl.to(textEl, {
      yPercent: -100,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        // 2) Instantly place text below
        window.gsap.set(textEl, { yPercent: 100 });
      },
    });

    // 3) Slide back to center, fade in
    tl.to(textEl, {
      yPercent: 0,
      opacity: 1,
      duration: 0.3,
    });
  };

  return (
    <nav
      className="w-full flex gap-8 p-4 bg-white bg-opacity-90 backdrop-blur-md"
      style={{ position: 'relative', zIndex: 999 }}
    >
      {/* GitHub */}
      <button
        type="button"
        onMouseEnter={handleMouseEnter}
        className="relative px-4 py-2 text-lg font-bold cursor-pointer overflow-hidden"
      >
        <span className="nav-btn-text inline-block">GitHub</span>
      </button>

      {/* LinkedIn */}
      <button
        type="button"
        onMouseEnter={handleMouseEnter}
        className="relative px-4 py-2 text-lg font-bold cursor-pointer overflow-hidden"
      >
        <span className="nav-btn-text inline-block">LinkedIn</span>
      </button>

      {/* About */}
      <button
        type="button"
        onMouseEnter={handleMouseEnter}
        className="relative px-4 py-2 text-lg font-bold cursor-pointer overflow-hidden"
      >
        <span className="nav-btn-text inline-block">About</span>
      </button>

      {/* Contact */}
      <button
        type="button"
        onMouseEnter={handleMouseEnter}
        className="relative px-4 py-2 text-lg font-bold cursor-pointer overflow-hidden"
      >
        <span className="nav-btn-text inline-block">Contact</span>
      </button>

      {/* Let's talk */}
      <button
        type="button"
        onMouseEnter={handleMouseEnter}
        className="relative px-4 py-2 text-lg font-bold cursor-pointer overflow-hidden"
      >
        <span className="nav-btn-text inline-block">Let&apos;s talk ↗</span>
      </button>
    </nav>
  );
}
