const Info = () => {
    return (
      <div className="space-y-16">
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
    );
  };
  
  export default Info;