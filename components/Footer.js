// components/Footer.js

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Savreet Aulalkh. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
