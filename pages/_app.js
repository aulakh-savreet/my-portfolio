import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Handle route changes - cleanup GSAP animations
    const handleRouteChange = () => {
      if (window.gsap) {
        window.gsap.killTweensOf('*');
        window.gsap.globalTimeline.clear();
      }
    };

    // Handle mobile viewport height
    const setVH = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Initial call and event listeners
    setVH();
    window.addEventListener('resize', setVH);
    router.events.on('routeChangeStart', handleRouteChange);

    // Check for mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // Add class to body for mobile-specific styles
      document.body.classList.add('is-mobile');
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', setVH);
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="description" content="Portfolio showcasing creative digital experiences" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Preload critical fonts */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500&display=swap" 
          as="style"
        />
      </Head>
      
      {/* Main app wrapper */}
      <div className="relative bg-black text-white antialiased min-h-screen">
        <Component {...pageProps} />
      </div>
      
      {/* Handle any iOS-specific touch events */}
      <style jsx global>{`
        .is-mobile {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
        }
        
        /* Use custom viewport height variable */
        .min-h-screen {
          min-height: 100vh;
          min-height: calc(var(--vh, 1vh) * 100);
        }
      `}</style>
    </>
  );
}

export default MyApp;