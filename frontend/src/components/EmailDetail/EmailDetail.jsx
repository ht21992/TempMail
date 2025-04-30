import { useState } from 'react';
import styles from './EmailDetail.module.css';

const EmailDetail = ({ email }) => {


  if (!email) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIllustration}>
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#DADCE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 6L12 13L2 6" stroke="#DADCE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3>No message selected</h3>
        <p>Choose an email from the list to view its contents</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSenderInitials = (sender) => {
    const parts = sender.split('@')[0].split(/[._-]/);
    return parts.length > 1
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : sender.substring(0, 2).toUpperCase();
  };

  const getSenderColor = (sender) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#A37EBA', '#FFA07A'];
    const hash = sender.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return colors[hash % colors.length];
  };

  return (
    <div className={styles.emailDetail}>
      <div className={styles.emailHeader}>
        <div className={styles.headerTop}>
          <h2 className={styles.subject}>{email.subject}</h2>
        </div>

        <div className={styles.senderInfo}>
          <div
            className={styles.senderAvatar}
            style={{ backgroundColor: getSenderColor(email.sender) }}
          >
            {getSenderInitials(email.sender)}
          </div>
          <div className={styles.senderDetails}>
            <div className={styles.senderName}>{email.sender}</div>
            <div className={styles.metaInfo}>
              <span className={styles.senderEmail}>to me</span>
              <span className={styles.date}>{formatDate(email.received_at)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.emailBody}>
        <div className={styles.bodyContent}>
          <p>{email.body}</p>
          <p className={styles.bodyContinued}>
            {Array(5).fill(email.body).join(' ')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;