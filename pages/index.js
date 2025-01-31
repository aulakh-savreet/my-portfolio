import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react"
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import ProjectReveal from '../components/ProjectReveal';
import Footer from '../components/Footer';
import Contact from '../components/Contact';


export default function Home() {
  const [loading, setLoading] = useState(true);
  const mainRef = useRef(null);
  const [navColor, setNavColor] = useState('#000');
  const router = useRouter();

  useEffect(() => {
    const handleLoad = () => setTimeout(() => setLoading(false), 800);
    
    if (document.readyState === 'complete') handleLoad();
    else window.addEventListener('load', handleLoad);

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.getAll().forEach(t => t.kill());

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;
            setNavColor(progress > 0.5 ? '#1e1b4b' : '#000');
          }
        }
      });

      return () => {
        window.removeEventListener('load', handleLoad);
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }
  }, []);

  // Enhanced scroll restoration
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
      <div className="relative bg-black min-h-screen overflow-hidden">
        <Head>
          <title>Portfolio</title>
          <meta name="description" content="Creative portfolio showcasing digital experiences" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <NavBar navColor={navColor} />
        <SpeedInsights />

        <main ref={mainRef} className="relative bg-[#020617]" style={{ height: '100vh' }}>
          <div className="relative w-full h-screen" style={{ zIndex: 20 }}>
            <HeroSection />
          </div>
          <ProjectReveal />
        </main>
        <Contact />
        <Footer />
      </div>
      <Analytics />
    </>
  );
}