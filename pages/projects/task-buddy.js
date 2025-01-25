import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

const projectData = {
  id: 'task-buddy',
  title: 'TaskBuddy',
  subtitle: 'Next Generation Task Management — June 2023',
  description: 'Figma-based Kanban task management with real-time collaboration',
  imageSrc: '/images/task-buddy/main.webp',
  details: {
    overview: `TaskBuddy streamlines task management through an intuitive Kanban interface. The Figma-based design system ensures consistency across boards, cards, and collaborative features.`,
    
    highlights: `Features:
    • Drag-and-drop Kanban board layout
    • Custom task card components  
    • Team collaboration spaces
    • Real-time status updates
    • Mobile-responsive design
    • Dark/light theme support`,
    
    theproblem: `Challenges Addressed:
    • Complex task organization
    • Team visibility & coordination  
    • Status tracking across projects
    • Mobile accessibility
    • Cross-platform consistency`,
    
    updateflow: `Design Structure:
    • Component-based architecture
    • Reusable design tokens
    • Auto-layout patterns
    • Responsive constraints
    • Interaction states`,
    
    layout: `Interface Design:
    • Kanban board grid system
    • Collapsible list views
    • Modal task details
    • Responsive breakpoints
    • Mobile navigation`,
    
    visualdesign: `Design System:
    • Colors: Primary #0EA5E9, Dark #0F172A
    • Typography: Inter font family
    • Component library
    • Icon system
    • UI patterns`,
 
    retrospective: `Next Steps:
    • Enhanced mobile layouts
    • Timeline views
    • Analytics dashboard
    • Team management
    • Template system`
  },
  navColor: '#0EA5E9',
  technologies: [
    'Figma', 
    'Auto-layout',
    'Components',
    'Variants',
    'Design Tokens',
    'Prototyping'
  ]
 };

const navigationItems = [
  'Overview',
  'Highlights',
  'The Problem',
  'Update Flow',
  'Layout',
  'Visual Design',
  'Retrospective'
];

// Copy the image rendering logic from TravelExplorer
const renderSectionImage = (section) => {
  const images = {
    overview: [
      '/images/task-buddy/overview-1.webp',
      '/images/task-buddy/overview-2.webp',
      '/images/task-buddy/overview-3.webp'
    ],
    highlights: '/images/task-buddy/highlights.webp',
    theproblem: '/images/task-buddy/problem.webp',
    updateflow: '/images/task-buddy/update-flow.webp',
    layout: '/images/task-buddy/layout.webp',
    visualdesign: [
      '/images/task-buddy/visual-design-1.webp',
      '/images/task-buddy/visual-design-2.webp',
      '/images/task-buddy/visual-design-3.webp',
      '/images/task-buddy/visual-design-4.webp'
    ],
    retrospective: '/images/task-buddy/retrospective.webp'
  };

  const sectionKey = section.toLowerCase().replace(/\s+/g, '');
  const sectionImages = images[sectionKey];

  // Render multiple images if we have an array (e.g., overview or visualdesign)
  if (
    (sectionKey === 'overview' || sectionKey === 'visualdesign') &&
    Array.isArray(sectionImages)
  ) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {sectionImages.map((src, index) => (
          <div key={index} className="relative rounded-xl overflow-hidden">
            <img
              src={src}
              alt={`${section} - ${index + 1}`}
              className="w-full h-auto object-contain"
            />
          </div>
        ))}
      </div>
    );
  }

  // Render a single image otherwise
  return sectionImages ? (
    <div className="relative w-full rounded-xl overflow-hidden mb-8">
      <img
        src={sectionImages}
        alt={`${section} visualization`}
        className="w-full h-auto object-contain"
      />
    </div>
  ) : null;
};

export default function TaskBuddyPage() {
  const router = useRouter();
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    if (!projectData || !window.gsap) return;
    
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    // Clear existing triggers
    ScrollTrigger.getAll().forEach((st) => st.kill());

    // Initial fade in
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

    // Animate content sections
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

    // Background color shift
    ScrollTrigger.create({
      scroller: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(bgRef.current, {
          backgroundColor: `rgba(14, 165, 233, ${0.3 - progress * 0.2})`,
          duration: 0.1
        });
      }
    });

    // Navigation clicks
    const handleNavClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const targetEl = document.querySelector(href);
        if (targetEl && containerRef.current) {
          const offsetTop = targetEl.offsetTop;
          containerRef.current.scrollTo({
            top: offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    };

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => link.addEventListener('click', handleNavClick));

    // Highlight current section
    window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-link');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionId = section.id;
        if (rect.top >= 0 && rect.top < window.innerHeight * 0.4) {
          navLinks.forEach((link) => {
            link.classList.toggle('text-white', link.hash === `#${sectionId}`);
          });
        }
      });
    });

    return () => {
      navLinks.forEach(link => link.removeEventListener('click', handleNavClick));
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  useEffect(() => {
    function highlightCurrentSection() {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-link');
      let currentSectionId = '';
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.5 && rect.bottom >= 0) {
          currentSectionId = section.id;
        }
      });
      navLinks.forEach(link => {
        link.classList.toggle('text-white', link.hash === `#${currentSectionId}`);
      });
    }
    window.addEventListener('scroll', highlightCurrentSection);
    highlightCurrentSection();
    return () => window.removeEventListener('scroll', highlightCurrentSection);
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
                          {projectData.details[key] || 'Section content coming soon...'}
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