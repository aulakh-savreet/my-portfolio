'use client';

import { useSection } from '../components/SectionContext';
import { motion, AnimatePresence } from 'framer-motion';
import InfoSection from '../components/InfoSection';

export default function Home() {
  const { activeSection } = useSection();

  return (
    <div className="min-h-screen bg-[#161616]">
      <main className="max-w-[1200px] mx-auto px-12 pt-16">
        <AnimatePresence mode="wait">
          {activeSection === 'work' ? (
            <motion.div
              key="work"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mt-32">
                <p className="text-2xl text-gray-300">
                  Here's a selection of my recent work and projects.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 w-full max-w-md mx-auto" />
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 w-full max-w-md mx-auto" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <InfoSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}