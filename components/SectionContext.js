'use client';

import { createContext, useContext, useState } from 'react';

const SectionContext = createContext();

export function SectionProvider({ children }) {
  const [activeSection, setActiveSection] = useState('work');

  return (
    <SectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSection() {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error('useSection must be used within a SectionProvider');
  }
  return context;
}