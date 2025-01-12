// pages/index.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import ProjectReveal from '../components/ProjectReveal';
import Footer from '../components/Footer';

export default function Home() {
  // We'll track the nav color in this state
  const [navColor, setNavColor] = useState('#000');
  const [showFooter, setShowFooter] = useState(false);

  // Projects data
  const projects = [
    {
      id: 'project1',
      title: 'Design',
      description: 'A fresh perspective for modern brands.',
      imageSrc: '/api/placeholder/500/600',
      navColor: '#ff0055', // hot pink for example
    },
    {
      id: 'project2',
      title: 'Photography',
      description: 'Capturing each moment with clarity and style.',
      imageSrc: '/api/placeholder/500/600',
      navColor: '#0055ff', // bright blue
    },
    {
      id: 'about',
      title: 'About Me',
      description: 'Learn more about my journey and approach.',
      imageSrc: '/api/placeholder/500/600',
      navColor: '#333333', // dark gray
    },
  ];

  // Show footer only after scrolling past ProjectReveal
  useEffect(() => {
    const handleScroll = () => {
      const projectHeight = (projects.length + 1) * window.innerHeight;
      setShowFooter(window.scrollY >= projectHeight - window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [projects.length]);

  return (
    <>
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="Design portfolio showcasing creative work" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="relative">
        {/* NavBar stays fixed at the top */}
        <NavBar navColor={navColor} />

        {/* ProjectReveal section */}
        <ProjectReveal
          hero={<HeroSection />} 
          projects={projects}
          onColorChange={(color) => setNavColor(color)}
        />

        {/* Footer appears after ProjectReveal */}
        <div 
          className={`transition-opacity duration-500 ${
            showFooter ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Footer />
        </div>
      </main>
    </>
  );
}