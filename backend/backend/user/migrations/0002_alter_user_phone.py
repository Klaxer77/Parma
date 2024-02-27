# Generated by Django 5.0.2 on 2024-02-27 14:38

import backend.user.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phone',
            field=models.CharField(max_length=18, validators=[backend.user.validators.validate_phone_number]),
        ),
    ]
