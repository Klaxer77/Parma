from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from backend.user.models import User

class CustomTokenObtainPairSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url='image.url', read_only=True)

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