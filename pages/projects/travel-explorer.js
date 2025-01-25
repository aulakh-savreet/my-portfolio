import { useRouter } from 'next/router';
import { useRef, useEffect } from 'react';

const projectData = {
  id: 'travel-explorer',
  title: 'TravelExplorer',
  subtitle: 'World Discovery Platform — December 2024',
  description: 'A comprehensive travel and country information platform',
  imageSrc: '/images/travel-explorer/hero.webp',
  details: {
    overview: `TravelExplorer delivers comprehensive country data through an intuitive card interface, featuring:

    • Detailed country cards with key statistics
    • Interactive maps with location markers
    • Real-time weather conditions
    • Regional subdivisions
    • Latest news updates`,
    
    highlights: `Key Features:
    • Interactive country search with real-time filtering
    • Detailed country profiles including flags, capitals, and demographics
    • Current weather information for capital cities
    • Responsive design optimized for all devices
    • Accessible interface following WCAG guidelines
    • Dark mode support for comfortable viewing
    • Efficient data caching for improved performance
    
    Technical Achievements:
    • Implemented efficient API data fetching with SWR
    • Achieved 95+ Performance score on Lighthouse
    • Reduced initial load time by 40% through optimization
    • Built reusable components for maintainable codebase`,
    
    context: `In an increasingly connected world, accurate and accessible information about different countries is crucial for travelers, researchers, and curious minds alike. While existing platforms often provide fragmented or outdated information, TravelExplorer was conceived to offer a modern, unified solution.

    The project aimed to create an intuitive interface that makes global information accessible to everyone, regardless of their device or accessibility needs.`,
    
    theproblem: `Common Issues with Existing Solutions:
    • Inconsistent or outdated information
    • Poor mobile responsiveness
    • Limited accessibility features
    • Slow loading times and poor performance
    • Complex, cluttered interfaces
    
    User Research Insights:
    • 78% of users wanted faster access to basic country information
    • 65% expressed frustration with non-responsive designs
    • 82% desired reliable weather information alongside country data
    • 70% needed better accessibility features`,
    
    updateflow: `Data Flow Architecture:
    1. Client-side requests trigger API calls through SWR
    2. Server-side caching reduces redundant API calls
    3. Real-time updates maintain data freshness
    4. Fallback states handle loading and errors gracefully
    
    Performance Optimizations:
    • Implemented incremental static regeneration
    • Utilized dynamic imports for code splitting
    • Optimized images with next/image
    • Employed service worker for offline capabilities`,
    
    layout: `The interface incorporates a hierarchical region selection system with state/province breakdown for major countries. The dropdown employs:

    • Alphabetically sorted regions and states
    • Clear hierarchical structure
    • Accessible keyboard navigation
    • Mobile-friendly touch targets

The overall interface follows a systematic grid system`,
    
    visualdesign: `The visual design system emphasizes clarity and accessibility:

    Color Palette:
    • Primary: #2563eb (Brand Blue)
    • Secondary: #4f46e5 (Accent Purple)
    • Background: #ffffff / #1a1a1a (Light/Dark)
    • Text: #1f2937 / #f3f4f6 (Light/Dark)

    Typography:
    • Headings: Inter (Sans-serif)
    • Body: System UI stack
    • Consistent type scale with 1.25 ratio

    Components follow atomic design principles for consistency and maintainability.`,
    
    retrospective: `Key Learnings:
    • Early accessibility consideration saved development time
    • API caching strategy significantly improved performance
    • Component-driven development enhanced maintainability
    
    Future Enhancements:
    • User authentication for personalized experiences
    • Interactive maps integration
    • Expanded country statistics
    • Travel advisory information
    • Community-driven content features`
  },
  navColor: '#2563eb',
  technologies: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'REST Countries API',
    'OpenWeather API',
    'SWR',
    'Vercel'
  ]
};

export default function TravelExplorerPage() {
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
    'Visual Design',
    'Retrospective'
  ];

  // Function to render section images
  const renderSectionImage = (section) => {
    const images = {
      overview: [
        '/images/travel-explorer/country-detail.webp', 
        '/images/travel-explorer/news-results.webp',
        '/images/travel-explorer/map-view.webp'
      ],
      highlights: '/images/travel-explorer/highlights.webp',
      theproblem: '/images/travel-explorer/problem.webp',
      updateflow: '/images/travel-explorer/flow.webp',
      layout: '/images/travel-explorer/layout.webp',
      visualdesign: '/images/travel-explorer/design.webp',
      retrospective: '/images/travel-explorer/retro.webp'
    };
   
    const sectionKey = section.toLowerCase().replace(/\s+/g, '');
    const sectionImages = images[sectionKey];
   
    if (sectionKey === 'overview') {
      return (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {sectionImages.map((src, index) => (
            <div key={index} className="relative aspect-video rounded-xl overflow-hidden">
              <img src={src} alt={`${section} view ${index + 1}`} className="w-full h-full object-cover"/>
            </div>
          ))}
        </div>
      );
    }
   
    return sectionImages ? (
      <div className="relative w-full aspect-video bg-[#1a1a1a] rounded-xl overflow-hidden mb-8">
        <img src={sectionImages} alt={`${section} visualization`} className="w-full h-full object-contain p-8" />
      </div>
    ) : null;
   };

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
          scroller: containerRef.current
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    // Background color shift on scroll
    ScrollTrigger.create({
      scroller: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(bgRef.current, {
          backgroundColor: `rgba(37, 99, 235, ${0.3 - progress * 0.2})`,
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

    window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-link');
      let currentSectionId = '';

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active-section');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active-section');
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf([containerRef.current, headerRef.current, '.animate-on-scroll']);
      navLinks.forEach(link => link.removeEventListener('click', handleNavClick));
    };
  }, []);

  useEffect(() => {
    function highlightCurrentSection() {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-link');
      let currentSectionId = '';

      sections.forEach(section => {
        const top = window.pageYOffset + section.getBoundingClientRect().top;
        const bottom = top + section.offsetHeight;
        if (window.pageYOffset >= top && window.pageYOffset < bottom) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active-nav');
        }
      });
    }

    window.addEventListener('scroll', highlightCurrentSection);
    highlightCurrentSection();
    return () => {
      window.removeEventListener('scroll', highlightCurrentSection);
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

              {/* Hero Image */}
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
                      {renderSectionImage(item)}
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
                      className="nav-link block text-sm text-gray-400 hover:text-white 
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