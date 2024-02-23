from .serializers import CustomTokenObtainPairSerializer, ConfirmationCodeEmailSerializer, ConfirmationCodePhoneSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from api.user.serializers import ReservationListSeriaLizer, ReservationCreateSeriaLizer, ReservationHistoryListSeriaLizer
from backend.map.models import Reservation, ReservationHistory
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view
from backend.user.models import ConfirmationCodeEmail, ConfirmationCodePhone
from backend.user.utils import generate_confirmation_code
from django.core.validators import validate_email
from backend.map.tasks import code_email
from datetime import datetime
import pytz
import requests
from django.utils import timezone

class ChangePhoneView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        new_phone = request.data.get('new_phone')
        if not new_phone:
            return Response({'error': 'Введите новый номер телефона'}, status=400)

        
        confirmation_code = generate_confirmation_code()
        ConfirmationCodePhone.objects.create(user=request.user, phone=new_phone, code=confirmation_code)

        api_key = 'FE33CF10-C23F-E3BA-F726-AB080A5BFC99' 
        url = 'https://sms.ru/sms/send'
        payload = {
            'api_id': api_key,
            'to': new_phone,
            'msg': f'Код подтверждения: {confirmation_code}',
            'json': 1
        }

        requests.get(url, params=payload)

        return Response({'message': 'Код подтверждения отправлен на ваш новый номер телефона и действителен в течении 1-ого часа'}, status=200)
    

class ConfirmPhoneChangeView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        confirmation_code = request.data.get('confirmation_code')
        if not confirmation_code:
            return Response({'error': 'Введите код подтверждения'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            confirmation = ConfirmationCodePhone.objects.get(code=confirmation_code, user=request.user)
            user = confirmation.user
            user.phone = confirmation.phone
            user.save()
            confirmation.delete()
            return Response({'message': 'Изменение номера телефона успешно выполнено'}, status=status.HTTP_200_OK)
        except ConfirmationCodePhone.DoesNotExist:
            return Response({'error': 'Код подтверждения неверный или срок его действия истёк'}, status=status.HTTP_400_BAD_REQUEST)


class ChangeEmailView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        new_email = request.data.get('new_email')
        
        try:
            validate_email(new_email)
        except:
            return Response({'error': 'Неверный адрес электронной почты'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not new_email:
            return Response({'error': 'Введите новый адрес электронной почты'}, status=400)

        confirmation_code = generate_confirmation_code()
        ConfirmationCodeEmail.objects.create(user=request.user, email=new_email, code=confirmation_code)
        
        code_email.delay(new_email,confirmation_code)

        return Response({'message': 'Код подтверждения отправлен на ваш новый адрес электронной почты и действителен в течении 1-ого часа'}, status=200)


    

class ConfirmEmailChangeView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        confirmation_code = request.data.get('confirmation_code')
        if not confirmation_code:
            return Response({'error': 'Введите код подтверждения'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            confirmation = ConfirmationCodeEmail.objects.get(code=confirmation_code, user=request.user)
            user = confirmation.user
            user.email = confirmation.email
            user.save()
            confirmation.delete()
            return Response({'message': 'Изменение электронной почты успешно выполнено'}, status=status.HTTP_200_OK)
        except ConfirmationCodeEmail.DoesNotExist:
            return Response({'error': 'Код подтверждения неверный или срок его действия истёк'}, status=status.HTTP_400_BAD_REQUEST)


class ReservationCreateView(generics.CreateAPIView):
    queryset = Reservation.objects.all().select_related('user').select_related('place')
    serializer_class = ReservationCreateSeriaLizer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        start_date = serializer.validated_data['start_date']
        end_date = serializer.validated_data['end_date']
        # place = self.request.META.get('HTTP_PLACE')
        user = self.request.user
        # current_time = timezone.now()
        current_time_aware = datetime.now(pytz.timezone('Asia/Yekaterinburg'))
        # start_date_naive = start_date.astimezone(pytz.timezone('Asia/Yekaterinburg')).replace(tzinfo=None)

        if start_date <= current_time_aware:
            raise ValidationError({'error': 'Дата начала должна быть меньше или равна текущему времени'})

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


class ReservationDeleteView(generics.DestroyAPIView):
        queryset = Reservation.objects.all().select_related('user').select_related('place')
        serializer_class = ReservationListSeriaLizer
        permission_classes=[IsAuthenticated]
        lookup_field = 'pk'
        
        def get_queryset(self):
            user = self.request.user
            return Reservation.objects.filter(user=user)

        
        def destroy(self, request, *args, **kwargs):
            instance = self.get_object()
            ReservationHistory.objects.create(
            user = instance.user,
            place = instance.place,
            start_date = instance.start_date,
            end_date = timezone.now()
            )
            self.perform_destroy(instance)
            return Response({'detail': 'Бронь успешно удалена'}, status=status.HTTP_204_NO_CONTENT)


        
class ReservationListView(generics.ListAPIView):
    queryset = Reservation.objects.all().select_related('user').select_related('place')
    serializer_class = ReservationListSeriaLizer
    permission_classes = [IsAuthenticated]

class UserDetailView(APIView):
    def get(self, request):
        user = request.user
        serializer = CustomTokenObtainPairSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def get_queryset(self):
        user = self.request.user
        return ReservationHistoryListSeriaLizer.objects.filter(user=user)
    
@api_view(['POST'])
def set_password(request):
    if request.method == 'POST':
        current_password = request.POST.get('current_password')
        new_password = request.POST.get('new_password')
        re_new_password = request.POST.get('re_new_password')

        if new_password == re_new_password:
            if request.user.check_password(current_password):
                request.user.set_password(new_password)
                request.user.save()
                return Response({'detail': 'Пароль успешно изменён, войдите в систему с новыми данными'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': 'Текущий пароль неверный'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error': 'Новый пароль и его повторное введение не совпадают'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Метод запроса должен быть POST'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)