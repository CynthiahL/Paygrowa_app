from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


# ---------------------------------------------------------------------------
# User Manager
# ---------------------------------------------------------------------------
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


# ---------------------------------------------------------------------------
# User
# ---------------------------------------------------------------------------
class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    wallet_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    # Required by Django admin / auth
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email


# ---------------------------------------------------------------------------
# Task
# ---------------------------------------------------------------------------
class Task(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('paused', 'Paused'),
        ('closed', 'Closed'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    reward = models.DecimalField(max_digits=10, decimal_places=2)
    time_estimate = models.PositiveIntegerField(help_text='Estimated minutes to complete')
    questions = models.JSONField(default=list, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')

    def __str__(self):
        return self.title


# ---------------------------------------------------------------------------
# Submission
# ---------------------------------------------------------------------------
class Submission(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='submissions')
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='submissions')
    answers = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"{self.user.email} → {self.task.title} [{self.status}]"


# ---------------------------------------------------------------------------
# Transaction
# ---------------------------------------------------------------------------
class Transaction(models.Model):
    TYPE_CHOICES = [
        ('earned', 'Earned'),
        ('withdrawn', 'Withdrawn'),
        ('bonus', 'Bonus'),
        ('refund', 'Refund'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='earned')
    task = models.ForeignKey(Task, on_delete=models.SET_NULL, null=True, blank=True, related_name='transactions')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} | {self.type} | ${self.amount}"
