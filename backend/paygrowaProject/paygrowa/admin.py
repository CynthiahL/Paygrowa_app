from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Task, Submission, Transaction


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    ordering = ('email',)
    list_display = ('email', 'name', 'wallet_balance', 'is_staff', 'is_active')
    search_fields = ('email', 'name')
    list_filter = ('is_staff', 'is_active')

    fieldsets = (
        (None,           {'fields': ('email', 'password')}),
        ('Info',         {'fields': ('name', 'wallet_balance')}),
        ('Permissions',  {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Last login',   {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2'),
        }),
    )
    readonly_fields = ('last_login',)


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'reward', 'time_estimate', 'status')
    list_filter = ('status',)
    search_fields = ('title',)


@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'task', 'get_task_id', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('user__email', 'task__title')
    readonly_fields = ('created_at',)

    @admin.display(description='Task ID')
    def get_task_id(self, obj):
        return obj.task.id


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'amount', 'type', 'task', 'get_task_id', 'created_at')
    list_filter = ('type',)
    search_fields = ('user__email', 'task__title')
    readonly_fields = ('created_at',)

    @admin.display(description='Task ID')
    def get_task_id(self, obj):
        return obj.task.id if obj.task else '—'
