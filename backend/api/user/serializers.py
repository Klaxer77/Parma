from rest_framework import serializers
from backend.user.models import User, ConfirmationCodeEmail, ConfirmationCodePhone
from backend.map.models import Reservation, ReservationHistory
from backend.map.models import Room, Place
from importlib import import_module


class ReservationHistoryListSeriaLizer(serializers.ModelSerializer):
    # user = CustomTokenObtainPairSerializer(required=False)
    place =  serializers.SerializerMethodField()
    
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
        )
        
               

class ReservationListSeriaLizer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    place =  serializers.SerializerMethodField()
    
    
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
        )
        
class PlaceSerialLizer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url='image.url')
    reservation_place=ReservationListSeriaLizer()
    room=serializers.SerializerMethodField()
    
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
        

class ReservationCreateSeriaLizer(serializers.ModelSerializer):
    user = CustomTokenObtainPairSerializer(required=False)


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