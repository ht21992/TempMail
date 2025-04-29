from rest_framework import serializers
from .models import TempEmail, EmailMessage


class TempEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = TempEmail
        fields = "__all__"


class EmailMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailMessage
        fields = "__all__"
