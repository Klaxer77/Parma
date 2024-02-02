from django.contrib import admin
from .models import User
from django.utils.safestring import mark_safe
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin


@admin.register(User)
class UserAdmin(DjangoUserAdmin):

    fieldsets = (
        (None, {'fields': ('image', 'slug', 'email', 'password')}),
        (('Personal info'), {'fields': ('last_name', 'first_name',  'sur_name', 'gender', 'phone',)}),
        (('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('image', 'slug', 'email', 'password1', 'password2', 'last_name', 'first_name', 'sur_name', 'phone', 'gender'),
        }),
    )
    list_display = ('image_show', 'email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    prepopulated_fields = {'slug': ('last_name',)}
    
    def image_show(self,obj):
        if obj.image:
            return mark_safe("<img src='{}' width='80' />".format(obj.image.url))
        return "None"
    
    image_show.__name__ = "Аватар"

