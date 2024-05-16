from django.urls import path
from . import views

urlpatterns = [
    path('api/', views.addItem),
    path('get-data/<str:query>/', views.getData),
    path('add-plante/', views.addPlant),
    path('edit-plante/<str:id_perenual>', views.editPlant),
]