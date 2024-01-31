from django.contrib import admin
from .models import User
from django.utils.safestring import mark_safe

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    fields = ('image', 'first_name', 'last_name', 'gender', 'email', 'phone', 'password')
    list_display = ('image_show', 'first_name', 'last_name', 'sur_name', 'email', 'phone')
    list_display_links = ('image_show', 'first_name', 'last_name', 'email', 'phone')
    
    
    def image_show(self,obj):
        if obj.image:
            return mark_safe("<img src='{}' width='60' />".format(obj.image.url))
        return "None"
    
    image_show.__name__ = "Главный аватар"
