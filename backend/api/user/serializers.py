from rest_framework import serializers
from backend.user.models import User
from backend.map.models import Reservation, ReservationHistory
from api.map.serializers import PlaceSerialLizer

class CustomTokenObtainPairSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url='image.url')

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
        )
        
class ReservationHistoryListSeriaLizer(serializers.ModelSerializer):
    user = CustomTokenObtainPairSerializer(required=False)
    place =  PlaceSerialLizer()

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
    user = CustomTokenObtainPairSerializer(required=False)
    place =  PlaceSerialLizer()

    class Meta:
        model = Reservation
        fields = (
            'id',
            'user',
            'place',
            'start_date',
            'end_date',
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