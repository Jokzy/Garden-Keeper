from rest_framework import serializers
from .models import Plante


class PlanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plante
        fields = ('id', 'nom', 'nom_scientifique')
