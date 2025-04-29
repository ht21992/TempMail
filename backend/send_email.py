import smtplib
from email.mime.text import MIMEText

sender = "test@example.com"
receiver = "wawmun6djf@ymkap.com"

msg = MIMEText("This is a test email body.")
msg["Subject"] = "Test Email"
msg["From"] = sender
msg["To"] = receiver

with smtplib.SMTP("localhost", 1025) as server:
    server.sendmail(sender, [receiver], msg.as_string())

print("Email sent!")
