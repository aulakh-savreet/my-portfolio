'use client';

import { useEffect, useState } from 'react';
import Header from './Header';

export default function HeaderWrapper() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="h-16" />;
  }

  return <Header />;
}