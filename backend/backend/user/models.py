from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator, MaxLengthValidator
from .validators import validate_phone_number
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, UserManager
from django.utils.text import slugify
from django.contrib.auth.hashers import make_password


class CustomUserManager(BaseUserManager):

    def create_user(self, email, password, **extra_fields):

        if not email:
            raise ValueError('The Email must be set')
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
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")
    email = models.EmailField('email address', unique=True)
    username = None
    first_name = models.CharField('Имя', max_length=150, validators=[MinLengthValidator(3)])
    last_name = models.CharField('Фамилия', max_length=150, validators=[MinLengthValidator(4)])
    sur_name = models.CharField('Отчество', max_length=150, validators=[MinLengthValidator(4)])
    gender = models.CharField('Пол', max_length=30, choices=GENDER_CHOICES)
    image = models.ImageField("Аватар", upload_to="avatar/")
    phone = models.CharField(max_length=15, validators=[validate_phone_number])

    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'sur_name', 'gender', 'image', 'phone']
    
        
    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")
    
#     def save(self, *args, **kwargs):
#         if not self.slug:
#             self.slug = slugify(self.user.username)
#         super(Profile, self).save(*args, **kwargs)
        
        
#     def __str__(self):
#         return f'Профиль: {self.user.last_name} {self.user.first_name}'
    

