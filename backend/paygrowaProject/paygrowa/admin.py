import json

from django import forms
from django.contrib import admin, messages
from django.db import transaction
from .models import Payment, TaskAssignment, Survey, Task
from django.utils.html import format_html  
from decimal import Decimal
from django.db.models import F
# Register your models here.

class SurveyInlineForm(forms.ModelForm):
    class Meta:
        model = Survey
        fields = '__all__'
        widgets = {
            'questions': forms.Textarea(attrs={
                'rows': 12,
                'cols': 100,
                'placeholder': '''[
                     {"id":"cc_q1","question":"Age?","type":"number","required":true},
                    {"id":"cc_q2","question":"Gender?","type":"single_choice","options":["Male","Female"],"required":true}
                ]'''
            })
        }

    def clean_questions(self):
        data = self.cleaned_data['questions']
        try:
            parsed = json.loads(data)
        except Exception:
            raise forms.ValidationError("Invalid JSON format for questions.")
        return parsed
        
class SurveyInline(admin.StackedInline):
    model = Survey
    extra = 0
    max_num = 1  # because it's effectively 1 survey per task
    form = SurveyInlineForm

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_active', 'slots_remaining', 'created_at', 'user_reward','duration','is_active')
    search_fields = ('title', 'category')
    list_filter = ('is_active', 'category')
    
    inlines = [SurveyInline]


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('assignment', 'display_code','review_status', 'payment_status')
    actions = ['approve_payments', 'reject_payments']
    
    # Pre-fetches related data for the list view and the actions
    list_select_related = ('assignment__task', 'assignment__user__wallet')

    @admin.display(description="Code")
    def display_code(self, obj):
        return obj.assignment.completion_code

    @admin.action(description="Approve selected and credit wallets")
    def approve_payments(self, request, queryset):
        try:
            with transaction.atomic():

                for payment in queryset:
                    assignment = payment.assignment
                    task = assignment.task
                    wallet = assignment.user.wallet
                    
                    # 2. Logic for split
                    reward = Decimal(str(task.user_reward))
                    to_available = reward * Decimal('0.90')
                    to_locked = reward * Decimal('0.10')

                    # 3. Update TaskAssignment
                    assignment.status = 'approved'
                    assignment.flagged = False
                    assignment.save(update_fields=['status', 'flagged'])

                    payment.review_status = 'approved'
                    payment.payment_status = 'queued'
                    payment.save(update_fields=['review_status', 'payment_status'])

            self.message_user(request, f"Successfully approved and credited {queryset.count()} users.")
        except Exception as e:
            self.message_user(request, f"Error processing payments: {str(e)}", messages.ERROR)

    @admin.action(description="Reject selected submissions")
    def reject_payments(self, request, queryset):
        with transaction.atomic():
            queryset.update(review_status='rejected', payment_status='void')
            for payment in queryset:
                assignment = payment.assignment
                assignment.status = 'rejected'
                assignment.flagged = True
                assignment.save(update_fields=['status', 'flagged'])
        
        self.message_user(request, "Selected tasks rejected.", messages.WARNING)

    #admin action to create payment for approved tasks without payment record

@admin.register(TaskAssignment)
class TaskAssignmentAdmin(admin.ModelAdmin):
    list_display = ('user', 'task', 'status', 'flagged')
    @admin.action(description="Create payments for verified tasks")
    def create_payments (self, request, queryset):
        created = 0

        with transaction.atomic():
            for assignment in queryset:
                if assignment.status == 'verified':
                    Payment.objects.create(assignment=assignment)
                    created += 1
                    
            self.message_user(request, f"Created {created} payment records for verified tasks.")        

