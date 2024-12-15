const Work = () => {
    return (
      <div className="space-y-16">
        <p className="text-2xl text-gray-300 leading-relaxed">
          Here's a selection of my recent work and projects.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-900 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 group-hover:opacity-80 transition-opacity" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-2xl font-light mb-2">Project 1</h3>
              <p className="text-gray-300">Description of the project</p>
            </div>
          </div>
          
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-900 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 group-hover:opacity-80 transition-opacity" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-2xl font-light mb-2">Project 2</h3>
              <p className="text-gray-300">Description of the project</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Work;