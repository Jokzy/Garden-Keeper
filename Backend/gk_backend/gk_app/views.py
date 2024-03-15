from django.shortcuts import render

from rest_framework import viewsets
from .serializers import PlanteSerializer
from .models import Plante


# Create your views here.
class PlanteView(viewsets.ModelViewSet):
    serializer_class = PlanteSerializer
    queryset = Plante.objects.all()
