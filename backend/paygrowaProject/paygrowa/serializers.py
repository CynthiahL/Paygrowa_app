#importing models, serializers and validators
from rest_framework import serializers
from .models import User, Task, TaskAssignment, Payment, Wallet, UserProfile
from datetime import timedelta
from django.utils import timezone   

#1. User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'phone_number', 'password', 'is_staff', 'is_superuser', 'is_active', 'created_at']
        read_only_fields = ['id', 'is_staff', 'is_superuser', 'is_active', 'created_at']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone_number=validated_data.get('phone_number', '')
        )
        return user


#2. User profile serializer
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
        read_only_fields = ['user']


#3a. Task serializer
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

#4a. User task assignment serializer
class TaskAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskAssignment
        unique_together = ('user', 'task')  # Ensure a user can only be assigned to a specific task once
        fields =  '__all__'
        read_only_fields = ['user', 'validation_score', 'flagged', 'review_reason']

#5. User task submission serializer with validation
class TaskSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskAssignment
        fields = ['completion_code', 'screenshot']

    def update(self, instance, validated_data):
        score = 0
        reasons = []

        instance.completed_at = timezone.now()
        instance.completion_code = validated_data['completion_code']
        instance.screenshot = validated_data['screenshot']

        if instance.completion_code:
            score += 40
        if instance.screenshot:
            score += 15

        duration = instance.completed_at - instance.started_at
        if duration >= instance.task.duration * 0.3 and duration <= instance.task.duration * 1.5:
            score += 30
        elif duration < instance.task.duration * 0.3:
            reasons.append('Too fast')
        else:
            reasons.append('Too slow')
            instance.status = 'opt_out'

        instance.validation_score = score

        if score >= 90:
            instance.status = 'verified'
        elif score >= 70:
            instance.status = 'under_review'
            instance.flagged = True
        else:
            instance.status = 'rejected'
            instance.flagged = True

        instance.review_reason = ', '.join(reasons)
        instance.save()

        if instance.status in ['verified', 'under_review']:
            Payment.objects.get_or_create(assignment=instance)

        #re-routing to  admin review if under_review for review
        if instance.status == 'under_review':
            Payment.review_status = 'pending_review'
            Payment.payment_status = 'pending_review'
        elif instance.status == 'rejected':
            Payment.review_status = 'rejected'
            Payment.payment_status = 'void'
        else:
            Payment.review_status = 'approved'
            Payment.payment_status = 'queued'
        return instance



