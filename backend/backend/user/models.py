from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator, MaxLengthValidator
from .validators import validate_phone_number
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, UserManager
from django.utils.text import slugify



class CustomUserManager(BaseUserManager):
        
    def create_user(self, email, password=None, username=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)  # This line hashes the password
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, username=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        user = self.create_user(email, password, username, **extra_fields)
        user.set_password(password) 
        user.save(using=self._db)
        return user

class User(AbstractUser):
    GENDER_CHOICES = (
        ('M', 'Мужской'),
        ('F', 'Женский'),
    )
    email = models.EmailField('email address', unique=True)
    username = models.CharField(max_length=150, null=True, blank=True)
    first_name = models.CharField('Имя', max_length=150, validators=[MinLengthValidator(3)])
    last_name = models.CharField('Фамилия', max_length=150, validators=[MinLengthValidator(4)])
    sur_name = models.CharField('Отчество', max_length=150, validators=[MinLengthValidator(4)])
    gender = models.CharField('Пол', max_length=1, choices=GENDER_CHOICES)
    image = models.ImageField("Аватар", upload_to="avatar/")
    phone = models.CharField(max_length=15, validators=[validate_phone_number])
    
    objects = CustomUserManager()

    REQUIRED_FIELDS = ['first_name', 'last_name', 'sur_name', 'gender', 'phone', 'image']
    USERNAME_FIELD = 'email'
    
    def save(self, *args, **kwargs):
        if not self.pk:  
            self.set_password(self.password)  
        super().save(*args, **kwargs)
        
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
    

