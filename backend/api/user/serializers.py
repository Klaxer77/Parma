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

    
    class Meta:
        model = Place
        fields = (
            'id',
            'name',
            'image',
            'status',
            'reservation_place',
        )
        
class CustomTokenObtainPairSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url='image.url')
    reservation_history = ReservationHistoryListSeriaLizer(many=True, read_only=True)
    reservation=ReservationListSeriaLizer()
    
    
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
            'place': {'required': True}
        }
        
    
        
        
class ConfirmationCodeEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfirmationCodeEmail
        fields = ['code']
        
class ConfirmationCodePhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfirmationCodePhone
        fields = ['code']