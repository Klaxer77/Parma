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

    
def send_sms(phone, message):
    api_key = '2bd0A1028e1938f69952838100d00e4c'
    url = 'https://sms-activate.ru/stubs/handler_api.php'
    params = {
        'api_key': api_key,
        'action': 'sendSMS',
        'phone': phone,
        'message': message
    }

    try:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            print('SMS успешно отправлено')
        else:
            print('Ошибка при отправке SMS')
    except requests.exceptions.RequestException as e:
        print('Ошибка при отправке SMS:', str(e))