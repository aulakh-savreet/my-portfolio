'use client';

const WorkSection = () => {
  return (
    <div className="px-12 mt-32 max-w-[1200px] mx-auto"> {/* Added mt-32 for top spacing */}
      {/* Hero Text */}
      <h1 className="text-[4rem] leading-[1.1] font-light max-w-[1000px]">
        I'm passionate about creating beautiful products that{' '}
        <span className="italic text-gray-400">empower people.</span>
      </h1>

      {/* Work Content */}
      <div className="mt-32 space-y-16">
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
    </div>
  );
};

export default WorkSection;