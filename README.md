# FlowTune - AI-Powered Learning Platform

FlowTune is a comprehensive AI-powered learning platform that helps users create personalized learning journeys with intelligent goal setting, content recommendations, and progress tracking.

## 🚀 Quick Start with Docker

This project is fully containerized with Docker for easy development and deployment.

### Prerequisites

- Docker & Docker Compose
- Git

### Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Flow-Tune
   ```

2. **Start the development environment**
   ```bash
   docker compose up --build
   ```

3. **Access the applications**
   - **Frontend (React)**: http://localhost:3000
   - **Backend API (Django)**: http://localhost:8000
   - **Admin Panel**: http://localhost:8000/admin
   - **API Documentation**: http://localhost:8000/api
   - **PostgreSQL Database**: localhost:5432
   - **Redis Cache**: localhost:6379

## 🎯 User Workflow

FlowTune provides a streamlined learning experience through these key pages:

### 1. **Homepage** (`/`)
- Responsive design with feature overview
- Introduction to AI-powered learning
- Call-to-action to start the learning journey
- Icon-based design showcasing platform capabilities

### 2. **Login/Registration** (`/login`)
- Simple username-only authentication for easy testing
- Automatic user creation for new usernames
- No password required (testing environment)
- Redirects based on onboarding completion status

### 3. **Onboarding Page 1** (`/onboarding-1`)
- **User Profile Setup**: Collect occupation and age
- **AI Learning Goal Assistant**: 
  - Interactive chat interface with AI
  - Users describe learning interests in natural language
  - AI generates SMART learning goals
  - Users can accept/reject AI suggestions
  - All chat interactions stored in database

### 4. **Onboarding Page 2** (`/onboarding-2`)
- **Learning Preferences Selection**:
  - Choose preferred content types (Video, Books, Podcasts, Blogs, Learning Buddy)
  - Multiple selection supported
  - Visual card-based interface
- **AI Program Generation**: Creates personalized 3-week learning program

### 5. **Overview Page** (`/overview`)
- **3-Week Learning Program Display**:
  - Week-by-week breakdown with progress tracking
  - 5 tasks per week with detailed descriptions
  - Content type indicators and source recommendations
  - Interactive task completion
  - Progress bars and completion statistics

### 6. **Dashboard Page** (`/dashboard`)
- **Progress Analytics**:
  - Overall learning statistics
  - Content type breakdown analysis
  - Recent task activity
  - Achievement progress
  - Learning style insights

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │  Django API     │    │  PostgreSQL     │
│   (Port 3000)   │◄──►│   (Port 8000)   │◄──►│   (Port 5432)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         │              ┌─────────────────┐                │
         └──────────────►│     Redis       │◄───────────────┘
                        │   (Port 6379)   │
                        └─────────────────┘
                                 │
                        ┌─────────────────┐
                        │  Google Gemini  │
                        │   AI Service    │
                        └─────────────────┘
```

## 🤖 AI Integration

### Google Gemini AI Features

- **Learning Goal Refinement**: Converts user input into SMART goals
- **Personalized Program Generation**: Creates 3-week learning programs
- **Interactive Chat**: Provides learning guidance and support
- **Content Recommendations**: Suggests appropriate learning resources

### AI Service Configuration

To enable full AI functionality:

1. Get a Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Set the environment variable:
   ```bash
   export GOOGLE_GEMINI_API_KEY="your-api-key-here"
   ```
3. Restart the backend container

*Note: The system includes fallback responses when AI is unavailable.*

## 📋 Database Models

### Enhanced User Model
- Basic user information (username, email, occupation, age)
- Onboarding completion tracking
- Learning profile data

### Learning Workflow Models
- **LearningGoal**: Stores user goals and AI suggestions
- **ChatMessage**: Records all AI chat interactions
- **LearningPreference**: User's preferred content types
- **WeeklyProgram**: 3-week learning program structure
- **Task**: Individual learning tasks with progress tracking
- **UserProfile**: User preferences and settings

## 🔧 API Endpoints

### Authentication
- `POST /api/simple-login/` - Simple username login/registration

### Learning Workflow
- `POST /api/learning-goals/suggest_goal/` - Get AI goal suggestions
- `POST /api/chat-messages/chat/` - Interactive AI chat
- `POST /api/learning-preferences/set_preferences/` - Set learning preferences
- `POST /api/weekly-programs/generate_program/` - Generate AI learning program

### Task Management
- `GET /api/tasks/by_week/?user_id={id}` - Get tasks grouped by week
- `POST /api/tasks/{id}/complete/` - Mark task as completed
- `GET /api/tasks/stats/?user_id={id}` - Get learning statistics

### User Management
- `GET /api/users/` - List users
- `PATCH /api/users/{id}/complete_onboarding/` - Complete onboarding

## 🎨 Design Philosophy

### Wireframe-First Approach
- Clean, minimal design focused on functionality
- No complex styling - ready for designer input
- Responsive layout using CSS Grid and Flexbox
- Icon-based visual elements for clarity

### Development-Friendly
- Simple authentication for easy testing
- No password requirements in development
- Clear API responses and error handling
- Comprehensive logging and debugging support

## 📱 Responsive Design

All pages are fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Scalable typography using `clamp()`
- Touch-friendly interface elements
- Optimized for all device sizes

## 🛠️ Development Commands

### Docker Commands
```bash
# Start all services
docker compose up

# Start in background
docker compose up -d

# Build and start
docker compose up --build

# Stop all services
docker compose down

# View logs
docker compose logs -f [service_name]

# Execute commands in containers
docker compose exec backend python manage.py [command]
docker compose exec frontend npm [command]
```

### Django Management Commands
```bash
# Run migrations
docker compose exec backend python manage.py migrate

# Create migrations
docker compose exec backend python manage.py makemigrations

# Create superuser
docker compose exec backend python manage.py createsuperuser

# Django shell
docker compose exec backend python manage.py shell
```

## 🧪 Testing the Workflow

### Quick Test Flow:
1. Go to http://localhost:3000
2. Click "Get Started for Free"
3. Enter any username (e.g., "testuser")
4. Complete onboarding:
   - Enter occupation and age
   - Use AI to create learning goals
   - Select learning preferences
5. View your personalized 3-week program
6. Complete tasks and track progress

### API Testing:
```bash
# Test simple login
curl -X POST http://localhost:8000/api/simple-login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser"}'

# Test AI goal suggestion
curl -X POST http://localhost:8000/api/learning-goals/suggest_goal/ \
  -H "Content-Type: application/json" \
  -d '{"user_id": 1, "user_input": "I want to learn Python programming"}'
```

## 🔄 Next Development Steps

### Immediate Priorities
1. **Google Gemini API Integration**: Add real API key for full AI functionality
2. **Enhanced UI**: Designer input for visual improvements
3. **Authentication**: Implement proper JWT-based authentication
4. **Real-time Features**: WebSocket integration for live chat
5. **Content Integration**: Connect to real learning platforms

### Advanced Features
- Calendar integration for scheduling
- Social learning features
- Advanced analytics dashboard
- Mobile app development
- Multi-language support

## 📊 Performance & Monitoring

- PostgreSQL database for reliable data storage
- Redis caching for improved performance
- Docker containerization for consistent environments
- Structured logging for debugging
- API health monitoring

## 🤝 Contributing

This project is set up for team development:
- Backend developers: Focus on Django API and AI integration
- Frontend developers: Enhance React components and user experience
- Designers: Improve visual design while maintaining functionality
- DevOps: Optimize Docker setup and deployment pipeline

## 📝 License

This project is licensed under the MIT License.

## 💡 Support

For questions or issues:
- Check the API health endpoint: http://localhost:8000/api/health/
- Review Docker container logs: `docker compose logs -f`
- Test API endpoints using the examples above

---

**Happy Learning! 🚀📚** 