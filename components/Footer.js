'use client';

import styles from './Footer.module.css';
import Link from 'next/link';
import { useSection } from './SectionContext';

export default function Footer() {
  const { setActiveSection } = useSection();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Main</h4>
          <ul className={styles.sectionList}>
            <li>
              <button onClick={() => setActiveSection('work')} className={styles.linkButton}>
                Work
              </button>
            </li>
            <li>
              <button onClick={() => setActiveSection('info')} className={styles.linkButton}>
                Info
              </button>
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Contact</h4>
          <ul className={styles.sectionList}>
            <li>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
                LinkedIn
              </Link>
            </li>
            <li>
              <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.link}>
                Resume
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Savreet Aulakh. All rights reserved.</p>
      </div>
    </footer>
  );
}