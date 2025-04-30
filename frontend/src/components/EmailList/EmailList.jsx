import { useState } from 'react';
import styles from './EmailList.module.css';

const EmailList = ({ emails, onEmailClick, selectedEmailId }) => {
  const [hoveredEmail, setHoveredEmail] = useState(null);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const getSenderInitials = (sender) => {
    const parts = sender.split('@')[0].split(/[._-]/);
    return parts.length > 1
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : sender.substring(0, 2).toUpperCase();
  };

  const getSenderColor = (sender) => {
    // Generate consistent color based on sender
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#A37EBA',
      '#FFA07A', '#98D8C8', '#F06292', '#7986CB'
    ];
    const hash = sender.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return colors[hash % colors.length];
  };

  return (
    <div className={styles.emailList}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2>Inbox</h2>
          <span className={styles.countBadge}>{emails.length}</span>
        </div>
      </div>

      <div className={styles.listContainer}>
        {emails.map((email) => (
          <div
            key={email.id}
            className={`${styles.emailItem} ${selectedEmailId === email.id ? styles.selected : ''}`}
            onClick={() => onEmailClick(email)}
            onMouseEnter={() => setHoveredEmail(email.id)}
            onMouseLeave={() => setHoveredEmail(null)}
          >
            <div className={styles.avatar} style={{ backgroundColor: getSenderColor(email.sender) }}>
              {getSenderInitials(email.sender)}
              {!email.read && <div className={styles.unreadDot} />}
            </div>

            <div className={styles.emailContent}>
              <div className={styles.emailHeader}>
                <div className={styles.senderRow}>
                  <span className={`${styles.sender} ${!email.read ? styles.unread : ''}`}>
                    {email.sender.split('@')[0]}
                  </span>
                  <span className={styles.time}>{formatTime(email.received_at)}</span>
                </div>
                <h3 className={`${styles.subject} ${!email.read ? styles.unread : ''}`}>
                  {email.subject}
                </h3>
              </div>

              <p className={styles.preview}>
                {email.body.substring(0, 120)}...
              </p>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailList;