export const fakeTempEmail = {
    address: "tempuser123@maildrop.cc",
    created_at: new Date(),
    expires_at: new Date(Date.now() + 3600 * 1000), // 1 hour from now
    is_active: true
  };

  export const fakeEmails = [
    {
      id: 1,
      sender: "support@service.com",
      subject: "Your account verification",
      body: "Please verify your account by clicking the link below...",
      received_at: new Date(Date.now() - 15 * 60 * 1000), // 15 mins ago
      read: true
    },
    {
      id: 2,
      sender: "newsletter@tech.com",
      subject: "Weekly tech updates",
      body: "Here are this week's top tech stories...",
      received_at: new Date(Date.now() - 45 * 60 * 1000), // 45 mins ago
      read: true
    },
    {
      id: 3,
      sender: "no-reply@social.net",
      subject: "New connection request",
      body: "You have a new connection request waiting...",
      received_at: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false
    }
  ];