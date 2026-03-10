import os
import json
import logging
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from groq import Groq
from .models import Message
from .serializers import MessageSerializer, ChatRequestSerializer

logger = logging.getLogger(__name__)


# System prompt for the AI bot
SYSTEM_PROMPT = """You are an animal guessing game bot. I will describe the physical traits of an animal, and you have to guess what it is from all the physical traits I give you. You will only guess the animal when I have given you enough traits to be confident in your guess. You will then respond with the name of the animal and a confidence percentage. If you are not confident enough to make a guess, you will wait for more traits.:
- Must only output the name of the guessed animal and a confidence percentage, nothing else.

Scope -- THIS IS A STRICT RULE, NO EXCEPTIONS:
- You ONLY output the name of the guessed animal and a confidence percentage, nothing else.
- You must add on the traits to form the animal and your confidence percentage, you MUST NOT output the guessed animal without the confidence percentage.
- When refusing, respond with EXACTLY this message and nothing else:
- When you reach 100 percent confidence, you MUST make the guess and end the game, you MUST NOT wait for more traits.
- If the user inputs something that is not a physical trait of an animal, you MUST refuse and respond with EXACTLY this message and nothing else:
"I'm sorry! that's not a physical trait of an animal please input something else."
- You MUST NOT ask the user for more information, you can only respond with the guessed animal and confidence percentage or refuse if the input is not a physical trait of an animal.
- You MUST NOT output any explanations, just the guessed animal and confidence percentage or the refusal message"""


@api_view(['POST'])
def chat(request):
    """
    Handle chat requests from the frontend.
    Receives a user message, gets AI response, and stores both in database.
    """
    serializer = ChatRequestSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    user_message = serializer.validated_data['message']
    conversation_id = serializer.validated_data['conversation_id']
    
    # Save user message to database
    Message.objects.create(
        role='user',
        content=user_message,
        conversation_id=conversation_id
    )
    
    # Get conversation history (last 10 messages for context)
    history = Message.objects.filter(
        conversation_id=conversation_id
    ).order_by('-created_at')[:10]
    history = list(reversed(history))  # Reverse to get chronological order
    
    # Build messages array for API
    messages = []
    for msg in history:
        messages.append({
            'role': msg.role,
            'content': msg.content
        })
    
    try:
        # Initialize Groq client
        api_key = os.getenv('GROQ_API_KEY')
        if not api_key:
            error_msg = 'API key not configured. Please set GROQ_API_KEY in your .env file.'
            logger.error(error_msg)
            return Response(
                {'error': error_msg},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        client = Groq(
            api_key=api_key,
        )
        
        # Create the message completion using Groq
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",  # Latest fast and capable free model
            messages=[
                {'role': 'system', 'content': SYSTEM_PROMPT},
                *messages
            ],
            temperature=0.7,
            max_tokens=1000,
        )
        
        ai_response = completion.choices[0].message.content
        
        # Save AI response to database
        Message.objects.create(
            role='assistant',
            content=ai_response,
            conversation_id=conversation_id
        )
        
        return Response({
            'response': ai_response,
            'conversation_id': conversation_id
        }, status=status.HTTP_200_OK)
    
    except Exception as e:
        error_msg = f'Error: {str(e)}'
        logger.error(error_msg, exc_info=True)
        return Response(
            {'error': error_msg},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def conversation_history(request):
    """
    Retrieve the chat history for a specific conversation.
    """
    conversation_id = request.query_params.get('conversation_id', 'default')
    
    messages = Message.objects.filter(
        conversation_id=conversation_id
    ).order_by('created_at')
    
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)
