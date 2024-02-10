from django.contrib import admin
from .models import User, ConfirmationCodeEmail, ConfirmationCodePhone
from django.utils.safestring import mark_safe
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
# from admin_interface.models import Theme


# admin.site.unregister(Theme)

admin.site.register(ConfirmationCodeEmail)
admin.site.register(ConfirmationCodePhone)



@admin.register(User)
class UserAdmin(DjangoUserAdmin):

    fieldsets = (
        (None, {'fields': ('image','email', 'password')}),
        (('Personal info'), {'fields': ('last_name', 'first_name',  'sur_name', 'gender', 'phone',)}),
        (('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('image','email', 'password1', 'password2', 'last_name', 'first_name', 'sur_name', 'phone', 'gender'),
        }),
    )
    list_display = ('image_show', 'email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    save_on_top = True
    
    def image_show(self,obj):
        if obj.image:
            return mark_safe("<img src='{}' width='80' />".format(obj.image.url))
        return "None"
    
    image_show.__name__ = "Аватар"


