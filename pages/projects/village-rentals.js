import { useRouter } from 'next/router';
import { useRef, useEffect } from 'react';

const projectData = {
  id: 'village-rentals',
  title: 'Village Rentals',
  subtitle: 'Property Rental Platform — March 2024',
  description: 'A seamless rental booking experience',
  imageSrc: '/api/placeholder/1200/600',
  details: {
    overview: 'A modern approach to village property rentals, combining traditional charm with modern convenience.',
    highlights: 'Featuring real-time availability, virtual tours, and local recommendations.',
    context: 'Developed to bridge the gap between property owners in scenic villages and travelers seeking authentic experiences.',
    theproblem: 'Traditional rental platforms often overlook the unique aspects of village properties and local experiences.',
    updateflow: 'Streamlined booking process with emphasis on property details and local culture.',
    layout: 'Intuitive grid system showcasing property features and surrounding attractions.',
    interactions: 'Smooth transitions and thoughtful micro-interactions enhance user experience.',
    visualdesign: 'Visual language inspired by rustic charm with modern UI elements.',
    finaldesigns: 'Successfully launched with positive user feedback and growing property listings.',
    retrospective: 'Continuous improvements based on user feedback and market analysis.'
  },
  navColor: '#ec4899',
  technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Supabase']
};

export default function VillageRentalsPage() {
  const router = useRouter();
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const bgRef = useRef(null);

  const navigationItems = [
    'Overview',
    'Highlights',
    'Context',
    'The Problem',
    'Update Flow',
    'Layout',
    'Interactions',
    'Visual Design',
    'Final Designs',
    'Retrospective'
  ];

  useEffect(() => {
    if (!projectData || !window.gsap) return;
    
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((st) => st.kill());

    // Initial fade in animation
    const tl = gsap.timeline();
    
    tl.from(containerRef.current, { 
      opacity: 0, 
      duration: 0.5,
      ease: 'power2.out'
    }).from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3');

    // Scroll animations for content sections
    gsap.utils.toArray('.animate-on-scroll').forEach((element) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'center center',
          toggleActions: 'play none none reverse',
          scroller: containerRef.current // Specify the scroll container
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    // Background color shift on scroll
    ScrollTrigger.create({
      scroller: containerRef.current, // Specify the scroll container
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(bgRef.current, {
          backgroundColor: `rgba(236, 72, 153, ${0.3 - progress * 0.2})`,
          duration: 0.1
        });
      }
    });

    // Add smooth scroll behavior for navigation links
    const handleNavClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          containerRef.current.scrollTo({
            top: target.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    };

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => link.addEventListener('click', handleNavClick));

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf([containerRef.current, headerRef.current, '.animate-on-scroll']);
      navLinks.forEach(link => link.removeEventListener('click', handleNavClick));
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 overflow-y-auto"
      style={{ scrollBehavior: 'smooth' }}
    >
      {/* Background gradient */}
      <div
        ref={bgRef}
        className="fixed inset-0 transition-colors duration-300 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at 50% 50%, ${projectData.navColor}4D, transparent 70%)`
        }}
      />

      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="fixed top-8 left-8 z-[60] group flex items-center gap-2 px-4 py-2 
          bg-white/5 hover:bg-white/10 rounded-lg text-white/70 hover:text-white 
          transition-all duration-300 backdrop-blur-sm border border-white/10 
          hover:border-white/20"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          className="transform transition-transform group-hover:-translate-x-0.5"
        >
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span className="text-sm font-light">Back</span>
      </button>

      {/* Main Content */}
      <div className="relative">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 pb-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            {/* Main Content Column */}
            <div className="flex-1">
              {/* Header Section */}
              <div ref={headerRef} className="py-24 mb-16">
                <h1 
                  className="text-5xl md:text-7xl font-medium mb-4 tracking-tight"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {projectData.title}
                </h1>
                <p className="text-xl text-gray-400">{projectData.subtitle}</p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-3 mt-8">
                  {projectData.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-white/10 text-white/70 rounded-md
                        border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Image */}
              <div className="animate-on-scroll relative w-full aspect-video rounded-xl overflow-hidden mb-24">
                <img
                  src={projectData.imageSrc}
                  alt={projectData.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Sections */}
              <div className="space-y-24">
                {navigationItems.map((item, index) => {
                  const key = item.toLowerCase().replace(/\s+/g, '');
                  return (
                    <section 
                      key={index} 
                      id={key}
                      className="animate-on-scroll scroll-mt-32"
                    >
                      <h2 className="text-2xl font-medium mb-8 text-white/90">{item}</h2>
                      <div className="prose prose-lg prose-invert max-w-none">
                        <p className="text-gray-400 leading-relaxed">
                          {projectData.details[key.toLowerCase()] || 'Section content coming soon...'}
                        </p>
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>

            {/* Navigation Sidebar */}
            <div className="w-48 hidden lg:block">
              <div className="sticky top-8">
                <h3 className="text-sm text-white/50 uppercase tracking-wider mb-6">
                  Navigation
                </h3>
                <nav className="space-y-4">
                  {navigationItems.map((item, index) => (
                    <a
                      key={index}
                      href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
                      className="block text-sm text-gray-400 hover:text-white 
                        transition-colors duration-300"
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
