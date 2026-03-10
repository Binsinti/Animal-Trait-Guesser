# Animal Trait Guesser

An AI-powered game where you describe physical traits of an animal, and the AI attempts to guess what animal you're thinking of!

## Overview

This is a Django REST Framework backend application that uses Groq's LLaMA 3.3 70B model to create an interactive animal guessing game. The AI analyzes physical trait descriptions you provide and progressively builds confidence in its guess, only revealing the answer when it's sufficiently certain.

## Features

- **Progressive Guessing**: The AI waits for enough traits before making a confident guess
- **Confidence Tracking**: Each response includes a confidence percentage
- **Conversation History**: Maintains context throughout the guessing session
- **Input Validation**: Ensures only physical animal traits are accepted
- **RESTful API**: Clean API endpoints for easy integration

## Tech Stack

- **Backend Framework**: Django 4.x
- **API**: Django REST Framework
- **AI Model**: Groq API (LLaMA 3.3 70B Versatile)
- **Database**: SQLite
- **Language**: Python 3.x

## Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Groq API key ([Get one here](https://console.groq.com/))

### Setup

1. **Clone the repository**
   ```bash
   cd "Animal Trait Guesser"
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the project root:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run migrations**
   ```bash
   cd backend
   python manage.py migrate
   ```

5. **Start the development server**
   ```bash
   python manage.py runserver
   ```

The server will start at `http://localhost:8000`

## API Endpoints

### POST `/api/chat/`

Send a message with animal trait descriptions.

**Request Body:**
```json
{
  "message": "It has four legs",
  "conversation_id": "unique-session-id"
}
```

**Response:**
```json
{
  "response": "Dog - 45%",
  "message_id": 123
}
```

### GET `/api/history/`

Retrieve conversation history.

**Query Parameters:**
- `conversation_id` (optional): Specific conversation to retrieve

**Response:**
```json
{
  "messages": [
    {
      "id": 1,
      "role": "user",
      "content": "It has four legs",
      "created_at": "2026-03-10T12:00:00Z",
      "conversation_id": "unique-session-id"
    },
    {
      "id": 2,
      "role": "assistant",
      "content": "Dog - 45%",
      "created_at": "2026-03-10T12:00:01Z",
      "conversation_id": "unique-session-id"
    }
  ]
}
```

## How to Play

1. Start a conversation by describing a physical trait of an animal you're thinking of
2. Continue adding more traits (e.g., "It has fur", "It has a long tail", "It can climb trees")
3. The AI will respond with its guess and confidence level
4. When the AI reaches 100% confidence, it will make its final guess
5. Only physical traits are accepted - other types of input will be rejected

## Game Rules

- ✅ Physical traits only (size, color, body parts, abilities)
- ❌ No habitat descriptions
- ❌ No behavioral descriptions (unless physical)
- 🎯 AI guesses only when confident
- 📊 Confidence percentage increases with each trait

## Project Structure

```
Animal Trait Guesser/
├── backend/
│   ├── backend/          # Django project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── chat/             # Main application
│   │   ├── models.py     # Message model
│   │   ├── views.py      # API endpoints
│   │   ├── serializers.py
│   │   └── admin.py
│   ├── db.sqlite3        # SQLite database
│   └── manage.py
├── requirements.txt
└── README.md
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Your Groq API key for LLaMA model access | Yes |

## Development

### Running Tests
```bash
cd backend
python manage.py test
```

### Creating Superuser
```bash
python manage.py createsuperuser
```

Access the admin panel at `http://localhost:8000/admin/`

## Troubleshooting

**Issue**: `API key not configured` error  
**Solution**: Ensure your `.env` file contains a valid `GROQ_API_KEY`

**Issue**: Database errors  
**Solution**: Run `python manage.py migrate` to apply migrations

**Issue**: Module not found errors  
**Solution**: Install dependencies with `pip install -r requirements.txt`

## License

This project is open source and available for educational purposes.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## Author

Created with ❤️ by Bins
