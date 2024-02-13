import csv
from django.contrib import admin
from .models import Room, Place, Reservation, ReservationHistory, Map
from django.utils.safestring import mark_safe
from django.http import HttpResponse



class ReservationAdmin(admin.ModelAdmin):
    list_display = ['user', 'place', 'start_date', 'end_date']
    list_filter = ['place', 'start_date', 'end_date', 'user']


class ReservationHistoryAdmin(admin.ModelAdmin):
    list_display = ['user', 'place', 'start_date', 'end_date']
    list_filter = ['place', 'start_date', 'end_date', 'user']
    actions = ['export_to_csv']
    
    def export_to_csv(self, request, queryset):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="reservations.csv"'

        writer = csv.writer(response, delimiter=';', quoting=csv.QUOTE_NONNUMERIC)

        writer.writerow(['User ID', 'Имя', 'Фамилия', 'Отчество', 'Место', 'Дата начала', 'Дата окончания'])
    
        for reservation in queryset:
            writer.writerow([
                reservation.user.id, 
                reservation.user.first_name, 
                reservation.user.last_name,
                reservation.user.sur_name, 
                reservation.place.name, 
                reservation.start_date.strftime('%Y-%m-%d %H:%M'), 
                reservation.end_date.strftime('%Y-%m-%d %H:%M')
            ])

        return response

    export_to_csv.short_description = 'Экспортировать в CSV'
    


admin.site.register(Reservation, ReservationAdmin)
admin.site.register(ReservationHistory, ReservationHistoryAdmin)


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
    