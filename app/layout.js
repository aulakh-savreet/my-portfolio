'use client';

import '../styles/globals.css';
import { SectionProvider } from '../components/SectionContext';
import HeaderWrapper from '../components/HeaderWrapper';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#161616] text-white">
        <SectionProvider>
          <div className="min-h-screen">
            <HeaderWrapper />
            <main className="pt-32">
              {children}
            </main>
          </div>
        </SectionProvider>
      </body>
    </html>
  );
}