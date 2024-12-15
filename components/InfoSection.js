'use client';

const InfoSection = () => {
  return (
    <div className="px-12 mt-32 max-w-[1200px] mx-auto"> {/* Added mt-32 for top spacing */}
      {/* About Me Section */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <span className="text-sm text-gray-500 tracking-widest">ABOUT ME</span>
      </div>

      {/* Info Content */}
      <div className="space-y-16">
        {/* Story Section */}
        <div className="space-y-6">
          <p className="text-2xl text-gray-300">
            This is my story — alongside some flicks from my recent trip to Japan.
          </p>
        </div>

        {/* Bio Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-light">Hi, I'm Savreet</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            I'm a product designer specializing in creating user-centered design solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;