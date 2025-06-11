from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Task, UserProfile, LearningGoal, ChatMessage, LearningPreference, WeeklyProgram


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Custom User admin"""
    list_display = ('username', 'email', 'first_name', 'last_name', 'occupation', 'age', 'onboarding_completed', 'is_active', 'date_joined')
    list_filter = ('is_active', 'is_staff', 'onboarding_completed', 'occupation')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('-date_joined',)
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Learning Profile', {
            'fields': ('occupation', 'age', 'onboarding_completed', 'avatar', 'phone', 'bio')
        }),
    )
    
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Learning Profile', {
            'fields': ('email', 'first_name', 'last_name', 'occupation', 'age')
        }),
    )


@admin.register(LearningGoal)
class LearningGoalAdmin(admin.ModelAdmin):
    """Learning Goal admin"""
    list_display = ('user', 'is_accepted', 'created_at')
    list_filter = ('is_accepted', 'created_at')
    search_fields = ('user__username', 'original_input', 'ai_suggested_goal')
    readonly_fields = ('created_at',)
    
    fieldsets = (
        (None, {
            'fields': ('user', 'is_accepted')
        }),
        ('Goal Content', {
            'fields': ('original_input', 'ai_suggested_goal')
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    """Chat Message admin"""
    list_display = ('user', 'message_type', 'context', 'content_preview', 'created_at')
    list_filter = ('message_type', 'context', 'created_at')
    search_fields = ('user__username', 'content')
    readonly_fields = ('created_at',)
    
    def content_preview(self, obj):
        return obj.content[:50] + "..." if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Content Preview'


@admin.register(LearningPreference)
class LearningPreferenceAdmin(admin.ModelAdmin):
    """Learning Preference admin"""
    list_display = ('user', 'get_content_types', 'created_at', 'updated_at')
    search_fields = ('user__username',)
    readonly_fields = ('created_at', 'updated_at')
    
    def get_content_types(self, obj):
        return ', '.join(obj.preferred_content_types) if obj.preferred_content_types else 'None'
    get_content_types.short_description = 'Preferred Content Types'


@admin.register(WeeklyProgram)
class WeeklyProgramAdmin(admin.ModelAdmin):
    """Weekly Program admin"""
    list_display = ('user', 'week_number', 'title', 'is_active', 'start_date', 'end_date')
    list_filter = ('week_number', 'is_active', 'start_date')
    search_fields = ('user__username', 'title', 'description')
    readonly_fields = ('created_at',)
    
    fieldsets = (
        (None, {
            'fields': ('user', 'week_number', 'is_active')
        }),
        ('Program Details', {
            'fields': ('title', 'description')
        }),
        ('Dates', {
            'fields': ('start_date', 'end_date')
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    """Task admin with enhanced features"""
    list_display = ('title', 'user', 'weekly_program', 'status', 'priority', 'content_type', 'due_date', 'created_at')
    list_filter = ('status', 'priority', 'content_type', 'weekly_program__week_number', 'created_at')
    search_fields = ('title', 'description', 'user__username')
    readonly_fields = ('created_at', 'updated_at', 'completed_at')
    
    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'user', 'weekly_program')
        }),
        ('Task Details', {
            'fields': ('priority', 'status', 'content_type', 'source_url', 'due_date')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at', 'completed_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    """User Profile admin"""
    list_display = ('user', 'timezone', 'language', 'theme', 'notifications_enabled')
    list_filter = ('timezone', 'language', 'theme', 'notifications_enabled')
    search_fields = ('user__username', 'user__email')
    
    fieldsets = (
        ('User', {
            'fields': ('user',)
        }),
        ('Preferences', {
            'fields': ('timezone', 'language', 'theme')
        }),
        ('Notifications', {
            'fields': ('notifications_enabled', 'email_notifications')
        }),
    )
