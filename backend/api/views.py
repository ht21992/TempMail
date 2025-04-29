from rest_framework import viewsets
from .models import TempEmail, EmailMessage
from .serializers import TempEmailSerializer, EmailMessageSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
import random, string


class TempEmailViewSet(viewsets.ModelViewSet):
    queryset = TempEmail.objects.all()
    serializer_class = TempEmailSerializer

    def create(self, request, *args, **kwargs):
        username = "".join(random.choices(string.ascii_lowercase + string.digits, k=10))
        domain = "".join(random.choices(string.ascii_lowercase, k=5))
        email_address = f"{username}@{domain}.com"
        expires = timezone.now() + timedelta(hours=1)

        temp_email = TempEmail.objects.create(address=email_address, expires_at=expires)
        serializer = self.get_serializer(temp_email)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def messages(self, request, pk=None):
        temp_email = self.get_object()
        messages = EmailMessage.objects.filter(temp_mail=temp_email)
        serializer = EmailMessageSerializer(messages, many=True)
        return Response(serializer.data)
