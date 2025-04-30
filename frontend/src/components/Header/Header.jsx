import { useState } from 'react';
import styles from './Header.module.css';

const Header = ({ email }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h4 className={styles.logo}>Temp Mail</h4>
        <div className={styles.emailContainer}>
          <span className={styles.email}>{email}</span>
          <button
            className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;