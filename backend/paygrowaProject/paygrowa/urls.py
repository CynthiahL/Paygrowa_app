from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from paygrowa import views

urlpatterns = [
    path('register/', views.UserViewSet.as_view({'post': 'create'}), name='register'),
    path('profile/', views.ProfileViewSet.as_view({'get': 'list', 'post': 'create'}), name='profile'),  
    path('tasks/', views.TaskViewSet.as_view({'get': 'list'}), name='tasks'),
    path('assignments/', views.TaskAssignmentViewSet.as_view({'get': 'list', 'post': 'create'}), name='assignments'),
    path('submit-task/', views.SubmitTaskViewSet.as_view({'get': 'list', 'post': 'create'}), name='submit-task'),
]