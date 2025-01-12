import React from 'react';

export default function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services = [
    'BRANDING',
    'PHOTOGRAPHY',
    'ART DIRECTION',
    'WEB DESIGN'
  ];

  return (
    <footer className="w-full bg-white pt-20 pb-8 px-8">
      {/* Main heading */}
      <div className="mb-20">
        <h2 className="text-7xl font-black leading-[0.9] tracking-tighter max-w-3xl">
          DESIGN WITH CLASS.
          <br />
          BUILT TO LAST.
        </h2>
      </div>

      {/* Logo */}
      <div className="mb-20">
        <div className="w-32 h-32 border-4 border-black rounded-full flex items-center justify-center">
          <span className="text-4xl font-bold">dao</span>
        </div>
      </div>

      {/* Main footer content */}
      <div className="flex justify-between">
        {/* Left side */}
        <div className="flex items-end">
          <div className="text-sm opacity-50">
            <a href="#" className="hover:opacity-75 transition-opacity">TERMS OF USE</a>
            <span className="mx-2">•</span>
            <a href="#" className="hover:opacity-75 transition-opacity">PRIVACY POLICY</a>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col gap-8 items-end">
          {/* Services section */}
          <div className="text-right">
            <h3 className="text-sm mb-4 opacity-50">SERVICES</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="flex items-center justify-end gap-2">
                  <span className="text-lg font-medium">{service}</span>
                  <span className="opacity-50">•</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div className="text-right">
            <h3 className="text-sm mb-4 opacity-50">FOLLOW</h3>
            <div className="flex gap-4 justify-end">
              {/* Instagram Icon */}
              <a href="#" className="hover:opacity-75 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              {/* LinkedIn Icon */}
              <a href="#" className="hover:opacity-75 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              {/* Behance Icon */}
              <a href="#" className="hover:opacity-75 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.89 17.56c-.63.23-1.29.35-1.96.35-3.57 0-6.47-2.9-6.47-6.47 0-.67.1-1.33.31-1.96A6.462 6.462 0 0 0 5.53 16c0 3.57 2.9 6.47 6.47 6.47 2.65 0 4.93-1.59 5.93-3.87l.96-1.04zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="text-sm opacity-50">
         <span className="mx-2">•</span> BASED IN CALGARY
          </div>

          {/* Back to top & Let's talk */}
          <div className="flex items-center gap-6">
            <button 
              onClick={handleBackToTop}
              className="flex items-center gap-2 hover:opacity-75 transition-opacity"
            >
              Back to top
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
            </button>
            <button className="bg-black text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity">
              Let's talk↗
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}