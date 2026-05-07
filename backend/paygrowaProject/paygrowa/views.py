from rest_framework import viewsets, permissions
from django.utils import timezone
from .models import User, UserProfile, Task, TaskAssignment, Payment, Wallet
from .serializers import *
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

   

class TaskViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(is_active=True).exclude(taskassignment__user=self.request.user)

    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        task = self.get_object()
        assignment, created = TaskAssignment.objects.get_or_create(
            user=request.user,
            task=task,
            defaults={'status': 'assigned', 'assigned_at': timezone.now()}
        )
        if not created:
            return Response({'message': 'Already accepted'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Task accepted'}, status=status.HTTP_200_OK)
    
#adding custom action for starting task
class TaskAssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = TaskAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return TaskAssignment.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def start_task(self, request, pk=None):
        assignment = self.get_object()
        if assignment.status != 'assigned':
            return Response({'error': f"Cannot start task in '{assignment.status}' state."}, status=status.HTTP_400_BAD_REQUEST)
        assignment.status = 'started'
        assignment.started_at = timezone.now()
        assignment.save(update_fields=['status', 'started_at'])
        return Response({'message': 'Task started successfully'}, status=status.HTTP_200_OK)

class SubmitTaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return TaskAssignment.objects.filter(user=self.request.user, status='started')

class AssignmentStatusViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AssignmentStatusSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return TaskAssignment.objects.filter(user=self.request.user)

class WalletViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = WalletSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Wallet.objects.filter(user=self.request.user)