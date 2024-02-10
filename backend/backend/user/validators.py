import re
from django.core.exceptions import ValidationError



def validate_phone_number(value):
    phone_regex = r'^\+?1?\d{9,18}$'
    if not re.match(phone_regex, value):
        raise ValidationError('Неверный формат номера телефона')