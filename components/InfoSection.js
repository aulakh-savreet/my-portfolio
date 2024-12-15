'use client';

import React from 'react';

const InfoSection = () => {
  return (
    <div className="w-full">
      <div className="max-w-[1200px] px-12 mx-auto">
        {/* About Me Section */}
        <div className="flex items-center gap-2 mb-12 justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="text-sm text-white/40 tracking-[0.2em] uppercase">
            ABOUT ME
          </span>
        </div>

        {/* Story Section */}
        <div className="space-y-16 text-center">
          <p className="text-2xl text-white/80">
            This is my story — alongside some flicks from my recent trip to Japan.
          </p>

          {/* Bio Section */}
          <div className="flex flex-col items-center gap-12">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 w-full max-w-md" />
            <div className="space-y-6 max-w-lg">
              <h2 className="text-3xl font-[350]">Hi, I'm Savreet</h2>
              <p className="text-xl text-white/80 leading-relaxed">
                I'm a product designer specializing in creating user-centered design solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;