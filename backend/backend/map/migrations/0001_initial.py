# Generated by Django 5.0.1 on 2024-02-01 15:19

import django.core.validators
import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, validators=[django.core.validators.MinLengthValidator(3)], verbose_name='Название')),
                ('slug', models.SlugField(max_length=255, unique=True, verbose_name='URL')),
                ('image', models.ImageField(upload_to='place/', verbose_name='Фото места')),
                ('status', models.CharField(choices=[('Забронировано', 'Забронировано'), ('Свободно', 'Свободно')], default='свободно', max_length=13, verbose_name='Статус')),
            ],
            options={
                'verbose_name': 'Место',
                'verbose_name_plural': 'Места',
            },
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.SlugField(max_length=255, unique=True, verbose_name='URL')),
                ('name', models.CharField(max_length=50, validators=[django.core.validators.MinLengthValidator(3)], verbose_name='Название')),
            ],
            options={
                'verbose_name': 'Комната',
                'verbose_name_plural': 'Комнаты',
            },
        ),
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Дата начала бронирования')),
                ('end_date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Дата окончания бронирования')),
                ('place', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='map.place', verbose_name='Место')),
            ],
            options={
                'verbose_name': 'Бронь',
                'verbose_name_plural': 'Брони',
            },
        ),
    ]