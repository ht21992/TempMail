import './../styles/emails.css';

const EmailViewer = ({ email }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleString();
  };

  if (!email) {
    return (
      <div className="email-viewer empty">
        <div className="empty-state">
          <h3>Select an email to read</h3>
          <p>No email selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="email-viewer">
      <div className="email-header">
        <h2 className="email-subject">{email.subject}</h2>
        <div className="email-meta">
          <span className="email-sender">{email.sender}</span>
          <span className="email-date">{formatTime(email.received_at)}</span>
        </div>
      </div>
      <div className="email-body">
        {email.body}
      </div>
    </div>
  );
};

export default EmailViewer;