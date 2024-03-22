from django.urls import path
from . import views

urlpatterns = [
    path('', views.getData), # Path funciton used to set endpoints
]