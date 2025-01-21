import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      if (window.gsap) {
        window.gsap.killTweensOf('*');
        window.gsap.globalTimeline.clear();
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  return (
    <div className="relative bg-black text-white antialiased">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;