from django.urls import path
from .views import RegisterView, TaskViewSet, SubmissionViewSet, SubmitTaskView, TransactionViewSet

urlpatterns = [
    path('register/',     RegisterView.as_view(),                                          name='register'),
    path('tasks/',        TaskViewSet.as_view({'get': 'list'}),                            name='tasks'),
    path('tasks/<int:pk>/', TaskViewSet.as_view({'get': 'retrieve'}),                      name='task-detail'),
    path('submissions/',  SubmissionViewSet.as_view({'get': 'list'}),                      name='submissions'),
    path('submit-task/',  SubmitTaskView.as_view(),                                        name='submit-task'),
    path('transactions/', TransactionViewSet.as_view({'get': 'list'}),                     name='transactions'),
]
