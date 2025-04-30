import styles from './StatsCard.module.css';

const StatsCard = ({ title, value, icon, color, subValue }) => {
  return (
    <div className={styles.card} style={{ borderTop: `4px solid ${color}` }}>
      <div className={styles.cardHeader}>
        <span className={styles.icon}>{icon}</span>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.cardContent}>
        <p className={styles.value}>{value}</p>
        {subValue && <p className={styles.subValue}>{subValue}</p>}
      </div>
    </div>
  );
};

export default StatsCard;