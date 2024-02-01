# Generated by Django 5.0.1 on 2024-01-31 17:42

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('map', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='place',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Сотрудник'),
        ),
        migrations.AddField(
            model_name='room',
            name='places',
            field=models.ManyToManyField(to='map.place', verbose_name='Места'),
        ),
    ]
