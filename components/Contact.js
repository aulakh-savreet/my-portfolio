import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, Instagram, ArrowUpRight, CheckCircle, XCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    gsap.from('.contact-animate', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/aulakh-savreet',
      hoverColor: 'hover:bg-[#333333]'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/savreet-aulakh',
      hoverColor: 'hover:bg-[#0077B5]'
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:aulakh.savreet@gmail.com',
      hoverColor: 'hover:bg-[#EA4335]'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://www.instagram.com/savreeet__/',
      hoverColor: 'hover:bg-[#E4405F]'
    }
  ];

  return (
    <section 
      id="Contact" 
      ref={containerRef}
      className="relative min-h-screen bg-black flex items-center py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black" />

      <div className="relative container mx-auto px-8 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 contact-animate">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Let's Connect
            </h2>
            <p className="text-gray-400 text-lg">
              Have a project in mind or just want to chat? Feel free to reach out!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="contact-animate">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg 
                      text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 
                      focus:ring-purple-500/50 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg 
                      text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 
                      focus:ring-purple-500/50 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <textarea
                    placeholder="Your message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg 
                      text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 
                      focus:ring-purple-500/50 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-white text-black rounded-lg font-medium 
                    hover:bg-white/90 transition-all flex items-center justify-center gap-2
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <ArrowUpRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <p>Message sent successfully! I'll get back to you soon.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
                    <XCircle className="w-5 h-5" />
                    <p>Something went wrong. Please try again.</p>
                  </div>
                )}
              </form>
            </div>

            <div className="space-y-8 contact-animate">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
                <h3 className="text-xl font-medium mb-6 text-white">Get in touch</h3>
                <div className="space-y-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 p-4 rounded-lg bg-white/5 
                        ${link.hoverColor} transition-all group`}
                    >
                      <link.icon className="w-5 h-5 text-white/70 group-hover:text-white" />
                      <span className="text-white/70 group-hover:text-white">
                        {link.name}
                      </span>
                      <ArrowUpRight className="w-4 h-4 ml-auto text-white/70 
                        group-hover:text-white transform group-hover:translate-x-0.5 
                        group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
                <h3 className="text-xl font-medium mb-4 text-white">Location</h3>
                <p className="text-gray-400">
                  Based in Calgary, AB
                  <br />
                  Available for remote work worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
