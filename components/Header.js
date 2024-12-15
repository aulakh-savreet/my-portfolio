'use client';

import React from 'react';
import { useSection } from './SectionContext';
import Link from 'next/link';
import { HiArrowUpRight } from 'react-icons/hi2';
import styles from './Header.module.css';

const navItems = ['info', 'work'];

const Header = () => {
  const { activeSection, setActiveSection } = useSection();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.name}>Savreet Aulakh</h1>
        <p className={styles.subtitle}>Software Developer</p>
      </div>

      <div className={styles.centerNav}>
        <div className={styles.navGroup}>
          {navItems.map((item) => (
            <button
              key={item}
              className={`${styles.navButton} ${activeSection === item ? styles.active : ''}`}
              onClick={() => setActiveSection(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              {activeSection === item && <span className={styles.indicator} />}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
          LinkedIn <HiArrowUpRight size={12} />
        </Link>
        <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
          Resume <HiArrowUpRight size={12} />
        </Link>
      </div>
    </header>
  );
};

export default Header;