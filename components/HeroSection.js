// components/HeroSection.js
import React from 'react';

export default function HeroSection() {
  // Keep your existing handleClick logic
  const handleClick = (type) => {
    switch (type) {
      case 'github':
        window.open('https://github.com', '_blank');
        break;
      case 'linkedin':
        window.open('https://linkedin.com', '_blank');
        break;
      case 'about':
        console.log('About clicked');
        break;
      case 'contact':
        console.log('Contact clicked');
        break;
      case 'talk':
        console.log("Let's talk clicked");
        break;
    }
  };

  // Hover in: text rolls up
  const handleMouseEnter = (e) => {
    if (!window.gsap) return;
    const textEl = e.currentTarget.querySelector('.nav-btn-text');
    if (!textEl) return;

    const tl = window.gsap.timeline();

    // 1) Slide text UP & fade out
    tl.to(textEl, {
      yPercent: -100, // up off the top
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        // 2) Instantly place text below
        window.gsap.set(textEl, { yPercent: 100 });
      },
    });
    // 3) Slide from below to center & fade in
    tl.to(textEl, {
      yPercent: 0,
      opacity: 1,
      duration: 0.3,
    });
  };

  // Hover out: text rolls down
  const handleMouseLeave = (e) => {
    if (!window.gsap) return;
    const textEl = e.currentTarget.querySelector('.nav-btn-text');
    if (!textEl) return;

    const tl = window.gsap.timeline();

    // 1) Slide text DOWN & fade out
    tl.to(textEl, {
      yPercent: 100, // off the bottom
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        // 2) Instantly place text above
        window.gsap.set(textEl, { yPercent: -100 });
      },
    });
    // 3) Slide from above to center & fade in
    tl.to(textEl, {
      yPercent: 0,
      opacity: 1,
      duration: 0.3,
    });
  };

  return (
    <div
      className="hero-section w-full h-screen bg-gradient-to-b from-white to-pink-300 relative"
      style={{ zIndex: 40 }}
    >
      {/* Navigation */}
      <nav
        className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-4"
        style={{ zIndex: 50 }}
      >
        <div className="text-3xl font-bold cursor-pointer select-none">Savreet</div>

        <div className="flex gap-8">
          {/* GITHUB */}
          <button
            type="button"
            onClick={() => handleClick('github')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-hidden px-4 py-2 text-lg font-bold cursor-pointer hover:opacity-75 active:opacity-50 select-none"
          >
            <span className="nav-btn-text inline-block">GitHub</span>
          </button>

          {/* LINKEDIN */}
          <button
            type="button"
            onClick={() => handleClick('linkedin')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-hidden px-4 py-2 text-lg font-bold cursor-pointer hover:opacity-75 active:opacity-50 select-none"
          >
            <span className="nav-btn-text inline-block">LinkedIn</span>
          </button>

          {/* ABOUT */}
          <button
            type="button"
            onClick={() => handleClick('about')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-hidden px-4 py-2 text-lg font-bold cursor-pointer hover:opacity-75 active:opacity-50 select-none"
          >
            <span className="nav-btn-text inline-block">About</span>
          </button>

          {/* CONTACT */}
          <button
            type="button"
            onClick={() => handleClick('contact')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-hidden px-4 py-2 text-lg font-bold cursor-pointer hover:opacity-75 active:opacity-50 select-none"
          >
            <span className="nav-btn-text inline-block">Contact</span>
          </button>

          {/* TALK */}
          <button
            type="button"
            onClick={() => handleClick('talk')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-hidden text-lg font-bold px-4 py-2 flex items-center cursor-pointer hover:opacity-75 active:opacity-50 select-none"
          >
            <span className="nav-btn-text inline-block">
              Let&apos;s talk<span className="ml-1">↗</span>
            </span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="h-full flex">
        {/* Left Side */}
        <div className="flex-1 pt-32 pl-8">
          <h1 className="text-[180px] font-black leading-[0.8] tracking-tighter">
            FOR
            <br />
            DESIGN
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex-1 relative">
          <img
            src="/api/placeholder/800/1000"
            alt="Profile"
            className="w-full h-[90%] object-cover brightness-90 contrast-125"
          />
          <div className="absolute bottom-20 right-8 max-w-sm text-right">
            <span className="inline-block mb-4 text-2xl">↓</span>
            <p className="text-base leading-relaxed">
              A freelance art director and designer based in the Netherlands.
              Specializing in contemporary and functional design...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
