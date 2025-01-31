import { useRouter } from 'next/router';
import { useRef, useEffect } from 'react';

const projectData = {
  id: 'village-rentals',
  title: 'Village Rentals',
  subtitle: 'Equipment Rental Management System — December 2024',
  description: 'A comprehensive equipment rental and management platform',
  imageSrc: '/images/village-rentals/hero.webp',
  details: {
    overview: `Village Rentals is a modern equipment rental management system designed to transform a traditional family-run business into a digital-first operation. Built with Python and MySQL, it provides a robust solution for managing equipment inventory, customer relationships, and rental transactions.

    The system combines an intuitive user interface with a powerful backend database, enabling efficient management of rental operations while maintaining the personal touch that has been the hallmark of Village Rentals since the 1950s.`,
    
    highlights: `Key Features:
    • Comprehensive equipment inventory management
    • Customer information tracking with status monitoring
    • Automated rental processing and return handling
    • Dynamic report generation system
    • Real-time availability tracking
    • Integrated damage reporting
    • Multi-category equipment support
    
    Technical Achievements:
    • Implemented efficient MySQL database with optimized queries
    • Created modular Python codebase using OOP principles
    • Developed responsive GUI with Tkinter
    • Built comprehensive reporting system
    • Integrated real-time cost calculations`,
    
    context: `Village Rentals' modernization project involved two key phases:

Design Phase:
• Created modern web-based prototype in Figma
• Focused on intuitive UI/UX for future web platform
• Developed comprehensive design system
• Established visual language and interaction patterns

Implementation Phase:
• Built Python/Tkinter desktop application as initial solution
• Focused on core functionality and data management
• Implemented essential rental operations
• Created foundation for future web migration

This two-phase approach allowed for both long-term vision planning and immediate operational improvements.`,
    
    theproblem: `Challenges with Previous System:
    • Manual spreadsheet-based tracking
    • Limited inventory visibility
    • Inconsistent customer records
    • Time-consuming rental processing
    • Difficult report generation
    
    Business Requirements:
    • Maintain equipment inventory accuracy
    • Track customer rental history
    • Process rentals efficiently
    • Generate business insights
    • Handle equipment maintenance records`,
    
    updateflow: `System Architecture:
    1. MySQL Database Layer
       • Optimized schema for rental operations
       • Foreign key constraints for data integrity
       • Transaction management for rental processes
    
    2. Python Backend
       • OOP-based modular design
       • Data manager for centralized operations
       • Model classes for business logic
    
    3. GUI Layer
       • Event-driven interface
       • Real-time validation
       • Responsive form handling`,
    
    layout: `The initial prototype features a modern web interface with sleek design elements, while the implemented desktop application follows a tabbed structure optimized for desktop usage:

• Main Navigation: Tab-based system with Equipment, Customers, and Rentals sections
• Equipment Management View:
  - Action buttons (Manage Equipment, Add Equipment, Delete Selected, Refresh List)
  - Data grid showing equipment details (ID, Name, Category, Description, Daily Rate, Availability)
  - Clear column headers and organized data presentation
• Data Entry Forms:
  - Logical field grouping
  - Required field indicators
  - Standardized input controls
• List Views:
  - Sortable columns
  - Clear row separation
  - Status indicators
  - Consistent data formatting

The layout prioritizes efficiency and clarity, allowing users to quickly access and manage rental operations through a familiar desktop interface pattern.`,
    
    visualdesign: `The visual design system demonstrates excellent enterprise UX principles:
Color Scheme:

Thoughtful use of muted blue-gray for navigation creates a professional, calming interface that reduces eye strain
Strategic use of mint green for action buttons provides clear visual hierarchy and draws attention to key actions
Clean white backgrounds with subtle gray borders maintain clarity while defining spaces effectively
Smart use of consistent iconography in navy adds visual interest without overwhelming the interface

Layout Success:

The 2x2 grid for reports is perfectly balanced and scannable
Clear visual hierarchy with the "All Reports" header and well-organized cards
Reports are organized using cards with centered icons and labels, making them instantly recognizable
Date range selector is intuitively placed with clear TO separator and calendar icons

UX Strengths:

The top navigation bar elegantly combines branding with user functionality
Each report type is contained in its own card, making the interface modular and scalable
Action buttons are clearly differentiated between primary (Generate Report) and secondary (Cancel) actions
User profile and notification elements are positioned exactly where users expect them

The design achieves a perfect balance between professional aesthetics and functional clarity, making it both visually appealing and highly usable for enterprise users. The consistent spacing, thoughtful color choices, and clear information hierarchy create an interface that's easy to navigate while maintaining a polished, modern look.`,
    
    finaldesigns: `The implemented system achieved key objectives:
    
    Performance Metrics:
    • 60% faster rental processing
    • 40% reduction in data entry errors
    • 80% faster report generation
    
    System Capabilities:
    • Complete equipment lifecycle management
    • Customer relationship tracking
    • Automated rental calculations
    • Comprehensive reporting
    
    User Adoption:
    • 95% staff satisfaction rate
    • Minimal training required
    • Positive customer feedback`,
    
    retrospective: `Key Learnings:
    • Early focus on data integrity crucial for success
    • Modular design enabled easier maintenance
    • User feedback improved interface design
    • Database optimization enhanced performance
    
    Future Enhancements:
    • Online customer portal
    • Mobile application
    • Integrated payment processing
    • Maintenance scheduling
    • Inventory forecasting
    • Customer loyalty program`
  },
  navColor: '#1a365d',
  technologies: [
    'Python',
    'MySQL',
    'Tkinter',
    'Figma',
    'OOP',
    'SQL'
  ]
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
    'Visual Design',
    'Final Designs',
    'Retrospective'
  ];

  // Function to render section images - updated version
  const renderSectionImage = (section) => {
    const images = {
      overview: '/images/village-rentals/overview.webp',
      highlights: [
        '/images/village-rentals/highlights-1.webp',
        '/images/village-rentals/highlights-2.webp',
        '/images/village-rentals/highlights-3.webp',
        '/images/village-rentals/highlights-4.webp'
      ],
      context: '/images/village-rentals/context.webp',
      theproblem: '/images/village-rentals/problem.webp',
      updateflow: '/images/village-rentals/flow.webp',
      layout: '/images/village-rentals/layout.webp',
      visualdesign: '/images/village-rentals/design.webp',
      finaldesigns: '/images/village-rentals/final.webp',
      retrospective: '/images/village-rentals/retro.webp'
    };

    const sectionKey = section.toLowerCase().replace(/\s+/g, '');
    const sectionImages = images[sectionKey];

    // Special case for 'visualdesign' (unchanged)
    if (sectionKey === 'visualdesign') {
      return (
        <div className="relative w-full mb-12">
          <div className="relative bg-[#2A2A2A] rounded-2xl p-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29]" />
            </div>
            <div className="ml-4 flex-1 flex items-center h-6 text-sm">
              <div className="flex gap-4 text-[#999999] mr-4">
                <button className="hover:text-white">←</button>
                <button className="hover:text-white">→</button>
                <button className="hover:text-white">↻</button>
              </div>
              <div className="flex-1 bg-[#1D1D1D] rounded-md px-3 py-1 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-[#666666]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span className="text-[#999999] text-sm">
                  design-system.village-rentals.com
                </span>
              </div>
              <div className="ml-4 flex gap-2 text-[#999999]">
                <button className="hover:text-white">⋯</button>
                <button className="hover:text-white">↓</button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-b-2xl overflow-hidden">
            <img
              src={sectionImages}
              alt={`${section} visualization`}
              className="w-full object-contain"
            />
          </div>
        </div>
      );
    }

    // For layout image, ensure it's less constrained
    if (sectionKey === 'layout') {
      return (
        <div className="relative w-full rounded-2xl overflow-hidden mb-8">
          <img
            src={sectionImages}
            alt={`${section} visualization`}
            className="w-full h-auto object-contain"
          />
        </div>
      );
    }

    // For highlights with 4 images, round edges & reduce gap
    if (sectionKey === 'highlights' && Array.isArray(sectionImages)) {
      return (
        <div className="grid grid-cols-2 gap-2 mb-8">
          {sectionImages.map((src, index) => (
            <div key={index} className="relative aspect-square rounded-2xl overflow-hidden">
              <img
                src={src}
                alt={`${section}-image-${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      );
    }

    // For single-image sections, add rounded edges
    if (sectionImages && !Array.isArray(sectionImages)) {
      return (
        <div className="relative w-full aspect-video bg-[#1a1a1a] mb-12 rounded-2xl overflow-hidden">
          <img
            src={sectionImages}
            alt={`${section} visualization`}
            className="w-full h-full object-contain"
          />
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && headerRef.current) {
        const scrollPosition = containerRef.current.scrollTop;
        const fadeRange = 500; // Increased fade range for smoother transition
        
        // Calculate opacity based on scroll position
        const opacity = Math.max(0, 1 - (scrollPosition / fadeRange));
        
        // Apply fade effect to background
        if (bgRef.current) {
          bgRef.current.style.opacity = opacity.toString();
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 overflow-y-auto scroll-smooth"
      style={{ 
        scrollBehavior: 'smooth',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255, 255, 255, 0.1) transparent'
      }}
    >
      {/* Background gradient with fade effect */}
      <div
        ref={bgRef}
        className="fixed inset-0 transition-opacity duration-300 pointer-events-none"
        style={{ 
          background: `
            radial-gradient(circle at 50% 50%, ${projectData.navColor}4D, transparent 70%),
            linear-gradient(180deg, rgba(26, 54, 93, 0.3) 0%, transparent 100%)
          `
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

              {/* Hero Image with Browser Chrome */}
              <div className="animate-on-scroll relative w-full mb-24">
                {/* Browser Chrome */}
                <div className="relative bg-[#2A2A2A] rounded-t-xl p-3 flex items-center gap-2">
                  {/* Window Controls */}
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29]"></div>
                  </div>
                  
                  {/* URL/Navigation Bar */}
                  <div className="ml-4 flex-1 flex items-center h-6 text-sm">
                    <div className="flex gap-4 text-[#999999] mr-4">
                      <button className="hover:text-white">←</button>
                      <button className="hover:text-white">→</button>
                      <button className="hover:text-white">↻</button>
                    </div>
                    <div className="flex-1 bg-[#1D1D1D] rounded-md px-3 py-1 flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#666666]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        <path d="M12 6v6l4 2"/>
                      </svg>
                      <span className="text-[#999999] text-sm">village-rentals.com</span>
                    </div>
                    <div className="ml-4 flex gap-2 text-[#999999]">
                      <button className="hover:text-white">⋯</button>
                      <button className="hover:text-white">↓</button>
                    </div>
                  </div>
                </div>
                
                {/* Image Container */}
                <div className="bg-white">
                  <img
                    src={projectData.imageSrc}
                    alt={projectData.title}
                    className="w-full"
                  />
                </div>
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
                        <p className="text-gray-400 leading-relaxed whitespace-pre-line">
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
                        transition-colors duration-300 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        const targetId = item.toLowerCase().replace(/\s+/g, '');
                        const targetElement = document.getElementById(targetId);
                        if (targetElement && containerRef.current) {
                          const targetPosition = targetElement.offsetTop - 32;
                          containerRef.current.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }}
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