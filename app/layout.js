'use client';

import '../styles/globals.css';
import { SectionProvider } from '../components/SectionContext';
import HeaderWrapper from '../components/HeaderWrapper';
import Footer from '../components/Footer';  // Make sure Footer is properly imported

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#161616] text-white">
        <SectionProvider>
          <div className="min-h-screen flex flex-col">
            <HeaderWrapper />
            <main className="flex-grow max-w-[1200px] mx-auto px-12 pt-48">
              {children}
            </main>
            <Footer />
          </div>
        </SectionProvider>
      </body>
    </html>
  );
}
