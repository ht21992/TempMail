import asyncio
from aiosmtpd.controller import Controller
import django
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from api.models import TempEmail, EmailMessage
from asgiref.sync import sync_to_async


class MessageHandler:
    from asgiref.sync import sync_to_async


from email.parser import BytesParser
from email.policy import default


class MessageHandler:
    async def handle_DATA(self, server, session, envelope):
        recipient = envelope.rcpt_tos[0]

        # Parse the raw email content
        parser = BytesParser(policy=default)
        email_message = parser.parsebytes(envelope.content)

        subject = email_message["subject"] or "(No Subject)"
        body = (
            email_message.get_body(preferencelist=("plain",)).get_content()
            if email_message.is_multipart()
            else email_message.get_content()
        )

        try:
            temp_email = await sync_to_async(TempEmail.objects.get)(address=recipient)
            await sync_to_async(EmailMessage.objects.create)(
                temp_mail=temp_email,
                sender=envelope.mail_from,
                subject=subject,
                body=body,
            )
        except TempEmail.DoesNotExist:
            print(f"Received email for unknown address {recipient}")

        return "250 Message accepted for delivery"


controller = Controller(MessageHandler(), hostname="127.0.0.1", port=1025)

controller.start()
print(f"{'*' * 6} SMTP Server is ready {'*' * 6}")
asyncio.run(asyncio.Event().wait())
