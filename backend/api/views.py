from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import datetime, timedelta
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Task, UserProfile, LearningGoal, ChatMessage, LearningPreference, WeeklyProgram
from .serializers import (
    UserSerializer, TaskSerializer, TaskCreateUpdateSerializer, 
    UserProfileSerializer, SimpleUserCreateSerializer, OnboardingSerializer,
    LearningGoalSerializer, ChatMessageSerializer, LearningPreferenceSerializer,
    WeeklyProgramSerializer
)
from .ai_service import ai_service

User = get_user_model()


@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """Health check endpoint"""
    return JsonResponse({
        'status': 'healthy',
        'message': 'FlowTune API is running',
        'version': '1.0.0'
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def simple_login(request):
    """Simple login/register endpoint for testing"""
    username = request.data.get('username')
    if not username:
        return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Use get_or_create to avoid duplicate creation attempts
    user, created = User.objects.get_or_create(
        username=username,
        defaults={
            'email': None,  # Explicitly set to None to avoid unique constraint issues
        }
    )
    
    # Ensure user has a profile
    UserProfile.objects.get_or_create(user=user)
    
    return Response({
        'user_id': user.id,
        'username': user.username,
        'onboarding_completed': user.onboarding_completed,
        'message': 'New user created' if created else 'Login successful'
    }, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing users
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Simplified for testing
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['first_name', 'last_name', 'email', 'username']
    ordering_fields = ['created_at', 'first_name', 'last_name']
    ordering = ['-created_at']

    def get_queryset(self):
        """
        Filter queryset based on user permissions
        """
        return User.objects.all()

    @action(detail=True, methods=['patch'])
    def complete_onboarding(self, request, pk=None):
        """Complete user onboarding with occupation, age, etc."""
        user = self.get_object()
        serializer = OnboardingSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(onboarding_completed=True)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get', 'patch'])
    def profile(self, request, pk=None):
        """
        Get or update user profile settings
        """
        user = self.get_object()
        
        # Ensure user can only access their own profile
        if user != request.user and not request.user.is_staff:
            return Response(
                {'error': 'You can only access your own profile'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        profile, created = UserProfile.objects.get_or_create(user=user)
        
        if request.method == 'GET':
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        
        elif request.method == 'PATCH':
            serializer = UserProfileSerializer(profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LearningGoalViewSet(viewsets.ModelViewSet):
    """ViewSet for managing learning goals"""
    queryset = LearningGoal.objects.all()
    serializer_class = LearningGoalSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return LearningGoal.objects.filter(user_id=user_id)
        return LearningGoal.objects.all()

    @action(detail=False, methods=['post'])
    def suggest_goal(self, request):
        """Get AI suggestion for learning goal"""
        user_id = request.data.get('user_id')
        user_input = request.data.get('user_input')
        
        if not user_id or not user_input:
            return Response({
                'error': 'user_id and user_input are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(id=user_id)
            ai_suggestion = ai_service.suggest_learning_goals(
                occupation=user.occupation or 'Professional',
                age=user.age or 25,
                user_input=user_input
            )
            
            # Save the goal
            goal = LearningGoal.objects.create(
                user=user,
                original_input=user_input,
                ai_suggested_goal=ai_suggestion
            )
            
            return Response({
                'id': goal.id,
                'original_input': user_input,
                'ai_suggested_goal': ai_suggestion
            })
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


class ChatMessageViewSet(viewsets.ModelViewSet):
    """ViewSet for chat messages"""
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        context = self.request.query_params.get('context', 'general')
        if user_id:
            return ChatMessage.objects.filter(user_id=user_id, context=context)
        return ChatMessage.objects.all()

    @action(detail=False, methods=['post'])
    def chat(self, request):
        """Send message and get AI response"""
        user_id = request.data.get('user_id')
        message = request.data.get('message')
        context = request.data.get('context', 'general')
        
        if not user_id or not message:
            return Response({
                'error': 'user_id and message are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(id=user_id)
            
            # Save user message
            user_message = ChatMessage.objects.create(
                user=user,
                message_type='user',
                content=message,
                context=context
            )
            
            # Get AI response
            ai_response = ai_service.chat_response(message, context)
            
            # Save AI response
            ai_message = ChatMessage.objects.create(
                user=user,
                message_type='ai',
                content=ai_response,
                context=context
            )
            
            return Response({
                'user_message': ChatMessageSerializer(user_message).data,
                'ai_response': ChatMessageSerializer(ai_message).data
            })
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


class LearningPreferenceViewSet(viewsets.ModelViewSet):
    """ViewSet for learning preferences"""
    queryset = LearningPreference.objects.all()
    serializer_class = LearningPreferenceSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return LearningPreference.objects.filter(user_id=user_id)
        return LearningPreference.objects.all()

    @action(detail=False, methods=['post'])
    def set_preferences(self, request):
        """Set user learning preferences"""
        user_id = request.data.get('user_id')
        content_types = request.data.get('preferred_content_types', [])
        
        if not user_id:
            return Response({'error': 'user_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(id=user_id)
            preference, created = LearningPreference.objects.get_or_create(user=user)
            preference.preferred_content_types = content_types
            preference.save()
            
            return Response(LearningPreferenceSerializer(preference).data)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


class WeeklyProgramViewSet(viewsets.ModelViewSet):
    """ViewSet for weekly programs"""
    queryset = WeeklyProgram.objects.all()
    serializer_class = WeeklyProgramSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return WeeklyProgram.objects.filter(user_id=user_id)
        return WeeklyProgram.objects.all()

    @action(detail=False, methods=['post'])
    def generate_program(self, request):
        """Generate AI-powered 3-week learning program"""
        user_id = request.data.get('user_id')
        
        if not user_id:
            return Response({'error': 'user_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(id=user_id)
            
            # Get user's learning goals and preferences
            goals = list(user.learning_goals.filter(is_accepted=True).values_list('ai_suggested_goal', flat=True))
            preferences = []
            try:
                preferences = user.learning_preference.preferred_content_types
            except:
                preferences = ['video']  # Default preference
            
            # Generate program with AI
            program_data = ai_service.generate_learning_program(
                user_goals=goals,
                preferences=preferences,
                occupation=user.occupation or 'Professional',
                age=user.age or 25
            )
            
            # Clear existing programs for this user
            WeeklyProgram.objects.filter(user=user).delete()
            
            # Create new programs
            programs = []
            start_date = timezone.now().date()
            
            for week_num in range(1, 4):
                week_key = f'week_{week_num}'
                if week_key in program_data:
                    week_start = start_date + timedelta(weeks=week_num-1)
                    week_end = week_start + timedelta(days=6)
                    
                    program = WeeklyProgram.objects.create(
                        user=user,
                        title=program_data[week_key]['title'],
                        description=program_data[week_key]['description'],
                        week_number=week_num,
                        start_date=week_start,
                        end_date=week_end,
                        is_active=week_num == 1  # First week is active
                    )
                    
                    # Create tasks for this week
                    for task_data in program_data[week_key]['tasks']:
                        Task.objects.create(
                            user=user,
                            weekly_program=program,
                            title=task_data['title'],
                            description=task_data['description'],
                            content_type=task_data['content_type'],
                            source_url=task_data.get('source', ''),
                            priority='medium'
                        )
                    
                    programs.append(program)
            
            return Response({
                'message': 'Learning program generated successfully',
                'programs': WeeklyProgramSerializer(programs, many=True).data
            })
            
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


class TaskViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing tasks
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'priority', 'content_type', 'weekly_program']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'due_date', 'priority']
    ordering = ['-created_at']

    def get_queryset(self):
        """
        Filter tasks by user
        """
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return Task.objects.filter(user_id=user_id)
        return Task.objects.all()

    def get_serializer_class(self):
        """
        Return appropriate serializer based on action
        """
        if self.action in ['create', 'update', 'partial_update']:
            return TaskCreateUpdateSerializer
        return TaskSerializer

    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        """
        Mark a task as completed
        """
        task = self.get_object()
        task.status = 'completed'
        task.completed_at = timezone.now()
        task.save()
        
        serializer = self.serializer_class(task)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_week(self, request):
        """
        Get tasks grouped by week
        """
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({'error': 'user_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        programs = WeeklyProgram.objects.filter(user_id=user_id).prefetch_related('tasks')
        result = []
        
        for program in programs:
            result.append({
                'week': WeeklyProgramSerializer(program).data,
                'tasks': TaskSerializer(program.tasks.all(), many=True).data
            })
        
        return Response(result)

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """
        Get task statistics for user
        """
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({'error': 'user_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        queryset = Task.objects.filter(user_id=user_id)
        
        # Basic stats
        stats = {
            'total_tasks': queryset.count(),
            'pending': queryset.filter(status='pending').count(),
            'in_progress': queryset.filter(status='in_progress').count(),
            'completed': queryset.filter(status='completed').count(),
            'cancelled': queryset.filter(status='cancelled').count(),
        }
        
        # Content type breakdown
        content_stats = {}
        for content_type, _ in Task.CONTENT_TYPES:
            content_stats[content_type] = queryset.filter(content_type=content_type, status='completed').count()
        
        stats['completed_by_content_type'] = content_stats
        
        return Response(stats)
