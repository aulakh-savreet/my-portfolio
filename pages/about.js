import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

const AboutPage = () => {
  useEffect(() => {
    gsap.from('.construction-text', {
      opacity: 0,
      y: 30,
      duration: 1.5,
      ease: "power2.out"
    });
  }, []);

  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <h1 className="construction-text text-4xl md:text-6xl text-white font-light">
        Under Construction
      </h1>
    </div>
  );
};

export default dynamic(() => Promise.resolve(AboutPage), { ssr: false });
