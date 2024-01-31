from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone
from backend.user.models import User
from django.core.validators import MinLengthValidator, MaxLengthValidator
from django.utils.text import slugify


class Place(models.Model):
    name = models.CharField('Название', max_length=50, validators=[MinLengthValidator(3)])
    user = models.ForeignKey(
        User,
        verbose_name = 'Сотрудник',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")
    image = models.ImageField("Фото места", upload_to="place/")
    start_date = models.DateTimeField(
        "Дата начала бронирования",
        default=timezone.now,
    )
    end_date = models.DateTimeField(
        "Дата окончания бронирования",
        default=timezone.now,
    )
    
    def __str__(self):
        return f'{self.name}'
    
    def clean(self):

        if self.start_date >= self.end_date:
            raise ValidationError("Дата окончания должна быть позже даты начала.")

        conflicting_reservations = Place.objects.filter(start_date__lt=self.end_date, end_date__gt=self.start_date)
        if conflicting_reservations.exists():
            raise ValidationError("Для этого места существует конфликтующее бронирование, проверьте правильность введенных дат")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
    
    
    class Meta:
        verbose_name = "Место"
        verbose_name_plural = "Места"
    

class Room(models.Model):
    places = models.ManyToManyField(
        Place,
        verbose_name="Места",
        # limit_choices_to={'id__in': Place.objects.annotate(num_rooms=models.Count('place')).filter(num_rooms__lt=4)}
    )
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")
    name = models.CharField('Название', max_length=50, validators=[MinLengthValidator(3)])
    
    def __str__(self):
        return f'{self.name}'
    
    
    class Meta:
        verbose_name = "Комната"
        verbose_name_plural = "Комнаты"
    
    
    # def clean(self):
    #     if self.places.room_set.count() >= 4:
    #         raise ValidationError("Достигнуто максимальное количество мест для этой комнаты")

    # def save(self, *args, **kwargs):
    #     if self.places.room_set.count() >= 4:
    #         raise ValidationError("Достигнуто максимальное количество мест для этой комнаты")
    #     super().save(*args, **kwargs)
        
