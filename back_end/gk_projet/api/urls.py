from django.urls import path
from . import views

urlpatterns = [
    path('api/', views.addItem),
    path('get-data/<str:query>/', views.getData),
    path('send-image/', views.sendImage),
]