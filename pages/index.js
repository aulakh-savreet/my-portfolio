import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import ProjectReveal from '../components/ProjectReveal';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import PixelBackground from '../components/PixelBackground';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleLoad = () => setTimeout(() => setLoading(false), 800);
    if (document.readyState === 'complete') handleLoad();
    else window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url === '/') {
        const savedScroll = sessionStorage.getItem('projectScroll');
        if (savedScroll) {
          requestAnimationFrame(() => {
            window.scrollTo(0, parseInt(savedScroll));
            sessionStorage.removeItem('projectScroll');
          });
        }
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#020617]">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="Creative portfolio showcasing digital experiences" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>


      <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
        <div className="absolute inset-0 -z-10">
          <PixelBackground />
        </div>

        <NavBar />

        <main>
          {/* Hero scrolls normally */}
          <HeroSection />

          {/* Fading “bridge” */}
          <div
            style={{
              height: '100px',
              background: 'linear-gradient(180deg, #000000, #4C1D95)'
            }}
          />

          {/* Project section will handle its own GSAP pin logic */}
          <ProjectReveal />

          {/* Normal flow continues */}
          <Contact />
        </main>

        <Footer />
      </div>

      <SpeedInsights />
      <Analytics />
    </>
  );
}
