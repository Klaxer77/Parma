import re
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.db import models


def validate_phone_number(value):
    phone_regex = r'^\+?1?\d{9,15}$'
    if not re.match(phone_regex, value):
        raise ValidationError('Неверный формат номера телефона')