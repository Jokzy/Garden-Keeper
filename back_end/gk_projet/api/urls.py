from django.urls import path
from . import views

urlpatterns = [
    path('', views.getData), # Path function used to set endpoints
    path('api/', views.addItem),
]