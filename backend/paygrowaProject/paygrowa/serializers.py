#importing models, serializers and validators
from decimal import Decimal
from http.client import responses
from rest_framework import serializers
from .models import User, Task, Survey, TaskAssignment, Payment, Wallet, UserProfile
from datetime import timedelta
from django.utils import timezone   
from rest_framework.exceptions import ValidationError
import json
from django.db.models import F

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

#survey serializer
class SurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = '__all__'

#3a. Task serializer
#edit to access survey questions through task serializer
class TaskSerializer(serializers.ModelSerializer):
    survey = serializers.SerializerMethodField()
    class Meta:
        model = Task
        fields = ['id', 'title', 'category', 'description', 'user_reward', 'duration', 'is_active', 'created_at', 'survey']

    def get_survey(self, obj):
        try:
            survey = Survey.objects.get(task=obj)
            return SurveySerializer(survey).data
        except Survey.DoesNotExist:
            return None

#4a. User task assignment serializer
class TaskAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskAssignment
        fields = ['id','task','status','assigned_at']
        read_only_fields = ['id', 'status', 'assigned_at']

    def get_survey(self, obj):
        if hasattr(obj.task, 'survey'):
            return SurveySerializer(obj.task.survey).data
        return None

#5. User task submission serializer with validation
class TaskSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskAssignment
        fields = ['completion_code','survey_response']

#start validation error handling

    def update(self, instance, validated_data):
        if not instance.started_at:
            raise ValidationError("Task has not been started yet.")
        if instance.status != 'started':
            raise ValidationError(f"Cannot submit task in '{instance.status}' state.")
        if instance.completed_at:
            raise ValidationError("Task has already been submitted.")
        
        instance.completed_at = timezone.now()
        instance.status = 'submitted'

        score = 0
        reasons = []

        instance.completion_code = validated_data['completion_code']
        instance.survey_response = validated_data['survey_response']

        if instance.completion_code:
            score += 40
    
        questions = getattr(instance.task.survey, 'questions', [])
        responses = validated_data.get('survey_response', {})
        if isinstance(responses, str):
            try:
                responses = json.loads(responses)
            except Exception:
                raise ValidationError("Survey response must be valid JSON.")
        missing = []
        for q in questions:
            if q.get( 'required') and q['id'] not in responses:
                missing.append(q['id'])

        if missing:
            reasons.append(f'Missing answers for: {missing}')
        else:
            score += 40
        
        duration = instance.completed_at - instance.started_at
        if duration >= instance.task.duration * 0.3 and duration <= instance.task.duration * 2.0:
            score += 20
        elif duration < instance.task.duration * 0.3:
            reasons.append('Too fast')
        else:
            reasons.append('Too slow')
            instance.status = 'opt_out'

        instance.validation_score = score

        if score >= 70:
            instance.status = 'verified'
        elif score >= 50:
            instance.status = 'under_review'
            instance.flagged = True
        else:
            instance.status = 'rejected'
            instance.flagged = True

        instance.review_reason = ', '.join(reasons)
        instance.save()
        #refactoring to remove under_review from payment process till approval 
        if instance.status == 'verified':
            payment, _ = Payment.objects.get_or_create(assignment=instance)
            payment.review_status = 'approved'
            payment.payment_status = 'queued'

            payment.save()
        return instance

class AssignmentStatusSerializer(serializers.ModelSerializer):
    payment = serializers.SerializerMethodField()

    class Meta:
        model = TaskAssignment
        fields = ['id', 'task', 'status', 'validation_score', 'review_reason', 'flagged', 'payment']

    def get_payment(self, obj):
        try:
            payment = Payment.objects.get(assignment=obj)
            return {
                "review_status": payment.review_status,
                "payment_status": payment.payment_status,
                "created_at": payment.created_at
            }
        except Payment.DoesNotExist:
            return None


class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ['available_balance', 'locked_savings']
