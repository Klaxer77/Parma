from datetime import timedelta
from celery import shared_task
from django.utils import timezone
from backend.map.models import Reservation, ReservationHistory
from datetime import datetime

@shared_task
def move_expired_reservations_to_history():
    expired_reservations = Reservation.objects.filter(end_date__lte=timezone.now())

    for reservation in expired_reservations:
        user = reservation.user
        place = reservation.place
        start_date = reservation.start_date
        end_date = reservation.end_date

        ReservationHistory.objects.create(user=user, place=place, start_date=start_date, end_date=end_date)

        reservation.delete()