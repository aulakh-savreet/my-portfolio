import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className="relative bg-black text-white antialiased">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;