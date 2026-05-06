from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User, Task, Submission, Transaction
from .serializers import UserSerializer, TaskSerializer, SubmissionSerializer, TaskSubmitSerializer, TransactionSerializer


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Task.objects.filter(status='active')


class SubmissionViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Submission.objects.filter(user=self.request.user)


class SubmitTaskView(APIView):
    """POST /api/submit-task/ — submit answers, credit wallet, record transaction."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = TaskSubmitSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        result = serializer.save(user=request.user)
        return Response(result, status=status.HTTP_200_OK)


class TransactionViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)
