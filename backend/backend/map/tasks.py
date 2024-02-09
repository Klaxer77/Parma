from datetime import timedelta
from celery import shared_task
from django.utils import timezone
from backend.map.models import Reservation, ReservationHistory
from backend.user.models import ConfirmationCodeEmail, ConfirmationCodePhone
from datetime import datetime
from django.template.loader import render_to_string
from django.core.mail import EmailMessage



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
        
        
@shared_task
def remove_code_confirm_email():
    current_time = timezone.now()
    expired_codes = ConfirmationCodeEmail.objects.filter(end_date__lte=current_time)
    expired_codes.delete()
    
    
@shared_task
def remove_code_confirm_phone():
    current_time = timezone.now()
    expired_codes = ConfirmationCodePhone.objects.filter(end_date__lte=current_time)
    expired_codes.delete()
    
    
@shared_task   
def code_email(new_email,confirmation_code):
       
    html_content = render_to_string('email/email.html', {'code': confirmation_code})
    subject = 'Подтверждение электронной почты'
    to_email = new_email
        
    email = EmailMessage(subject, html_content, to=[to_email])
    email.content_subtype = 'html'
        
    # with open('path/to/your/image.jpg', 'rb') as image_file:
    #     email.attach('image.jpg', image_file.read(), 'image/jpeg')
        
    email.send()
    
    
