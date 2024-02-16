import random
import requests
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import EmailMultiAlternatives, send_mail
from django.core.mail import EmailMessage


def generate_confirmation_code(length=6):
    characters = '0123456789' 

    code = ''.join(random.choice(characters) for _ in range(length))
    
    return code

    