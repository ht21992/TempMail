import smtplib
from email.mime.text import MIMEText

sender = "test@example.com"
receiver = "kio7abx9w9@ebscw.com"

msg = MIMEText("This is a test email body.")
msg["Subject"] = "New Email"
msg["From"] = sender
msg["To"] = receiver

with smtplib.SMTP("localhost", 1025) as server:
    server.sendmail(sender, [receiver], msg.as_string())

print("Email sent!")
