// pages/index.js
import React from 'react';
import Head from 'next/head';
import HeroSection from '../components/HeroSection';
import ProjectReveal from '../components/ProjectReveal';

export default function Home() {
  const projects = [
    {
      id: 'project1',
      title: 'Project One',
      description: 'Innovative design solutions for modern brands.',
      imageSrc: '/api/placeholder/500/600',
    },
    {
      id: 'project2',
      title: 'Project Two',
      description: 'Capturing moments that tell your story.',
      imageSrc: '/api/placeholder/500/600',
    },
    {
      id: 'about',
      title: 'About Me',
      description: 'Learn more about my journey and approach.',
      imageSrc: '/api/placeholder/500/600',
    },
  ];

  return (
    <>
      <Head>
        <title>Portfolio</title>
      </Head>

      <ProjectReveal
        hero={<HeroSection />} 
        projects={projects}
      />
    </>
  );
}
