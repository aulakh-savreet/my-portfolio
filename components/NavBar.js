// components/NavBar.js
import React from 'react';

export default function NavBar() {
  const handleClick = (type) => {
    switch (type) {
      case 'showreel':
        window.location.href = '#showreel';
        break;
      case 'projects':
        window.location.href = '#projects';
        break;
      case 'studio':
        window.location.href = '#studio';
        break;
      case 'contact':
        window.location.href = '#contact';
        break;
      default:
        break;
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
      }}
      className="flex justify-between items-center px-12 py-8"
    >
      {/* Logo */}
      <div className="cursor-pointer">
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M21 0C9.40202 0 0 9.40202 0 21C0 32.598 9.40202 42 21 42C32.598 42 42 32.598 42 21C42 9.40202 32.598 0 21 0ZM21 4.2C30.2817 4.2 37.8 11.7183 37.8 21C37.8 30.2817 30.2817 37.8 21 37.8C11.7183 37.8 4.2 30.2817 4.2 21C4.2 11.7183 11.7183 4.2 21 4.2Z" 
            fill="white"
          />
        </svg>
      </div>

      {/* Navigation Items */}
      <div className="flex gap-16">
        {[
          { name: 'SHOWREEL', type: 'showreel' },
          { name: 'PROJECTS', type: 'projects' },
          { name: 'THE STUDIO', type: 'studio' },
          { name: 'CONTACT', type: 'contact' }
        ].map((item) => (
          <button
            key={item.type}
            onClick={() => handleClick(item.type)}
            className="text-white text-sm tracking-[0.15em] font-light hover:opacity-60 transition-opacity relative group"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {item.name}
            <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          </button>
        ))}
      </div>
    </nav>
  );
}