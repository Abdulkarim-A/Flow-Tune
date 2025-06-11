from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('users', views.UserViewSet)
router.register('tasks', views.TaskViewSet)
router.register('learning-goals', views.LearningGoalViewSet)
router.register('chat-messages', views.ChatMessageViewSet)
router.register('learning-preferences', views.LearningPreferenceViewSet)
router.register('weekly-programs', views.WeeklyProgramViewSet)

urlpatterns = [
    path('health/', views.health_check, name='health_check'),
    path('simple-login/', views.simple_login, name='simple_login'),
    path('', include(router.urls)),
] 