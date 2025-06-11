# Contributing to FlowTune

## 🚀 Quick Start for New Team Members

### Prerequisites
- Docker & Docker Compose
- Git
- Node.js (for frontend development)
- Python 3.11+ (for backend development outside Docker)

### Initial Setup
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Flow-Tune
   ```

2. **Set up environment variables**
   ```bash
   cp backend/.env.example backend/.env
   ```
   
3. **Add your API keys** (see `SECURITY.md` for details)
   - Get Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Update `backend/.env` with your actual API key

4. **Start the development environment**
   ```bash
   docker compose up --build
   ```

5. **Access the applications**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Admin Panel: http://localhost:8000/admin

## 🛠️ Development Workflow

### Backend Development (Django)
```bash
# Run migrations
docker compose exec backend python manage.py migrate

# Create new migrations
docker compose exec backend python manage.py makemigrations

# Django shell
docker compose exec backend python manage.py shell

# Run tests
docker compose exec backend python manage.py test
```

### Frontend Development (React)
```bash
# Install dependencies
npm install

# Run frontend independently (if needed)
npm start
```

### Database Management
```bash
# Create superuser
docker compose exec backend python manage.py createsuperuser

# Database shell
docker compose exec db psql -U flowtune_user -d flowtune_db
```

## 📝 Code Standards

### Backend (Django)
- Follow PEP 8 coding standards
- Use Django's built-in features and best practices
- Write docstrings for all functions and classes
- Use type hints where appropriate
- Keep views lightweight, put business logic in models/services

### Frontend (React)
- Use functional components with hooks
- Follow React best practices
- Use consistent naming conventions
- Keep components small and focused

### Git Workflow
1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test thoroughly
4. Commit with descriptive messages
5. Push and create a Pull Request

## 🧪 Testing

### Running Tests
```bash
# Backend tests
docker compose exec backend python manage.py test

# Frontend tests (if implemented)
npm test
```

### Test the Complete Workflow
1. Go to http://localhost:3000
2. Test the login flow with username "testuser"
3. Complete the onboarding process
4. Verify AI features are working
5. Check task creation and completion

## 🐛 Debugging

### Backend Issues
```bash
# View backend logs
docker compose logs backend -f

# Check database
docker compose logs db

# Django debug shell
docker compose exec backend python manage.py shell
```

### Frontend Issues
```bash
# View frontend logs
docker compose logs frontend -f

# Check browser console for JavaScript errors
```

### AI Service Issues
- Verify your Google Gemini API key is set correctly
- Check backend logs for AI service errors
- Test AI endpoints directly with curl

## 📊 Project Structure
```
Flow-Tune/
├── backend/                 # Django backend
│   ├── api/                # Main API app
│   ├── flowtune_project/   # Django project settings
│   ├── .env.example        # Environment template
│   └── requirements.txt    # Python dependencies
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   └── styles/            # CSS styles
├── docker-compose.yml     # Docker services
├── README.md             # Main documentation
├── SECURITY.md           # Security guidelines
└── .gitignore           # Git ignore rules
```

## 🔄 Common Tasks

### Adding New API Endpoints
1. Add view in `backend/api/views.py`
2. Add URL in `backend/api/urls.py`
3. Update serializers if needed
4. Add tests
5. Update frontend to use new endpoint

### Adding New Frontend Pages
1. Create component in `src/pages/`
2. Add route in `src/App.js`
3. Add navigation links if needed
4. Test responsive design

### Database Changes
1. Modify models in `backend/api/models.py`
2. Create migration: `docker compose exec backend python manage.py makemigrations`
3. Apply migration: `docker compose exec backend python manage.py migrate`
4. Update serializers and views if needed

## 🚨 Before Committing
- [ ] Remove any hardcoded secrets or API keys
- [ ] Test your changes thoroughly
- [ ] Ensure Docker containers start successfully
- [ ] Clean up any temporary files
- [ ] Write clear commit messages
- [ ] Update documentation if needed

## 📞 Getting Help
- Check existing issues on GitHub
- Review the README.md and SECURITY.md
- Ask team members for help
- Check Docker logs for error details

## 🎯 Current Development Priorities
1. Enhanced UI/UX design
2. Real-time features (WebSocket integration)
3. Advanced analytics and reporting
4. Mobile responsiveness improvements
5. Performance optimizations 