from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone
from backend.user.models import User
from django.core.validators import MinLengthValidator, MaxLengthValidator
from django.utils.text import slugify
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from datetime import datetime


class Place(models.Model):
    STATUS_CHOICES = [
        ('Забронировано', 'Забронировано'),
        ('Свободно', 'Свободно'),
    ]
    name = models.CharField('Название', max_length=50, validators=[MinLengthValidator(3)])
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")
    image = models.ImageField("Фото места", upload_to="place/")
    status = models.CharField(
        "Статус",
        max_length=13,
        choices=STATUS_CHOICES,
        default='Свободно',
    )
    
    def __str__(self):
        return f'{self.name}'
    
    
    class Meta:
        verbose_name = "Место"
        verbose_name_plural = "Места"
        
class ReservationHistory(models.Model):
    user = models.ForeignKey(
        User,
        verbose_name = 'Сотрудник',
        on_delete=models.CASCADE,
        related_name='reservation_history',
    )
    place = models.ForeignKey(
        Place,
        verbose_name='Место',
        on_delete=models.CASCADE,
    )
    start_date = models.DateTimeField(
        "Дата начала бронирования",
        default=timezone.now,
    )
    end_date = models.DateTimeField(
        "Дата окончания бронирования",
        default=timezone.now,
    )
    
    def __str__(self):
        return f'История брони: {self.user.last_name} {self.user.first_name} {self.user.sur_name}'
    
    class Meta:
        verbose_name = "История брони"
        verbose_name_plural = "История брони"
        
class Reservation(models.Model):
    user = models.OneToOneField(
        User,
        verbose_name = 'Сотрудник',
        on_delete=models.CASCADE,
        null=True
    )
    place = models.OneToOneField(
        Place,
        verbose_name='Место',
        on_delete=models.CASCADE,
        related_name='reservation_place',
        null=True
    )
    start_date = models.DateTimeField(
        "Дата начала бронирования",
        default=timezone.now,
    )
    end_date = models.DateTimeField(
        "Дата окончания бронирования",
        default=timezone.now,
    )
    
    def __str__(self):
        return f'Бронь №{self.id}'
    
    class Meta:
        verbose_name = "Бронь"
        verbose_name_plural = "Брони"
    
    def clean(self):

        if self.start_date >= self.end_date:
            raise ValidationError("Дата окончания должна быть позже даты начала")
        

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
    

class Room(models.Model):
    places = models.ManyToManyField(
        Place,
        verbose_name="Места",
    )
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")
    name = models.CharField('Название', max_length=50, validators=[MinLengthValidator(3)])
    
    def __str__(self):
        return f'{self.name}'
    
    
    class Meta:
        verbose_name = "Комната"
        verbose_name_plural = "Комнаты"
        
class Map(models.Model):
    room = models.ManyToManyField(
        Room,
        verbose_name='Комнаты'
    )
    
    def __str__(self):
        return f'Вся карта'
    
    class Meta:
        verbose_name='Карта'
        verbose_name_plural='Карта'
        
            
@receiver(post_save, sender=Reservation)
@receiver(post_delete, sender=Reservation)
def update_place_status(sender, instance, **kwargs):
    place = instance.place
    reservations_exist = Reservation.objects.filter(place=place).exists()
    if reservations_exist:
        place.status = 'Забронировано'
    else:
        place.status = 'Свободно' 
    place.save()
    
    
    
# @receiver(post_save, sender=Reservation)
# def move_to_history(sender, instance, created, **kwargs):
#     if not created:  
#         if instance.end_date < timezone.now():  
#             ReservationHistory.objects.create(
#                 user=instance.user,
#                 place=instance.place,
#                 start_date=instance.start_date,
#                 end_date=instance.end_date
#             )
#             instance.delete()
