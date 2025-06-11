from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class User(AbstractUser):
    """Extended User model with additional fields for learning workflow"""
    email = models.EmailField(unique=True, blank=True, null=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True)
    date_of_birth = models.DateField(blank=True, null=True)
    bio = models.TextField(blank=True)
    is_verified = models.BooleanField(default=False)
    
    # New fields for learning workflow
    occupation = models.CharField(max_length=255, blank=True)
    age = models.PositiveIntegerField(blank=True, null=True)
    onboarding_completed = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.username} ({self.email or 'no email'})"


class LearningGoal(models.Model):
    """User's learning goals generated through AI interaction"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='learning_goals')
    original_input = models.TextField(help_text="User's original description of learning goal")
    ai_suggested_goal = models.TextField(help_text="AI-refined version of the learning goal")
    is_accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.ai_suggested_goal[:50]}..."


class ChatMessage(models.Model):
    """Store chat interactions between user and AI"""
    MESSAGE_TYPES = [
        ('user', 'User'),
        ('ai', 'AI Assistant'),
        ('system', 'System'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='chat_messages')
    message_type = models.CharField(max_length=10, choices=MESSAGE_TYPES)
    content = models.TextField()
    context = models.CharField(max_length=50, help_text="Context like 'onboarding_goals', 'general_chat'")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['created_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.message_type} - {self.content[:30]}..."


class LearningPreference(models.Model):
    """User's preferred learning content types"""
    CONTENT_TYPES = [
        ('video', 'Video'),
        ('books', 'Books'),
        ('podcasts', 'Podcasts'),
        ('blogs', 'Blogs'),
        ('buddy', 'Learning Buddy'),
    ]
    
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='learning_preference')
    preferred_content_types = models.JSONField(default=list, help_text="List of preferred content types")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username} - {', '.join(self.preferred_content_types)}"


class WeeklyProgram(models.Model):
    """AI-generated 3-week learning program"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='weekly_programs')
    title = models.CharField(max_length=255)
    description = models.TextField()
    week_number = models.PositiveIntegerField()  # 1, 2, or 3
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'week_number']
        ordering = ['week_number']
    
    def __str__(self):
        return f"{self.user.username} - Week {self.week_number}: {self.title}"


class Task(models.Model):
    """Updated Task model for learning tasks"""
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    CONTENT_TYPES = [
        ('video', 'Video'),
        ('books', 'Books'),
        ('podcasts', 'Podcasts'),
        ('blogs', 'Blogs'),
        ('buddy', 'Learning Buddy'),
    ]

    title = models.CharField(max_length=500)
    description = models.TextField(blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tasks')
    weekly_program = models.ForeignKey(WeeklyProgram, on_delete=models.CASCADE, related_name='tasks', blank=True, null=True)
    
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='pending')
    content_type = models.CharField(max_length=20, choices=CONTENT_TYPES, blank=True)
    source_url = models.URLField(blank=True, help_text="Where to find this content")
    
    due_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} - {self.user.username}"


class UserProfile(models.Model):
    """Extended profile information for users"""
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    timezone = models.CharField(max_length=50, default='UTC')
    language = models.CharField(max_length=10, default='en')
    theme = models.CharField(max_length=20, default='light')
    notifications_enabled = models.BooleanField(default=True)
    email_notifications = models.BooleanField(default=True)
    
    def __str__(self):
        return f"Profile of {self.user.username}"
