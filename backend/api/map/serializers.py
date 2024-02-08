from rest_framework import serializers
from backend.map.models import Room, Place
# from api.user.serializers import ReservationListSeriaLizer


        
class PlaceSerialLizer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url='image.url')
    # reservation_place=ReservationListSeriaLizer(many=True)

    
    class Meta:
        model = Place
        fields = (
            'id',
            'slug',
            'name',
            'image',
            'status',
            'reservation_place'
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