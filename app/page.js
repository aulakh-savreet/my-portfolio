'use client';

import { useSection } from '../components/SectionContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { activeSection } = useSection();

  return (
    <div className="min-h-screen bg-[#161616]">
      <main className="px-12 pt-48">
        <AnimatePresence mode="wait">
          {activeSection === 'work' ? (
            <motion.div
              key="work"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-[1200px] mx-auto"
            >
              <h1 className="text-[4rem] leading-[1.1] font-light max-w-[1000px] text-white">
                I'm passionate about creating beautiful products that{' '}
                <span className="italic text-gray-400">empower people.</span>
              </h1>
              
              <div className="mt-32">
                <p className="text-2xl text-gray-300">
                  Here's a selection of my recent work and projects.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-[1200px] mx-auto"
            >
              <div className="flex items-center gap-2 mb-12">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <span className="text-sm text-gray-500 tracking-widest">ABOUT ME</span>
              </div>

              <div className="space-y-8">
                <p className="text-2xl text-gray-300">
                  This is my story — alongside some flicks from my recent trip to Japan.
                </p>
                <div className="grid grid-cols-2 gap-12">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-900" />
                  <div className="space-y-6">
                    <h2 className="text-3xl font-light">Hi, I'm Savreet</h2>
                    <p className="text-xl text-gray-300">
                      I'm a product designer specializing in creating user-centered design solutions.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}