import React, { useEffect, useRef } from 'react';

const PixelBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', setCanvasSize);
    setCanvasSize();

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        
        // Increased size ranges
        this.size = Math.random() < 0.9 
          ? Math.random() * 1.5 + 0.5  // 90% are small but visible
          : Math.random() * 2.5 + 1;   // 10% are notably larger
        
        // Increased opacity ranges
        this.opacity = Math.random() < 0.85
          ? Math.random() * 0.5 + 0.2  // 85% medium opacity
          : Math.random() * 0.8 + 0.4; // 15% higher opacity
        
        this.speed = Math.random() * 0.08 + 0.02; // Slightly faster movement
        
        // More pronounced color variation
        const hue = Math.random() < 0.92
          ? 255  // 92% white
          : 220 + Math.random() * 35; // 8% slight blue tint
          
        this.color = `rgba(${hue}, ${hue}, 255, ${this.opacity})`;
      }

      update() {
        this.y -= this.speed;
        this.x += Math.sin(this.y * 0.01) * 0.1;
        
        if (this.y < 0) {
          this.y = canvas.height;
          this.reset();
        }
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    // Create more particles
    const createParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 12000); // Increased density
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // Animation loop
    const animate = () => {
      // Create gradient for background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(26, 11, 46, 0.2)');   // Dark purple
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');      // Black
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[15]"
      style={{ 
        opacity: 0.7, // Increased overall opacity
        mixBlendMode: 'screen',
        pointerEvents: 'none'
      }}
    />
  );
};

export default PixelBackground;