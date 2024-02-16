from backend.map.models import Place, Room, Reservation, ReservationHistory
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from django.contrib import messages
from api.user.serializers import PlaceSerialLizer, RoomSeriaLizer
from .serializers import MapSerialLizer
from backend.map.models import Map

class MapView(generics.ListAPIView):
    queryset=Map.objects.all().prefetch_related('room')
    serializer_class=MapSerialLizer
    permission_classes= [IsAuthenticated]


class PlaceListView(generics.ListAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceSerialLizer
    permission_classes = [IsAuthenticated]
    
    
class RoomListView(generics.ListAPIView):
    queryset = Room.objects.all().prefetch_related('places')
    serializer_class = RoomSeriaLizer
    permission_classes = [IsAuthenticated]