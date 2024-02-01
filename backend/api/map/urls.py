from django.urls import path, include, re_path
from . import views

urlpatterns = [
    path('reservation/', views.ReservationCreateView.as_view()),
    path('reservation/list/', views.ReservationListView.as_view()),
    path('place/list/', views.PlaceListView.as_view()),
    path('room/list/', views.RoomListView.as_view()),
]
