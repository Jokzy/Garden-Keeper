from django.urls import path
from . import views

urlpatterns = [
    path('api/', views.addItem),
    path('get-plante/<str:id_perenual>/', views.getPlant),
    path('add-plante/', views.addPlant),
    path('edit-plante/<str:id_perenual>/', views.editPlant),
    path('get-toutes-plantes/', views.getAllPlants)
]