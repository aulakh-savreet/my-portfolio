// pages/index.js
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import ProjectReveal from '../components/ProjectReveal';
import Footer from '../components/Footer';

export default function Home() {
  const [navColor, setNavColor] = useState('#000');
  const [loading, setLoading] = useState(true);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const heroRef = useRef(null);

  const projects = [
    {
      id: 'travel-explorers',
      title: 'TravelExplorer',
      description: 'A comprehensive travel and country information platform',
      imageSrc: '/api/placeholder/1200/800',
      details: 'Explore detailed information about countries worldwide...',
      navColor: '#ff0055',
    },
    {
      id: 'project2',
      title: 'Project 2',
      description: 'Revolutionizing user experiences through motion and interaction.',
      imageSrc: '/api/placeholder/1200/800',
      navColor: '#6366f1',
    },
    {
      id: 'project3',
      title: 'Project 3',
      description: 'Exploring the future of digital experiences and interactions.',
      imageSrc: '/api/placeholder/1200/800',
      navColor: '#ec4899',
    },
  ];

  useEffect(() => {
    function handleLoad() {
      setTimeout(() => setLoading(false), 800);
    }

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Handle hero visibility based on scroll
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsHeroVisible(scrollPosition < windowHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
        <meta name="description" content="Design portfolio showcasing creative work" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="relative bg-[#020617]">
        {/* Navigation */}
        <NavBar navColor={navColor} />

        {/* Hero Section */}
        <div 
          ref={heroRef} 
          className="relative"
          style={{ 
            visibility: isHeroVisible ? 'visible' : 'hidden',
            zIndex: isHeroVisible ? 10 : -1 
          }}
        >
          <HeroSection />
        </div>

        {/* Content Sections */}
        <div className="relative z-20">
          {/* Projects Section */}
          <ProjectReveal 
            projects={projects} 
            onColorChange={setNavColor}
          />

          {/* Footer */}
          <Footer />
        </div>
      </main>
    </>
  );
}