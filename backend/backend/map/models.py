from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone
from backend.user.models import User
from django.core.validators import MinLengthValidator, MaxLengthValidator
from django.utils.text import slugify



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
        default='свободно',
    )
    
    def __str__(self):
        return f'{self.name}'
    
    class Meta:
        verbose_name = "Место"
        verbose_name_plural = "Места"
        
class Reservation(models.Model):
    user = models.OneToOneField(
        User,
        verbose_name = 'Сотрудник',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    place = models.OneToOneField(
        Place,
        verbose_name='Место',
        on_delete=models.CASCADE,
        null=True,
        blank=True
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
    
        
