import smtplib
from email.mime.text import MIMEText

sender = "test@example.com"
receiver = "uld3y0p7i0@crvpe.com"  # Add your temp mail

msg = MIMEText("This is a test email body.")
msg["Subject"] = "New Email"
msg["From"] = sender
msg["To"] = receiver

with smtplib.SMTP("localhost", 1025) as server:
    server.sendmail(sender, [receiver], msg.as_string())

print("Email sent!")
