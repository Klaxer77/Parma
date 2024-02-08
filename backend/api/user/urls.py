from django.urls import path
from . import views
from .views import set_password

urlpatterns = [
    path('profile/', views.UserDetailView.as_view()),
    path('reservation/', views.ReservationCreateView.as_view()),
    path('reservation/list/', views.ReservationListView.as_view()),
    path('set-password/', set_password),
    path('change-email/', views.ChangeEmailView.as_view()),
    path('confirm-email/', views.ConfirmEmailChangeView.as_view()),
    path('change-phone/', views.ChangePhoneView.as_view()),
    path('confirm-phone/', views.ConfirmPhoneChangeView.as_view()),
]
