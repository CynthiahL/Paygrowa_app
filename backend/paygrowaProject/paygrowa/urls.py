from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProfileViewSet, TaskViewSet, TaskAssignmentViewSet, SubmitTaskViewSet, WalletViewSet,AssignmentStatusViewSet

from paygrowa import views

#routers implementation
router = DefaultRouter()
router.register(r'register', UserViewSet, basename='register')
router.register(r'profile', ProfileViewSet, basename='profile')
router.register(r'tasks', TaskViewSet, basename='tasks')
router.register(r'assignments', TaskAssignmentViewSet, basename='assignments')
router.register(r'submit-task', SubmitTaskViewSet, basename='submit-task')
router.register(r'assignment-status', AssignmentStatusViewSet, basename='assignment-status')
router.register(r'wallet', WalletViewSet, basename='wallet')


urlpatterns = router.urls