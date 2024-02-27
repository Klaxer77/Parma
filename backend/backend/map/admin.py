import csv
from django.contrib import admin
from .models import Room, Place, Reservation, ReservationHistory, Map
from django.utils.safestring import mark_safe
from django.http import HttpResponse
from django.utils import timezone


class ReservationAdmin(admin.ModelAdmin):
    list_display = ['user', 'place', 'start_date', 'end_date', 'remaining_time']
    list_filter = ['place', 'start_date', 'end_date', 'user',]
    
    def remaining_time(self, obj):
        current_time = timezone.now()
        remaining_time = obj.end_date - current_time
        days = remaining_time.days
        hours = remaining_time.days * 24 + remaining_time.seconds // 3600
        minutes = (remaining_time.seconds % 3600) // 60
        formatted_time = f"{days:02d}:{hours:02d}:{minutes:02d}"
        return formatted_time
    
    remaining_time.short_description = 'Оставшееся время бронирования'


class ReservationHistoryAdmin(admin.ModelAdmin):
    list_display = ['user', 'place', 'start_date', 'end_date']
    list_filter = ['place', 'start_date', 'end_date', 'user']
    actions = ['export_to_csv']
    
    def export_to_csv(self, request, queryset):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="reservations.csv"'

        writer = csv.writer(response, delimiter=';', quoting=csv.QUOTE_NONNUMERIC)

        writer.writerow(['User ID', 'Имя', 'Фамилия', 'Отчество', 'Место', 'Комната', 'Дата начала', 'Дата окончания'])
        
    
        for reservation in queryset:
            place_name = reservation.place.name
            room_names = ", ".join(room.name for room in reservation.place.room.all())
            start_date_local = reservation.start_date.astimezone(timezone.get_current_timezone())
            end_date_local = reservation.end_date.astimezone(timezone.get_current_timezone())
            writer.writerow([
                reservation.user.id, 
                reservation.user.first_name, 
                reservation.user.last_name,
                reservation.user.sur_name, 
                place_name,
                room_names,
                start_date_local.strftime('%Y-%m-%d %H:%M'),
            end_date_local.strftime('%Y-%m-%d %H:%M')
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
    list_display = ('image_show', 'name', 'status', 'published', 'id')
    list_display_links = ('image_show', 'name', 'status')
    fields = ('image', 'name', 'status', 'published')



    def image_show(self,obj):
        if obj.image:
            return mark_safe("<img src='{}' width='60' />".format(obj.image.url))
        return "None"
    
    image_show.__name__ = "Фото места"
    