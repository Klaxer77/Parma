from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.UserDetailView.as_view()),
    path('reservation/', views.ReservationCreateView.as_view()),
    path('reservation/list/', views.ReservationListView.as_view()),
    path('reservation/history/', views.ReservationHistoryListView.as_view()),
]
