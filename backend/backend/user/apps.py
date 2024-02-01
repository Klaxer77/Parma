from django.apps import AppConfig


class UserConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend.user'
    
    # def ready(self):
    #     import backend.user.signals
