from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Task, UserProfile, LearningGoal, ChatMessage, LearningPreference, WeeklyProgram

User = get_user_model()


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['timezone', 'language', 'theme', 'notifications_enabled', 'email_notifications']


class LearningGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningGoal
        fields = ['id', 'original_input', 'ai_suggested_goal', 'is_accepted', 'created_at']
        read_only_fields = ['created_at']


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'message_type', 'content', 'context', 'created_at']
        read_only_fields = ['created_at']


class LearningPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningPreference
        fields = ['preferred_content_types', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']


class WeeklyProgramSerializer(serializers.ModelSerializer):
    tasks_count = serializers.SerializerMethodField()
    completed_tasks_count = serializers.SerializerMethodField()
    
    class Meta:
        model = WeeklyProgram
        fields = ['id', 'title', 'description', 'week_number', 'start_date', 'end_date', 
                 'is_active', 'tasks_count', 'completed_tasks_count', 'created_at']
        read_only_fields = ['created_at']
    
    def get_tasks_count(self, obj):
        return obj.tasks.count()
    
    def get_completed_tasks_count(self, obj):
        return obj.tasks.filter(status='completed').count()


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)
    learning_preference = LearningPreferenceSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 
            'avatar', 'phone', 'date_of_birth', 'bio', 'is_verified',
            'occupation', 'age', 'onboarding_completed',
            'date_joined', 'created_at', 'updated_at', 'profile', 'learning_preference'
        ]
        extra_kwargs = {
            'is_verified': {'read_only': True},
            'date_joined': {'read_only': True},
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }

    def create(self, validated_data):
        # Simple user creation without password for easy testing
        user = User.objects.create_user(**validated_data)
        
        # Create user profile
        UserProfile.objects.create(user=user)
        
        return user

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance


class SimpleUserCreateSerializer(serializers.ModelSerializer):
    """Simplified user creation for easy testing - username only"""
    class Meta:
        model = User
        fields = ['username']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user)
        return user


class OnboardingSerializer(serializers.ModelSerializer):
    """Serializer for updating user data during onboarding"""
    class Meta:
        model = User
        fields = ['occupation', 'age', 'onboarding_completed']


class TaskSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    weekly_program_title = serializers.CharField(source='weekly_program.title', read_only=True)
    
    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'user', 'weekly_program', 'weekly_program_title',
            'priority', 'status', 'content_type', 'source_url',
            'due_date', 'created_at', 'updated_at', 'completed_at'
        ]
        read_only_fields = ['created_at', 'updated_at', 'completed_at']

    def create(self, validated_data):
        # Set the user to the current user
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class TaskCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['title', 'description', 'priority', 'status', 'content_type', 'source_url', 'due_date', 'weekly_program']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
 