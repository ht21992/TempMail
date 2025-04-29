import './../styles/emails.css';

const EmailList = ({ emails, onSelectEmail, selectedEmailId }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="email-list-container">
      <h3 className="inbox-title">Inbox</h3>
      <div className="email-list">
        {emails.map(email => (
          <div
            key={email.id}
            className={`email-item ${selectedEmailId === email.id ? 'selected' : ''} ${!email.read ? 'unread' : ''}`}
            onClick={() => onSelectEmail(email)}
          >
            <div className="email-item-header">
              <span className="email-sender">{email.sender}</span>
              <span className="email-time">{formatTime(email.received_at)}</span>
            </div>
            <h4 className="email-subject">{email.subject}</h4>
            <p className="email-preview">{email.body.substring(0, 60)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailList;