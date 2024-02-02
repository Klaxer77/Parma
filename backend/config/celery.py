import os
from celery import Celery
from celery import current_app
# from celery.schedules import crontab
# from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

app = Celery('config')
app.conf.broker_connection_retry_on_startup = True

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

# reservation_id = 28

app.conf.beat_schedule = {
    'move-reservation-to-history': {
        'task': 'backend.map.tasks.move_expired_reservations_to_history',
        'schedule': 10,
        # 'args': (),
    },
}