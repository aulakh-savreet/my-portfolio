'use client';
import React from 'react';
import styles from './Header.module.css';

const InfoSection = () => {
 return (
   <div className="w-full">
     <div className="max-w-[1200px] px-12 mx-auto">
       {/* About Me Section with white glowing dot */}
       <div className="flex items-center gap-2 mb-12">
         <div className={`${styles.glowDot} w-1.5 h-1.5 rounded-full bg-white/90`} />
         <span className="text-sm text-white/40 tracking-[0.2em] uppercase">
           ABOUT ME
         </span>
       </div>

       {/* Hero Text - Made smaller to match Perry's */}
       <h1 className="text-[4.2rem] leading-[1.15] font-[350] tracking-[-0.02em] max-w-[1000px]">
         I'm passionate about creating beautiful products that{' '}
         <span className="italic text-[#8F9094]">empower people.</span>
       </h1>

       {/* Photos Section */}
       <div className="mt-32 grid grid-cols-2 gap-8">
         {/* Large Image */}
         <div className="relative w-full h-[600px] rounded-[2rem] overflow-hidden bg-white/5">
           <div className="w-full h-full relative">
             <img 
               src="/images/photo1.webp"
               alt="Mountain view"
               className="w-full h-full object-cover"
             />
           </div>
         </div>

         {/* Right Side with Text and Second Image */}
         <div className="space-y-8">
           <p className="text-2xl text-white/80">
             This is my story — alongside some flicks from my recent trip to Kananaskis.
           </p>
           <div className="relative w-full h-[500px] rounded-[2rem] overflow-hidden bg-white/5">
             <div className="w-full h-full relative">
               <img 
                 src="/images/photo2.webp"
                 alt="Temple walkway"
                 className="w-full h-full object-cover"
               />
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
};

export default InfoSection;