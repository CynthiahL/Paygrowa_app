from django.apps import AppConfig


class PaygrowaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'paygrowa'

    def ready(self):
        import paygrowa.signals