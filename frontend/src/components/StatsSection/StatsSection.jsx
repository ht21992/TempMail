import StatsCard from '../StatsCard/StatsCard';
import styles from './StatsSection.module.css';

const StatsSection = ({ email, expiresAt, emailCount, unreadCount }) => {
  // Calculate time remaining
  const now = new Date();
  const expires = new Date(expiresAt);
  const timeRemaining = Math.max(0, Math.floor((expires - now) / 60000));
  const hours = Math.floor(timeRemaining / 60);
  const minutes = timeRemaining % 60;

  return (
    <section className={styles.statsSection}>
      <div className={styles.cardsContainer}>
        <StatsCard
          title="Expires In"
          value={`${hours}h ${minutes}m`}
          icon="⏳"
          color="#FF9F1C"
        />
        <StatsCard
          title="Messages"
          value={emailCount}
          icon="✉️"
          color="#3A86FF"
          subValue={`${unreadCount} unread`}
        />
        <StatsCard
          title="Status"
          value="Active"
          icon="✅"
          color="#4BB543"
        />
      </div>
    </section>
  );
};

export default StatsSection;