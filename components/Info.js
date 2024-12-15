const Info = () => {
  return (
    <div className="max-w-[1200px] mx-auto"> {/* Main container */}
      <div className="px-12"> {/* Side padding container */}
        {/* About Me marker */}
        <div className="flex items-center gap-2 mb-12">
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="text-sm text-gray-500 tracking-widest">ABOUT ME</span>
        </div>

        {/* Story text */}
        <p className="text-2xl text-gray-300 mb-16">
          This is my story — alongside some flicks from my recent trip to Japan.
        </p>

        {/* Grid section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-light">Hi, I'm Savreet</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              I'm a product designer based in [Your Location]. With [X] years of experience,
              I specialize in creating user-centered design solutions that make a difference.
            </p>
            <div className="space-y-4">
              <h3 className="text-xl font-light">Experience</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Senior Product Designer at [Company]</li>
                <li>• UX Designer at [Company]</li>
                <li>• Design Intern at [Company]</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;