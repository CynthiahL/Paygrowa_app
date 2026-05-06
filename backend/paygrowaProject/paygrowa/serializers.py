from rest_framework import serializers
from django.db import transaction as db_transaction
from .models import User, Task, Submission, Transaction


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'password', 'wallet_balance']
        read_only_fields = ['id', 'wallet_balance']

    def create(self, validated_data):
        return User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data.get('name', ''),
        )


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'reward', 'time_estimate', 'questions', 'status']


class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = ['id', 'user', 'task', 'answers', 'created_at', 'status']
        read_only_fields = ['id', 'user', 'created_at', 'status']


class TaskSubmitSerializer(serializers.Serializer):
    task_id = serializers.IntegerField()
    answers = serializers.JSONField()

    def validate_task_id(self, value):
        try:
            Task.objects.get(pk=value, status='active')
        except Task.DoesNotExist:
            raise serializers.ValidationError('Task not found or not active.')
        return value

    def save(self, user):
        task = Task.objects.get(pk=self.validated_data['task_id'])
        answers = self.validated_data['answers']

        with db_transaction.atomic():
            submission = Submission.objects.create(
                user=user,
                task=task,
                answers=answers,
                status='approved',
            )

            # Credit wallet
            user.wallet_balance += task.reward
            user.save(update_fields=['wallet_balance'])

            # Record transaction
            Transaction.objects.create(
                user=user,
                task=task,
                amount=task.reward,
                type='earned',
            )

        return {
            'success': True,
            'submission_id': submission.id,
            'amount_earned': task.reward,
            'new_balance': user.wallet_balance,
        }


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'user', 'amount', 'type', 'task', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']
