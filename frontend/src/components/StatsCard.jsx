import './../styles/stats.css';




const StatsCards = ({ tempEmail, emailCount }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTimeLeft = () => {

    const now = new Date();
    const expires = new Date(tempEmail.expires_at);
    const diff = expires - now;
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>Expires in</h3>
        <p className="stat-value">{getTimeLeft()}</p>
      </div>

      <div className="stat-card">
        <h3>Messages</h3>
        <p className="stat-value">{emailCount}</p>
      </div>

      <div className="stat-card">
        <h3>Status</h3>
        {/* <p className={`stat-value ${tempEmail.is_active ? 'active' : 'inactive'}`}>
          {tempEmail.is_active ? 'Active' : 'Inactive'}
        </p> */}
        <p className={`stat-value active`}>
          Active
        </p>
      </div>
    </div>
  );
};

export default StatsCards;