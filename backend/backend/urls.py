from django.contrib import admin
from django.urls import path
from chat.views import chat, conversation_history

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/chat/', chat, name='chat'),
    path('api/history/', conversation_history, name='conversation_history'),
]
