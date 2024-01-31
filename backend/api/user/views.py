from .serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response



class UserDetailView(APIView):
    def get(self, request):
        user = request.user
        serializer = CustomTokenObtainPairSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)