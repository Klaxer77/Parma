import re
from django.core.exceptions import ValidationError



def validate_phone_number(value):
    phone_regex = r'^\+\d{1,3}\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$'
    if not re.match(phone_regex, value):
        raise ValidationError('Неверный формат номера телефона')