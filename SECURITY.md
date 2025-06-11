# Security Guidelines

## 🔒 Environment Variables & Secrets

### Required Environment Variables
- `SECRET_KEY`: Generate a new one for production using Django's secret key generator
- `GOOGLE_GEMINI_API_KEY`: Your Google Gemini API key (keep this secret!)
- `DATABASE_URL`: Database connection string
- `DEBUG`: Set to `False` in production

### Setup for New Team Members
1. Copy the environment template:
   ```bash
   cp backend/.env.example backend/.env
   ```

2. **NEVER commit your `.env` file** - it contains sensitive information
3. Generate a new SECRET_KEY for production environments
4. Get your own Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## 🛡️ Security Best Practices

### Development
- ✅ All sensitive data is in environment variables
- ✅ `.env` files are in `.gitignore`
- ✅ Default database passwords are only for local development
- ✅ Debug mode is controlled via environment variables

### Production Considerations
- 🔧 Change all default passwords
- 🔧 Set `DEBUG=False`
- 🔧 Use secure, randomly generated `SECRET_KEY`
- 🔧 Configure proper `ALLOWED_HOSTS`
- 🔧 Use HTTPS for all connections
- 🔧 Set up proper CORS origins
- 🔧 Use secure database credentials

## 🚨 What NOT to Do
- ❌ Don't commit `.env` files
- ❌ Don't hardcode API keys in source code
- ❌ Don't use default passwords in production
- ❌ Don't commit log files or cache directories
- ❌ Don't push Docker volumes or temporary files

## 🔍 Security Audit Checklist
- [ ] No hardcoded secrets in source code
- [ ] All sensitive config in environment variables
- [ ] `.gitignore` includes all temporary and sensitive files
- [ ] Database uses environment variables
- [ ] API keys are not exposed in client-side code
- [ ] Default development passwords not used in production

## 📞 Security Issues
If you discover a security vulnerability, please contact the team lead privately before creating an issue. 