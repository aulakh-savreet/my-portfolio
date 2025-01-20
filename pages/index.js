// pages/index.js
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import ProjectReveal from '../components/ProjectReveal';
import Footer from '../components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const mainRef = useRef(null);
  const [navColor, setNavColor] = useState('#000');

  useEffect(() => {
    function handleLoad() {
      setTimeout(() => setLoading(false), 800);
    }

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Initialize GSAP ScrollTrigger
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    
    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      // Kill any existing ScrollTriggers
      ScrollTrigger.getAll().forEach(t => t.kill());

      // Main scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            // Change navigation color based on scroll progress
            const progress = self.progress;
            if (progress > 0.5) {
              setNavColor('#1e1b4b'); // Change to projects section color
            } else {
              setNavColor('#000'); // Hero section color
            }
          }
        }
      });

      // Clean up on component unmount
      return () => {
        window.removeEventListener('load', handleLoad);
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#020617]">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative bg-black min-h-screen overflow-hidden">
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="Creative portfolio showcasing digital experiences" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Fixed Navigation */}
      <NavBar navColor={navColor} />

      {/* Main Content */}
      <main 
        ref={mainRef} 
        className="relative bg-[#020617]"
        style={{ height: '100vh' }}
      >
        {/* Hero Section - Initial view */}
        <div 
          className="relative w-full h-screen"
          style={{ zIndex: 20 }}
        >
          <HeroSection />
        </div>

        {/* Projects Section - Slides up on scroll */}
        <ProjectReveal />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}