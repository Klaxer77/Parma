

import backend.user.validators
import django.core.validators
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('first_name', models.CharField(max_length=150, validators=[django.core.validators.MinLengthValidator(3)], verbose_name='Имя')),
                ('last_name', models.CharField(max_length=150, validators=[django.core.validators.MinLengthValidator(4)], verbose_name='Фамилия')),
                ('sur_name', models.CharField(max_length=150, validators=[django.core.validators.MinLengthValidator(4)], verbose_name='Отчество')),
                ('gender', models.CharField(choices=[('Мужской', 'Мужской'), ('Женский', 'Женский')], max_length=30, verbose_name='Пол')),
                ('image', models.ImageField(upload_to='avatar/', verbose_name='Аватар')),
                ('phone', models.CharField(max_length=15, validators=[backend.user.validators.validate_phone_number])),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'Пользователь',
                'verbose_name_plural': 'Пользователи',
            },
        ),
        migrations.CreateModel(
            name='ConfirmationCodeEmail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=6)),
                ('email', models.EmailField(max_length=254, null=True)),
                ('end_date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Дата окончания срока кода')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Код подтверждения электронной почты',
                'verbose_name_plural': 'Коды подтверждения электронной почты',
            },
        ),
        migrations.CreateModel(
            name='ConfirmationCodePhone',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=6)),
                ('phone', models.CharField(max_length=15, null=True, validators=[backend.user.validators.validate_phone_number])),
                ('end_date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Дата окончания срока кода')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Код подтверждения номера телефона',
                'verbose_name_plural': 'Коды подтверждения номера телефона',
            },
        ),
    ]
