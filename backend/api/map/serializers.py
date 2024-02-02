from rest_framework import serializers
from backend.map.models import Room, Place


        
class PlaceSerialLizer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url='image.url')

    
    class Meta:
        model = Place
        fields = (
            'id',
            'slug',
            'name',
            'image',
            'status',
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