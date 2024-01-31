from django.contrib import admin
from .models import User
from django.utils.safestring import mark_safe
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin


@admin.register(User)
class UserAdmin(DjangoUserAdmin):

    fieldsets = (
        (None, {'fields': ('image', 'email', 'password')}),
        (('Personal info'), {'fields': ('last_name', 'first_name',  'sur_name', 'gender', 'phone',)}),
        (('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('image', 'email', 'password1', 'password2', 'last_name', 'first_name', 'sur_name', 'phone', 'gender'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)

