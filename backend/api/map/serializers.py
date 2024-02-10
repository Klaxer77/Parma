from rest_framework import serializers
from backend.map.models import Map
from api.user.serializers import RoomSeriaLizer

class MapSerialLizer(serializers.ModelSerializer):
    room=RoomSeriaLizer(many=True)
    
    class Meta:
        model = Map
        fields = (
            'room',
        )
        
