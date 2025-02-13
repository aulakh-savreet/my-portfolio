import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On window load, hide loader after a short delay
    const handleWindowLoad = () => {
      setTimeout(() => setLoading(false), 700);
    };

    if (document.readyState === 'complete') {
      handleWindowLoad();
    } else {
      window.addEventListener('load', handleWindowLoad);
    }

    // --- ROUTE CHANGES ---
    const handleRouteChangeStart = () => {
      setLoading(true);
      // Kill GSAP animations if they exist
      if (window.gsap) {
        window.gsap.killTweensOf('*');
        window.gsap.globalTimeline.clear();
      }
    };
    const handleRouteChangeDone = () => {
      setTimeout(() => setLoading(false), 300);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeDone);
    router.events.on('routeChangeError', handleRouteChangeDone);

    // --- MOBILE VIEWPORT HEIGHT FIX ---
    const setVH = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);

    // --- ADD .is-mobile CLASS IF MOBILE ---
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      document.body.classList.add('is-mobile');
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', handleWindowLoad);
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeDone);
      router.events.off('routeChangeError', handleRouteChangeDone);
      window.removeEventListener('resize', setVH);
    };
  }, [router]);

  return (
    <>
      <Head>
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" 
        />
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

      {/* Shimmer overlay on load/route-change */}
      {loading && <LoadingOverlay />}

      {/* Main wrapper */}
      <div className="relative bg-black text-white antialiased min-h-screen">
        <Component {...pageProps} />
      </div>

      {/* iOS-specific style overrides */}
      <style jsx global>{`
        .is-mobile {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
        }

        .min-h-screen {
          min-height: 100vh;
          min-height: calc(var(--vh, 1vh) * 100);
        }
      `}</style>
    </>
  );
}

function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black">
      {/* Shimmering “SAV” text */}
      <div className="text-5xl font-bold text-shimmer">
        SAV
      </div>
    </div>
  );
}

export default MyApp;
