from django.dispatch import receiver
from django.db.models.signals import post_save
from django.utils import timezone
from .models import User, Profile
from django.utils.text import slugify
from django.db.models.signals import pre_save

       
#Для создания профиля 
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
             
#Для сохранения профиля    
@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
    
#Для создания slug профиля    
@receiver(pre_save, sender=Profile)
def pre_save_create_slug(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = slugify(instance.user.username)
        