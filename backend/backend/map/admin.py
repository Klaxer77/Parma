from django.contrib import admin
from .models import Room, Place, Reservation, ReservationHistory, Map
from django.utils.safestring import mark_safe

admin.site.register(Reservation)
admin.site.register(ReservationHistory)


@admin.register(Map)
class MapAdmin(admin.ModelAdmin):
    filter_horizontal=('room',)

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('name',)
    list_display_links = ('name',)
    fields = ('places', 'name',)
    filter_horizontal = ('places',)

          

@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    list_display = ('image_show', 'name', 'status',)
    list_display_links = ('image_show', 'name', 'status')
    fields = ('image', 'name', 'status')


    
    
    def image_show(self,obj):
        if obj.image:
            return mark_safe("<img src='{}' width='60' />".format(obj.image.url))
        return "None"
    
    image_show.__name__ = "Фото места"
    