from rest_framework import serializers
from backend.map.models import Room, Place, Reservation
from api.user.serializers import CustomTokenObtainPairSerializer


        
class PlaceSerialLizer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url='image.url', read_only=True)

    
    class Meta:
        model = Place
        fields = (
            'id',
            'slug',
            'name',
            'image',
        )
class ReservationSeriaLizer(serializers.ModelSerializer):
    user = CustomTokenObtainPairSerializer(required=False)
    place =  PlaceSerialLizer(required=False)

    class Meta:
        model = Reservation
        fields = (
            'id',
            'user',
            'place',
            'start_date',
            'end_date',
        )
        
class RoomSeriaLizer(serializers.ModelSerializer):
    places = PlaceSerialLizer(many=True)
    
    class Meta:
        model = Room
        fields = (
            'id',
            'slug',
            'name',
            'places',
        )