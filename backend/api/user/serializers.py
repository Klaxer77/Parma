from rest_framework import serializers
from backend.user.models import User, ConfirmationCodeEmail, ConfirmationCodePhone
from backend.map.models import Reservation, ReservationHistory
from api.map.serializers import PlaceSerialLizer




class ReservationHistoryListSeriaLizer(serializers.ModelSerializer):
    # user = CustomTokenObtainPairSerializer(required=False)
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
        
         


class CustomTokenObtainPairSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url='image.url')
    reservation_history = ReservationHistoryListSeriaLizer(many=True, read_only=True)

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
        )
            

class ReservationListSeriaLizer(serializers.ModelSerializer):
    user = CustomTokenObtainPairSerializer(required=False)
    place = PlaceSerialLizer()

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