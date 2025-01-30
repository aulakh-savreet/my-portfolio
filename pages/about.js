// pages/about.js

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Footer from '../components/Footer';

// -------------------  THREE + R3F + DREI + SHADER CODE  -------------------
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --- Vertex and Fragment for a visible wave + basic lambert shading ---

const vertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec2 vUv;

  void main() {
    vUv = uv;

    // Copy of the original position
    vec3 pos = position;

    // Simple wave in the Y direction for visibility
    float waveSpeed = 2.0;
    float waveFreq = 3.0;
    float waveAmp = 0.4;

    // Combine two sine waves
    pos.y += sin((pos.x * waveFreq) + (uTime * waveSpeed)) * waveAmp;
    pos.y += sin((pos.z * waveFreq) - (uTime * waveSpeed)) * waveAmp;

    // Calculate final position
    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // Transform the normal so we can do basic Lambert shading in fragment
    vNormal = normalize(normalMatrix * normal);
  }
`;

const fragmentShader = `
  varying vec3 vNormal;
  varying vec2 vUv;

  // We'll do a simple directional lighting from "above"
  void main() {
    // Hardcode a directional light vector from above (y=1)
    vec3 lightDirection = normalize(vec3(0.0, 1.0, 0.5));

    // Lambertian "diffuse" dot product
    float lightIntensity = dot(vNormal, lightDirection);

    // Base color (slightly bluish)
    vec3 baseColor = vec3(0.3, 0.6, 1.0);

    // Mix in our wave-based color variation if desired
    // For example, we can vary color slightly by vUv
    // But let's keep it simple for clarity:
    vec3 finalColor = baseColor * max(lightIntensity, 0.0);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// Create a custom material using drei's shaderMaterial helper
const WaveMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  vertexShader,
  fragmentShader
);

extend({ WaveMaterial });

// MagicalWaveBackground (used only if magicalMode is true)
function MagicalWaveBackground() {
  const matRef = useRef();

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uTime = clock.getElapsedTime();
    }
  });

  return (
    <>
      {/* A basic directional light so the wave's shading is visible */}
      <directionalLight intensity={0.7} position={[0, 5, 5]} />
      <ambientLight intensity={0.3} />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]} // Rotate so plane is horizontal
        position={[0, -0.5, 0]}       // Drop it a bit so the camera sees it
        scale={[8, 8, 1]}
      >
        {/* Higher subdivisions = smoother wave */}
        <planeGeometry args={[4, 4, 150, 150]} />
        <waveMaterial ref={matRef} />
      </mesh>
    </>
  );
}

function SceneContainer() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 3.5, 5], fov: 45 }}>
        <MagicalWaveBackground />
      </Canvas>
    </div>
  );
}

// -------------------  MAIN AboutPage COMPONENT  -------------------

function AboutPage() {
  const [magicalMode, setMagicalMode] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Refs for sections/images
  const sectionRefs = useRef([]);
  const imageRefs = useRef([]);

  // For text scramble (only used if magicalMode = true)
  const headingRef = useRef(null);

  const setSectionRef = (el, i) => {
    sectionRefs.current[i] = el;
  };
  const setImageRef = (el, i) => {
    imageRefs.current[i] = el;
  };

  // -------------------  GSAP Animations  -------------------
  useEffect(() => {
    // Only run in browser
    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Fade in sections
      sectionRefs.current.forEach((section, i) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
            },
          }
        );
      });

      // Fade in images
      imageRefs.current.forEach((img, i) => {
        gsap.fromTo(
          img,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 90%',
            },
          }
        );
      });

      // If magicalMode = true, add text scramble effect
      if (magicalMode && headingRef.current) {
        const el = headingRef.current;
        const originalText = el.textContent;
        let interval;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

        el.addEventListener('mouseenter', () => {
          let iteration = 0;
          clearInterval(interval);
          interval = setInterval(() => {
            el.textContent = originalText
              .split('')
              .map((letter, index) => {
                if (index < iteration) return originalText[index];
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join('');
            if (iteration >= originalText.length) {
              clearInterval(interval);
              el.textContent = originalText;
            }
            iteration += 0.5;
          }, 30);
        });

        el.addEventListener('mouseleave', () => {
          clearInterval(interval);
          el.textContent = originalText;
        });
      }
    })();
  }, [magicalMode]);

  // Scroll-to-top show/hide
  useEffect(() => {
    function onScroll() {
      if (window.scrollY > 400) setShowScrollTop(true);
      else setShowScrollTop(false);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // -------------------  RENDER  -------------------
  return (
    <>
      <Head>
        <title>About - {magicalMode ? 'Magical' : 'Classic'}</title>
        <meta
          name="description"
          content="A single About page that toggles between Classic and Magical mode."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* If in magicalMode, show the wavy 3D background */}
      {magicalMode && <SceneContainer />}

      {/* Scroll-to-top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-pink-600 text-white px-4 py-2 rounded-full
            shadow-md hover:bg-pink-700"
        >
          ↑ Top
        </button>
      )}

      <main
        className="relative min-h-screen w-full bg-black text-white"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {/* Toggle button for Classic/Magical */}
        <div className="flex justify-end px-6 py-4">
          <button
            onClick={() => setMagicalMode(!magicalMode)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-all"
          >
            {magicalMode ? 'Switch to Classic' : 'Switch to Magical'}
          </button>
        </div>

        {/* Hero Section */}
        <section
          ref={(el) => setSectionRef(el, 0)}
          className="flex flex-col items-center justify-center px-4 text-center"
          style={{ minHeight: '80vh' }}
        >
          <h1
            ref={magicalMode ? headingRef : null} 
            // Only attach headingRef if in magical mode (for scramble effect)
            className="text-5xl md:text-6xl font-bold mb-4 cursor-pointer"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {magicalMode ? 'Magical Waves About' : 'Classic About'}
          </h1>
          <p className="max-w-xl text-lg text-gray-300">
            {magicalMode
              ? 'Experience a wavy background and text scramble. Want simpler? Switch above!'
              : 'A simpler layout. Prefer something mesmerizing? Switch to Magical above!'}
          </p>
        </section>

        {/* Section 1 */}
        <section
          ref={(el) => setSectionRef(el, 1)}
          className="max-w-4xl mx-auto py-16 px-4"
        >
          <h2 className="text-3xl font-bold mb-6">AI & Tech</h2>
          <p className="leading-relaxed text-gray-200 mb-6">
            Whether in {magicalMode ? 'vivid illusions' : 'straightforward code'},{' '}
            I'm exploring Next.js, React, and new AI frameworks for data-driven insights.
            Each challenge is a step toward more innovative solutions.
          </p>
          <div className="relative w-full h-64">
            <img
              ref={(el) => setImageRef(el, 0)}
              src="https://picsum.photos/900/600?random=10"
              alt="Tech & AI"
              className="absolute inset-0 w-full h-full object-cover rounded-xl"
            />
          </div>
        </section>

        {/* Section 2 */}
        <section
          ref={(el) => setSectionRef(el, 2)}
          className="max-w-4xl mx-auto py-16 px-4"
        >
          <h2 className="text-3xl font-bold mb-6">Hobbies</h2>
          <p className="leading-relaxed text-gray-200 mb-6">
            Rock climbing and hiking keep me grounded. The synergy of mind and
            body—like logic and design—guides me in tackling new heights both
            literally and figuratively.
          </p>
          <div className="relative w-full h-64">
            <img
              ref={(el) => setImageRef(el, 1)}
              src="https://picsum.photos/900/600?random=11"
              alt="Hobbies"
              className="absolute inset-0 w-full h-full object-cover rounded-xl"
            />
          </div>
        </section>

        {/* Section 3 */}
        <section
          ref={(el) => setSectionRef(el, 3)}
          className="max-w-4xl mx-auto py-16 px-4"
        >
          <h2 className="text-3xl font-bold mb-6">Onward</h2>
          <p className="leading-relaxed text-gray-200 mb-6">
            From mastering frameworks to climbing rugged trails, I push forward 
            in pursuit of experiences that merge imagination with perseverance.
          </p>
          <div className="relative w-full h-64">
            <img
              ref={(el) => setImageRef(el, 2)}
              src="https://picsum.photos/900/600?random=12"
              alt="Future"
              className="absolute inset-0 w-full h-full object-cover rounded-xl"
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// Export w/ SSR disabled
export default dynamic(() => Promise.resolve(AboutPage), { ssr: false });
