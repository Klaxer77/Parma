from rest_framework import serializers
from backend.user.models import User, ConfirmationCodeEmail, ConfirmationCodePhone
from backend.map.models import Reservation, ReservationHistory
from backend.map.models import Room, Place
from importlib import import_module
from datetime import datetime
from django.utils import timezone
import pytz
from rest_framework.exceptions import ValidationError
from rest_framework.validators import UniqueValidator

class ReservationHistoryListSeriaLizer(serializers.ModelSerializer):
    place =  serializers.SerializerMethodField()
    room = serializers.SerializerMethodField() 

    def get_room(self, obj):
        place = obj.place
        if place:
            rooms = place.room.all()
            room_data = []

            for room in rooms:
                room_name = room.name if room.name else "Unknown"
                room_data.append({'name': room_name})

            return room_data
        else:
            return None


    
    def get_modules(self, obj):
        PlaceSerialLizer = import_module('.PlaceSerialLizer', package=__package__)
        return PlaceSerialLizer(obj.modules.all(), many=True).data
    
    def get_place(self, obj):
        place = obj.place
        place_data = {
            'id': place.id,
            'name': place.name,
            'image': place.image.url,
            'status': place.status,
        }
        return place_data

    class Meta:
        model = ReservationHistory
        fields = (
            'id',
            'user',
            'place',
            'start_date',
            'end_date',
            'room',
        )
        
               

class ReservationListSeriaLizer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    place =  serializers.SerializerMethodField()
    remaining_time = serializers.SerializerMethodField()

    def get_remaining_time(self, obj):
        current_time = timezone.now()
        remaining_time = obj.end_date - current_time
        days = remaining_time.days
        hours = remaining_time.days * 24 + remaining_time.seconds // 3600
        minutes = (remaining_time.seconds % 3600) // 60
        formatted_time = f"{days:02d}:{hours:02d}:{minutes:02d}"
        return formatted_time
    
    
    def get_modules(self, obj):
        CustomTokenObtainPairSerializer = import_module('.CustomTokenObtainPairSerializer', package=__package__)
        return CustomTokenObtainPairSerializer(obj.modules.all(), many=True).data
    
    
    def get_user(self, obj):
        user = obj.user
        user_data = {
            'id': user.id,
            'email': user.email,
            'image': user.image.url,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'sur_name': user.sur_name,
            'gender': user.gender,
            'phone': user.phone,
        }
        return user_data
    
    
    def get_modules(self, obj):
        PlaceSerialLizer = import_module('.PlaceSerialLizer', package=__package__)
        return PlaceSerialLizer(obj.modules.all(), many=True).data
    
    def get_place(self, obj):
        place = obj.place
        place_data = {
            'id': place.id,
            'name': place.name,
            'image': place.image.url,
            'status': place.status,
        }
        return place_data

    class Meta:
        model = Reservation
        fields = (
            'id',
            'user',
            'place',
            'start_date',
            'end_date',
            'remaining_time',
        )
        
class PlaceSerialLizer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url='image.url')
    reservation_place=ReservationListSeriaLizer()
    room=serializers.SerializerMethodField()
    remaining_time = serializers.SerializerMethodField()

    def get_remaining_time(self, obj):
        current_time = timezone.now()
        reservation = Reservation.objects.filter(place=obj).first() 
        if reservation:
            remaining_time = reservation.end_date - current_time
            days = remaining_time.days
            hours = remaining_time.days * 24 + remaining_time.seconds // 3600
            minutes = (remaining_time.seconds % 3600) // 60
            formatted_time = f"{days:02d}:{hours:02d}:{minutes:02d}"
            return formatted_time
        return None
    
    def get_modules(self, obj):
        RoomSeriaLizer = import_module('.RoomSeriaLizer', package=__package__)
        return RoomSeriaLizer(obj.modules.all(), many=True).data
    
    def get_room(self, obj):
        rooms = obj.room.all()  
        room_data = []
    
        for room in rooms:
            room_name = room.name if room.name else "Unknown"  
            room_data.append({'name': room_name})
    
        return room_data
    
    class Meta:
        model = Place
        fields = (
            'id',
            'name',
            'image',
            'status',
            'reservation_place',
            'room',
            'remaining_time',
        )
        
class CustomTokenObtainPairSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url='image.url')
    reservation_history = ReservationHistoryListSeriaLizer(many=True, read_only=True)
    reservation=ReservationListSeriaLizer()
    room = serializers.SerializerMethodField() 

    def get_room(self, obj):
        reservation = getattr(obj, 'reservation', None)
        if reservation:
            place = reservation.place
            rooms = place.room.all()
            room_data = []

            for room in rooms:
                room_name = room.name if room.name else "Unknown"
                room_data.append({'name': room_name})

            return room_data
        else:
            return None


    class Meta:
        model = User
        fields = (
            'id',
            'last_name',
            'first_name',
            'sur_name',
            'gender',
            'image',
            'email',
            'phone',
            'reservation_history',
            'reservation',
            'room',
        )
        
class RoomSeriaLizer(serializers.ModelSerializer):
    places = PlaceSerialLizer(many=True)
    
    class Meta:
        model = Room
        fields = (
            'id',
            'name',
            'places',
        )
        

class CustomDateTimeField(serializers.DateTimeField):
    def to_representation(self, value):
        return value.strftime('%d.%m.%Y %H:%M')

    def to_internal_value(self, data):
        try:
            date_obj = datetime.strptime(data, '%d.%m.%Y %H:%M')
            # Attach timezone information to the parsed datetime
            aware_date_obj = pytz.timezone('Asia/Yekaterinburg').localize(date_obj)
            return aware_date_obj
        except ValueError:
            raise serializers.ValidationError("Некоректная дата. Используйте DD.MM.YYYY HH:MM формат")
        
class CustomPlaceValidator(UniqueValidator):
    message = "Бронь с таким местом уже существует, пожалуйста, обновите страницу"


class ReservationCreateSeriaLizer(serializers.ModelSerializer):
    user = CustomTokenObtainPairSerializer(required=False)
    start_date = CustomDateTimeField()
    end_date = CustomDateTimeField()
    place = serializers.PrimaryKeyRelatedField(
        queryset=Place.objects.all(),
        validators=[CustomPlaceValidator(queryset=Reservation.objects.all())]
    )
    
    class Meta:
        model = Reservation
        fields = (
            'id',
            'user',
            'place',
            'start_date',
            'end_date',
        )
        extra_kwargs = {
            'place': {'required': True},
        }


        

        
    
        
        
class ConfirmationCodeEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfirmationCodeEmail
        fields = ['code']
        
class ConfirmationCodePhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfirmationCodePhone
        fields = ['code']