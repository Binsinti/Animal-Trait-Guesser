from django.db import models


class Message(models.Model):
    role = models.CharField(max_length=20)  # 'user' or 'assistant'
    content = models.TextField()
    conversation_id = models.CharField(max_length=100, default='default')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{self.role}: {self.content[:50]}"