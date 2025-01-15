// components/ProjectReveal.js
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Globe, ArrowUpRight, Sparkles } from 'lucide-react';

export default function ProjectReveal({ projects = [], onColorChange }) {
  const containerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Clean up existing ScrollTriggers
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const projectCards = gsap.utils.toArray('.project-card');
    const contents = gsap.utils.toArray('.content-wrapper');

    // Reset initial states
    gsap.set(projectCards, {
      yPercent: 100,
      opacity: 0,
      scale: 0.8,
    });

    gsap.set(contents, {
      opacity: 0,
      y: 50,
    });

    // Create timeline for projects
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * projects.length}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(
            Math.floor(progress * projects.length),
            projects.length - 1
          );
          if (onColorChange && projects[index]) {
            onColorChange('#000000');
          }
        }
      }
    });

    // Animate each project
    projectCards.forEach((card, i) => {
      const content = contents[i];

      // Project enter
      tl.to(card, {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      }, i)
      
      // Content fade in
      .to(content, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      }, i + 0.1)
      
      // Hold state
      .to({}, { duration: 0.5 })
      
      // Project exit
      .to([card, content], {
        yPercent: -30,
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: 'power2.in'
      }, i + 1);
    });

    // Add hover effects
    projectCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        if (!card.isAnimating) {
          gsap.to(card, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        if (!card.isAnimating) {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [projects, onColorChange]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#020617]"
    >
      {projects.map((project) => (
        <div
          key={project.id}
          className="project-card absolute w-full h-screen overflow-hidden opacity-0"
        >
          <div className="h-full flex items-center justify-center p-8 md:p-16">
            <div className="content-wrapper relative w-full max-w-6xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-xl overflow-hidden transform-gpu">
              {/* Browser Frame */}
              <div className="bg-[#1A2332]/90 backdrop-blur-xl px-4 py-2.5 flex items-center gap-3 border-b border-indigo-500/20">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A0F1B]/50 border border-indigo-500/20">
                    <Globe size={12} className="text-indigo-400" />
                    <span className="text-xs text-indigo-300">project.demo.app</span>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div
                className="relative aspect-video cursor-pointer group"
                onClick={() => router.push(`/projects/${project.id}`)}
              >
                <img
                  src={project.imageSrc}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 via-[#0f172a]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-end justify-between">
                      <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles className="text-indigo-400" size={20} />
                          <span className="text-indigo-400 text-sm font-medium">
                            Featured Project
                          </span>
                        </div>
                        <h3 className="text-white text-4xl font-bold mb-4">
                          {project.title}
                        </h3>
                        <p className="text-indigo-200 text-base max-w-xl">
                          {project.description}
                        </p>
                      </div>

                      <button className="group/btn bg-indigo-500 text-white rounded-full p-4 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 hover:bg-indigo-400">
                        <ArrowUpRight
                          size={24}
                          className="transform transition-transform duration-300 group-hover/btn:rotate-45"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}