import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';

const AboutPage = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const smoothMouse = useRef({ x: 0.5, y: 0.5 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height, animationId;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      timeRef.current += 0.016;
      const time = timeRef.current;
      
      // Smooth mouse
      smoothMouse.current.x += (mousePos.x - smoothMouse.current.x) * 0.05;
      smoothMouse.current.y += (mousePos.y - smoothMouse.current.y) * 0.05;
      const mx = smoothMouse.current.x;
      const my = smoothMouse.current.y;

      // Clear
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // ========== MAIN PORTAL ==========
      // Large, visible, morphing shape in center
      const portalRadius = Math.min(width, height) * 0.25;
      const mouseOffsetX = (mx - 0.5) * 100;
      const mouseOffsetY = (my - 0.5) * 100;
      const px = centerX + mouseOffsetX * 0.3;
      const py = centerY + mouseOffsetY * 0.3;

      // Outer glow
      const glow = ctx.createRadialGradient(px, py, portalRadius * 0.5, px, py, portalRadius * 2);
      glow.addColorStop(0, 'rgba(30, 20, 40, 0.8)');
      glow.addColorStop(0.5, 'rgba(15, 10, 25, 0.4)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Morphing portal shape
      ctx.save();
      ctx.translate(px, py);
      
      // Draw multiple morphing rings
      for (let ring = 0; ring < 5; ring++) {
        const ringRadius = portalRadius * (0.3 + ring * 0.18);
        const points = 120;
        const noiseScale = 0.03 + ring * 0.01;
        const speed = 0.5 - ring * 0.08;
        
        ctx.beginPath();
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          
          // Organic morphing
          const noise1 = Math.sin(angle * 3 + time * speed) * 15;
          const noise2 = Math.sin(angle * 5 - time * speed * 0.7) * 10;
          const noise3 = Math.cos(angle * 2 + time * speed * 1.3) * 8;
          const mouseWarp = Math.sin(angle + Math.atan2(my - 0.5, mx - 0.5)) * 20 * (1 - ring * 0.15);
          
          const r = ringRadius + noise1 + noise2 + noise3 + mouseWarp;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        
        const alpha = 0.15 - ring * 0.025;
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 1.5 - ring * 0.2;
        ctx.stroke();
      }

      // Inner void - absolute black
      const voidGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, portalRadius * 0.35);
      voidGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
      voidGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.95)');
      voidGrad.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
      
      ctx.beginPath();
      ctx.arc(0, 0, portalRadius * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = voidGrad;
      ctx.fill();

      // Pulsing core light
      const pulse = Math.sin(time * 2) * 0.5 + 0.5;
      const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, portalRadius * 0.1);
      coreGrad.addColorStop(0, `rgba(255, 255, 255, ${0.15 * pulse})`);
      coreGrad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(0, 0, portalRadius * 0.1, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      ctx.restore();

      // ========== FLOWING LINES ==========
      // Fewer, but visible curved lines that flow toward the portal
      ctx.save();
      const lineCount = 12;
      
      for (let i = 0; i < lineCount; i++) {
        const baseAngle = (i / lineCount) * Math.PI * 2;
        const startDist = Math.max(width, height) * 0.8;
        const startX = centerX + Math.cos(baseAngle) * startDist;
        const startY = centerY + Math.sin(baseAngle) * startDist;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        
        const segments = 50;
        for (let s = 1; s <= segments; s++) {
          const t = s / segments;
          const dist = startDist * (1 - t * 0.7);
          
          const spiralAngle = baseAngle + t * 0.5 + Math.sin(time + i) * 0.3;
          const wave = Math.sin(t * 8 + time * 2 + i) * 30 * (1 - t);
          
          const x = centerX + Math.cos(spiralAngle) * dist + wave * Math.sin(spiralAngle);
          const y = centerY + Math.sin(spiralAngle) * dist + wave * Math.cos(spiralAngle);
          
          ctx.lineTo(x, y);
        }
        
        const lineAlpha = 0.06 + Math.sin(time + i * 0.5) * 0.03;
        ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();

      // ========== MOUSE TRAIL ==========
      // Visible trail following cursor
      const trailX = mx * width;
      const trailY = my * height;
      
      // Glow at cursor
      const cursorGlow = ctx.createRadialGradient(trailX, trailY, 0, trailX, trailY, 150);
      cursorGlow.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
      cursorGlow.addColorStop(0.5, 'rgba(255, 255, 255, 0.02)');
      cursorGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = cursorGlow;
      ctx.fillRect(0, 0, width, height);

      // Connection line from cursor to center
      ctx.beginPath();
      ctx.moveTo(trailX, trailY);
      
      // Curved path to center
      const midX = (trailX + px) / 2 + (my - 0.5) * 100;
      const midY = (trailY + py) / 2 + (mx - 0.5) * 100;
      ctx.quadraticCurveTo(midX, midY, px, py);
      
      const lineGrad = ctx.createLinearGradient(trailX, trailY, px, py);
      lineGrad.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      lineGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 1;
      ctx.stroke();

      // ========== SUBTLE GRID DISTORTION ==========
      // Warped grid that shows the gravitational pull
      ctx.save();
      ctx.globalAlpha = 0.03;
      const gridSize = 60;
      
      for (let x = 0; x < width + gridSize; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= height; y += 10) {
          const dx = x - px;
          const dy = y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pull = Math.max(0, 1 - dist / (portalRadius * 3)) * 30;
          const angle = Math.atan2(dy, dx);
          
          const warpedX = x - Math.cos(angle) * pull;
          const warpedY = y - Math.sin(angle) * pull;
          
          if (y === 0) ctx.moveTo(warpedX, warpedY);
          else ctx.lineTo(warpedX, warpedY);
        }
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      
      for (let y = 0; y < height + gridSize; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
          const dx = x - px;
          const dy = y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pull = Math.max(0, 1 - dist / (portalRadius * 3)) * 30;
          const angle = Math.atan2(dy, dx);
          
          const warpedX = x - Math.cos(angle) * pull;
          const warpedY = y - Math.sin(angle) * pull;
          
          if (x === 0) ctx.moveTo(warpedX, warpedY);
          else ctx.lineTo(warpedX, warpedY);
        }
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      ctx.restore();

      // ========== VIGNETTE ==========
      const vignette = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) * 0.7);
      vignette.addColorStop(0, 'transparent');
      vignette.addColorStop(0.7, 'transparent');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [mousePos]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll tracking  
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(containerRef.current.scrollTop);
      }
    };
    const container = containerRef.current;
    if (container) container.addEventListener('scroll', handleScroll);
    return () => { if (container) container.removeEventListener('scroll', handleScroll); };
  }, []);

  // GSAP entrance
  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    gsap.fromTo('.fade-up', 
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.5, stagger: 0.3, ease: 'power3.out', delay: 0.3 }
    );

    return () => gsap.killTweensOf('.fade-up');
  }, []);

  return (
    <>
      <Head>
        <title>About</title>
      </Head>

      {/* Background canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      {/* Noise overlay */}
      <div className="fixed inset-0 z-10 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Back button */}
      <Link href="/" className="fixed top-8 left-8 z-50 text-white/30 hover:text-white/60 transition-colors duration-500 text-sm tracking-[0.2em]">
        ← BACK
      </Link>

      {/* Content */}
      <div ref={containerRef} className="relative z-20 h-screen overflow-y-auto">
        
        {/* Hero */}
        <section className="min-h-screen flex flex-col items-center justify-center px-8">
          <div className="fade-up relative">
            {/* Background glow pulse */}
            <div 
              className="absolute inset-0 -inset-x-20 -inset-y-10 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
                animation: 'breathe 4s ease-in-out infinite',
                filter: 'blur(30px)'
              }}
            />
            
            {/* Main text with wave animation */}
            <h1 className="text-6xl md:text-8xl font-extralight tracking-[0.2em] relative" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {'SAVREET'.split('').map((letter, i) => {
                const offset = (mousePos.x - 0.5) * 10 * Math.sin(i * 0.8);
                const yOffset = (mousePos.y - 0.5) * 8 * Math.cos(i * 0.6);
                return (
                  <span
                    key={i}
                    className="inline-block transition-transform duration-300"
                    style={{
                      animation: `wave 3s ease-in-out infinite, breathe 4s ease-in-out infinite, textGlow 5s ease-in-out infinite`,
                      animationDelay: `${i * 0.1}s, ${i * 0.15}s, ${i * 0.2}s`,
                      textShadow: `
                        0 0 20px rgba(255,255,255,0.3),
                        0 0 40px rgba(255,255,255,0.1)
                      `,
                      color: 'rgba(255,255,255,0.9)',
                      transform: `translate(${offset}px, ${yOffset}px)`
                    }}
                  >
                    {letter}
                  </span>
                );
              })}
            </h1>
            
            {/* Chromatic aberration layers */}
            <h1 
              className="absolute inset-0 text-6xl md:text-8xl font-extralight tracking-[0.2em] pointer-events-none select-none"
              style={{ 
                fontFamily: 'Space Grotesk, sans-serif',
                color: 'cyan',
                opacity: 0.4,
                animation: 'glitchCyan 4s ease-in-out infinite, flicker 8s linear infinite',
                mixBlendMode: 'screen'
              }}
            >
              {'SAVREET'.split('').map((letter, i) => {
                const offset = (mousePos.x - 0.5) * 15 * Math.sin(i * 0.8);
                const yOffset = (mousePos.y - 0.5) * 10 * Math.cos(i * 0.6);
                return (
                  <span
                    key={i}
                    className="inline-block transition-transform duration-500"
                    style={{
                      animation: `wave 3s ease-in-out infinite`,
                      animationDelay: `${i * 0.1 + 0.05}s`,
                      transform: `translate(${offset - 3}px, ${yOffset}px)`
                    }}
                  >
                    {letter}
                  </span>
                );
              })}
            </h1>
            
            <h1 
              className="absolute inset-0 text-6xl md:text-8xl font-extralight tracking-[0.2em] pointer-events-none select-none"
              style={{ 
                fontFamily: 'Space Grotesk, sans-serif',
                color: 'magenta',
                opacity: 0.4,
                animation: 'glitchMagenta 4s ease-in-out infinite',
                mixBlendMode: 'screen'
              }}
            >
              {'SAVREET'.split('').map((letter, i) => {
                const offset = (mousePos.x - 0.5) * 12 * Math.sin(i * 0.8);
                const yOffset = (mousePos.y - 0.5) * 12 * Math.cos(i * 0.6);
                return (
                  <span
                    key={i}
                    className="inline-block transition-transform duration-400"
                    style={{
                      animation: `wave 3s ease-in-out infinite`,
                      animationDelay: `${i * 0.1 - 0.05}s`,
                      transform: `translate(${offset + 3}px, ${yOffset}px)`
                    }}
                  >
                    {letter}
                  </span>
                );
              })}
            </h1>
          </div>
          <div className="fade-up w-20 h-px bg-white/20 mt-8" />
          <p className="fade-up text-white/30 text-sm tracking-[0.4em] mt-6 uppercase">
            Developer
          </p>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
            <div className="fade-up w-px h-16 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </section>

        {/* About content */}
        <section className="min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-xl space-y-16">
            <p className="text-white/40 text-lg md:text-xl leading-relaxed font-light" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              I build things that exist between intention and interface. Code is the medium — understanding is the craft.
            </p>
            <p className="text-white/40 text-lg md:text-xl leading-relaxed font-light" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Full-stack development. React, Node, Python, Three.js. The tools are secondary to what gets built.
            </p>
            <p className="text-white/40 text-lg md:text-xl leading-relaxed font-light" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Based in Calgary. Available for work that demands craft and precision.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="min-h-screen flex flex-col items-center justify-center px-8">
          <p className="text-white/20 text-xs tracking-[0.4em] uppercase mb-10">Get in touch</p>
          <Link href="/#Contact" className="text-white/50 hover:text-white text-2xl md:text-4xl font-extralight tracking-wide transition-colors duration-500" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            aulakh.savreet@gmail.com
          </Link>
          <div className="flex gap-10 mt-16">
            <a href="https://github.com/aulakh-savreet" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white/50 text-xs tracking-[0.3em] transition-colors duration-500">
              GITHUB
            </a>
            <a href="https://linkedin.com/in/savreet-aulakh" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white/50 text-xs tracking-[0.3em] transition-colors duration-500">
              LINKEDIN
            </a>
          </div>
        </section>

        <div className="h-32" />
      </div>

      {/* Custom cursor */}
      <div className="fixed pointer-events-none z-50" style={{ left: mousePos.x * (typeof window !== 'undefined' ? window.innerWidth : 0), top: mousePos.y * (typeof window !== 'undefined' ? window.innerHeight : 0), transform: 'translate(-50%, -50%)' }}>
        <div className="w-4 h-4 border border-white/30 rounded-full" />
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar { width: 0; }
        * { cursor: none !important; }
        
        @keyframes wave {
          0%, 100% { 
            transform: translateY(0) rotate(0deg) scale(1);
          }
          25% { 
            transform: translateY(-8px) rotate(-2deg) scale(1.02);
          }
          50% { 
            transform: translateY(0) rotate(0deg) scale(1);
          }
          75% { 
            transform: translateY(8px) rotate(2deg) scale(0.98);
          }
        }
        
        @keyframes breathe {
          0%, 100% { 
            opacity: 0.9;
            letter-spacing: 0.2em;
            filter: blur(0px);
          }
          50% { 
            opacity: 1;
            letter-spacing: 0.25em;
            filter: blur(0.5px);
          }
        }
        
        @keyframes glitchCyan {
          0%, 100% { 
            transform: translate(-2px, 0);
            opacity: 0.4;
          }
          25% { 
            transform: translate(-4px, 1px);
            opacity: 0.6;
          }
          50% { 
            transform: translate(-1px, -1px);
            opacity: 0.3;
          }
          75% { 
            transform: translate(-3px, 0);
            opacity: 0.5;
          }
        }
        
        @keyframes glitchMagenta {
          0%, 100% { 
            transform: translate(2px, 0);
            opacity: 0.4;
          }
          25% { 
            transform: translate(3px, -1px);
            opacity: 0.5;
          }
          50% { 
            transform: translate(1px, 1px);
            opacity: 0.3;
          }
          75% { 
            transform: translate(4px, 0);
            opacity: 0.6;
          }
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 0.9; }
          5% { opacity: 0.85; }
          10% { opacity: 0.95; }
          15% { opacity: 0.8; }
          20% { opacity: 0.9; }
          50% { opacity: 0.95; }
          55% { opacity: 0.7; }
          60% { opacity: 0.9; }
        }
        
        @keyframes textGlow {
          0%, 100% {
            text-shadow: 
              0 0 20px rgba(255,255,255,0.3),
              0 0 40px rgba(255,255,255,0.1),
              0 0 80px rgba(255,255,255,0.05);
          }
          50% {
            text-shadow: 
              0 0 30px rgba(255,255,255,0.5),
              0 0 60px rgba(255,255,255,0.2),
              0 0 100px rgba(255,255,255,0.1);
          }
        }
      `}</style>
    </>
  );
};

export default dynamic(() => Promise.resolve(AboutPage), { ssr: false });