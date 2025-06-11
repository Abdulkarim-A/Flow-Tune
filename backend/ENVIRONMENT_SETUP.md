# Environment Setup Guide

## Quick Setup

1. **Copy the template**:
   ```bash
   cp backend/.env.example backend/.env
   ```

2. **Get your Google Gemini API key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key
   - Copy the key

3. **Edit your .env file**:
   ```bash
   # Open the file in your preferred editor
   nano backend/.env
   # or
   code backend/.env
   ```

4. **Replace the placeholder**:
   Change this line:
   ```
   GOOGLE_GEMINI_API_KEY=your-api-key-here
   ```
   
   To your actual API key:
   ```
   GOOGLE_GEMINI_API_KEY=AIzaSyC4VxxxxxxxxxxxxxxxxxxxxxxxxxE
   ```

5. **Restart the backend**:
   ```bash
   docker compose restart backend
   ```

## Security Notes

- ✅ **DO**: Keep your `.env` file local and never commit it
- ✅ **DO**: Use `.env.example` for sharing configuration templates
- ❌ **DON'T**: Share your API key publicly or commit it to git
- ❌ **DON'T**: Use production API keys in development

## Verification

Test your setup by calling the AI endpoint:
```bash
curl -X POST http://localhost:8000/api/learning-goals/suggest_goal/ \
  -H "Content-Type: application/json" \
  -d '{"user_id": 1, "user_input": "I want to learn Python"}'
```

If working correctly, you should get an AI-generated response instead of a fallback message. 