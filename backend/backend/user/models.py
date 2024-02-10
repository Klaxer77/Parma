from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator
from .validators import validate_phone_number
from django.contrib.auth.models import BaseUserManager
from django.utils import timezone


class CustomUserManager(BaseUserManager):

    def create_user(self, email, password, **extra_fields):

        if not email:
            raise ValueError('Электронная почта должна быть установлена')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    GENDER_CHOICES = (
        ('Мужской', 'Мужской'),
        ('Женский', 'Женский'),
    )
    email = models.EmailField('email address', unique=True)
    username = None
    first_name = models.CharField('Имя', max_length=150, validators=[MinLengthValidator(3)])
    last_name = models.CharField('Фамилия', max_length=150, validators=[MinLengthValidator(4)])
    sur_name = models.CharField('Отчество', max_length=150, validators=[MinLengthValidator(4)])
    gender = models.CharField('Пол', max_length=30, choices=GENDER_CHOICES)
    image = models.ImageField("Аватар", upload_to="avatar/",)
    phone = models.CharField(max_length=15, validators=[validate_phone_number])

    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return f'{self.last_name} {self.first_name} {self.sur_name}'
        
    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"
        
        
class ConfirmationCodeEmail(models.Model):
    code = models.CharField(max_length=6)
    email = models.EmailField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    end_date = models.DateTimeField(
        "Дата окончания срока кода",
       default=timezone.now,
    )
    
    def __str__(self):
        return f'Код подтверждения для электронной почты: {self.email}'
    
    def save(self, *args, **kwargs):
        if not self.pk:
            self.end_date += timezone.timedelta(hours=1)
        super(ConfirmationCodeEmail, self).save(*args, **kwargs)
    
    
    class Meta:
        verbose_name = "Код подтверждения электронной почты"
        verbose_name_plural = "Коды подтверждения электронной почты"
    
class ConfirmationCodePhone(models.Model):
    code = models.CharField(max_length=6)
    phone = models.CharField(max_length=15, null=True, validators=[validate_phone_number])
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    end_date = models.DateTimeField(
        "Дата окончания срока кода",
       default=timezone.now,
    )
    
    def save(self, *args, **kwargs):
        if not self.pk:
            self.end_date += timezone.timedelta(hours=1)
        super(ConfirmationCodePhone, self).save(*args, **kwargs)
    
    def __str__(self):
        return f'Код подтверждения для номера: {self.phone}'
    
    class Meta:
        verbose_name = "Код подтверждения номера телефона"
        verbose_name_plural = "Коды подтверждения номера телефона"
    

    
    
    

