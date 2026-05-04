from django.contrib import admin, messages
from django.db import transaction
from .models import Payment
from django.utils.html import format_html  
from decimal import Decimal
from django.db.models import F
# Register your models here.
# admin.py


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('assignment', 'display_code', 'display_screenshot', 'review_status', 'payment_status')
    actions = ['approve_payments', 'reject_payments']
    
    # Pre-fetches related data for the list view and the actions
    list_select_related = ('assignment__task', 'assignment__user__wallet')

    @admin.display(description="Code")
    def display_code(self, obj):
        return obj.assignment.completion_code

    @admin.display(description="Screenshot")
    def display_screenshot(self, obj):
        if obj.assignment.screenshot:
            return format_html('<a href="{0}" target="_blank"><img src="{0}" style="height:30px;"/></a>', obj.assignment.screenshot.url)
        return "-"

    @admin.action(description="Approve selected and credit wallets")
    def approve_payments(self, request, queryset):
        try:
            with transaction.atomic():
                # 1. Bulk update the payments
                queryset.update(review_status='approved', payment_status='queued')

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

                    # 4. Update Wallet using F() for safety
                    wallet.available_balance = F('available_balance') + to_available
                    wallet.locked_savings = F('locked_savings') + to_locked
                    wallet.save(update_fields=['available_balance', 'locked_savings'])

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


