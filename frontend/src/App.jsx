import { useState, useEffect  } from 'react';
import Header from './components/Header/Header';
import StatsSection from './components/StatsSection/StatsSection';
import EmailList from './components/EmailList/EmailList';
import EmailDetail from './components/EmailDetail/EmailDetail';
import styles from './App.module.css';
import { createTempEmail,fetchMessages,markMessageAsRead } from './services/api';
import { ClipLoader } from "react-spinners";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tempEmail, setTempEmail] = useState(null);
  const [emails, setEmails] = useState([]);
  const [color, setColor] = useState("#000fff");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [unreadCount, setUnreadCount] = useState(emails.filter(e => !e.read).length);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    markMessageAsRead(email.id)
    // Mark as read
    setEmails(emails.map(e =>
      e.id === email.id ? {...e, read: true} : e
    ));
  };

  useEffect(() => {
    setUnreadCount(emails.filter(e => !e.read).length);
  }, [emails]);


  // Create a temp email when page loads
  useEffect(() => {
    setIsLoading(true);
    createTempEmail()
      .then((res) => {
        setTempEmail(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  // Poll messages every 5 seconds
  useEffect(() => {
    if (!tempEmail) return;

    const fetchAndSetMessages = () => {
      fetchMessages(tempEmail.id)
        .then((res) => setEmails(res.data))
        .catch(console.error);
    };

    // Initial fetch
    fetchAndSetMessages();

    // Set up interval
    const interval = setInterval(fetchAndSetMessages, 5000);

    return () => clearInterval(interval);
  }, [tempEmail]);


  return (
    <div className={styles.app}>
      {!isLoading ? (<><Header email={tempEmail.address} />
      <StatsSection
        email={tempEmail.address}
        expiresAt={tempEmail.expires_at}
        emailCount={emails.length}
        unreadCount={unreadCount}
      />
      <div className={styles.inboxContainer}>
        <EmailList
          emails={emails}
          onEmailClick={handleEmailClick}
          selectedEmailId={selectedEmail?.id}
        />
        <EmailDetail email={selectedEmail} />
      </div></>) : (<>

        <input
        style={{margin:"5px auto", display:"block"}}
        type='color'
        value={color}
        onChange={(input) => setColor(input.target.value)}
      />

      <ClipLoader
        color={color}
        loading={isLoading}
        cssOverride={{margin:"auto auto", display:"block"}}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></>)}

    </div>
  );
}

export default App;