from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'role', 'content', 'created_at', 'conversation_id']
        read_only_fields = ['id', 'created_at']


class ChatRequestSerializer(serializers.Serializer):
    """Serializer for incoming chat requests."""
    message = serializers.CharField(max_length=5000)
    conversation_id = serializers.CharField(max_length=100, default='default')
