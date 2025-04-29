import { useState,useEffect } from 'react';
import Header from './components/Header';
import StatsCards from "./components/StatsCard";
import EmailViewer from './components/EmailViewer';
import EmailList from "./components/EmailList";
import { createTempEmail,fetchMessages } from './services/api';
import './styles/global.css';

function App() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [tempEmail, setTempEmail] = useState(null);
  const [emails, setEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


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


  const handleSelectEmail = (email) => {
    // Mark as read when selected
    if (!email.read) {
      const updatedEmails = emails.map(e =>
        e.id === email.id ? { ...e, read: true } : e
      );
      setEmails(updatedEmails);
    }
    setSelectedEmail(email);
  };

  return (
    <div className="app">
      {tempEmail && (<><Header tempEmail={tempEmail} />

<StatsCards
  tempEmail={tempEmail}
  emailCount={emails.length}
/>

<div className="main-content">
  <EmailList
    emails={emails}
    onSelectEmail={handleSelectEmail}
    selectedEmailId={selectedEmail?.id}
  />
  <EmailViewer email={selectedEmail} />
</div></> )}

    </div>
  );
}

export default App;