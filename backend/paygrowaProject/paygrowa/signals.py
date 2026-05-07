from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db.models import F
from decimal import Decimal
from .models import Payment

@receiver(post_save, sender=Payment)
def update_wallet_on_payment(sender, instance, created, **kwargs):
    # Only trigger when payment is approved and queued
    if instance.review_status == 'approved' and instance.payment_status == 'queued':
        assignment = instance.assignment
        wallet = assignment.user.wallet
        reward = Decimal(str(assignment.task.user_reward))

        to_available = reward * Decimal('0.90')
        to_locked = reward * Decimal('0.10')

        wallet.available_balance = F('available_balance') + to_available
        wallet.locked_savings = F('locked_savings') + to_locked
        wallet.save(update_fields=['available_balance', 'locked_savings'])
