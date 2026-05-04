from django.db import models
from django.contrib.auth.models import(AbstractUser, BaseUserManager, PermissionsMixin)
from django.db import transaction

# Create your models here.
#usermanager 
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields) 
    
#user model
class User(AbstractUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    username = None
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)


    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []   

    #create a wallet for each user upon creation
def save(self, *args, **kwargs):
    with transaction.atomic():
        is_new = self._state.adding
        super().save(*args, **kwargs)
        if is_new:
            Wallet.objects.get_or_create(user=self)


    def __str__(self):
        return self.email 
    
#userprofile model to include additional user information
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    education_level = models.CharField(max_length=50, blank=True, null=True)
    languages = models.CharField(max_length=100, blank=True, null=True)
    age = models.PositiveIntegerField(blank=True, null=True)
    gender = models.CharField(max_length=20, blank=True, null=True)

    preferences = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.email} Profile"

#tasks model
class Task(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    description = models.TextField()

    total_earnings = models.DecimalField(max_digits=10, decimal_places=2)# 10
    platform_earnings = models.DecimalField(max_digits=10, decimal_places=2)
    user_reward = models.DecimalField(max_digits=10, decimal_places=2)

    source = models.CharField(max_length=100)
    duration = models.DurationField()

    slots_remaining = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

#task assignment model
class TaskAssignment(models.Model):
    STATUSS = [
        ("assigned","Assigned"),
        ("started","Started"),
        ("submitted","Submitted"),
        ("under_review","Under Review"),
        ("verified","Verified"),
        ("paid","Paid"),
        ("rejected","Rejected"),
        ("opt_out","Opted Out"),
        ("pending_review","Pending Review"),
        ("queued","Payment Queued"),
        ("void","Void"),
        ("approved","Approved")
    ]

    user = models.ForeignKey(User,on_delete=models.CASCADE)
    task = models.ForeignKey(Task,on_delete=models.CASCADE)

    status = models.CharField(max_length=20, choices=STATUSS, default="assigned")

    assigned_at = models.DateTimeField(auto_now_add=True)
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    screenshot = models.ImageField(upload_to="proofs/", null=True, blank=True)
    completion_code = models.CharField(max_length=100, null=True, blank=True)#

    flagged = models.BooleanField(default=False)
    score = models.IntegerField(default=0)
    review_reason = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ("user","task")
    def __str__(self):
        return f"{self.user.email} - {self.task.title}"
    
#payment model to include payment details 
class Payment(models.Model):
    assignment = models.OneToOneField(TaskAssignment,on_delete=models.CASCADE)
    review_status = models.CharField(max_length=20,choices=[
        ("pending_review","Pending Review"),
        ("approved","Approved"),
        ("rejected","Rejected"),
    ], default="pending_review")
    payment_status = models.CharField(max_length=20, choices=[
        ("queued","Payment Queued"),
        ("void","Void")
    ], default="queued")
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.assignment.task.title} - {self.payment_status}"

#wallet model
class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='wallet')
    available_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    locked_savings = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.user.email} Wallet"