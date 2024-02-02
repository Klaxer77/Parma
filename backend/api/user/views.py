from .serializers import CustomTokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from api.user.serializers import ReservationListSeriaLizer, ReservationCreateSeriaLizer, ReservationHistoryListSeriaLizer
from backend.map.models import Reservation, ReservationHistory
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework import status
from rest_framework.exceptions import ValidationError
from django.contrib import messages


class ReservationCreateView(generics.CreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationCreateSeriaLizer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        start_date = serializer.validated_data['start_date']
        end_date = serializer.validated_data['end_date']
        # place = self.request.META.get('HTTP_PLACE')
        user = self.request.user

        if end_date <= start_date:
            raise ValidationError({'error': 'Дата окончания должна быть позже даты начала'})
        
        
        existing_reservations = Reservation.objects.filter(user=user)
        if existing_reservations.exists():
            raise ValidationError({'error': 'У вас может быть только одна бронь'})
        serializer.save(user=user)
        # place=place
        
        
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'detail': 'Бронь успешно создана'}, status=status.HTTP_201_CREATED, headers=headers)
    
class ReservationHistoryListView(generics.ListAPIView):
    queryset = ReservationHistory.objects.all()
    serializer_class = ReservationHistoryListSeriaLizer
    permission_classes = [IsAuthenticated]
        
class ReservationListView(generics.ListAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationListSeriaLizer
    permission_classes = [IsAuthenticated]

class UserDetailView(APIView):
    def get(self, request):
        user = request.user
        serializer = CustomTokenObtainPairSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)