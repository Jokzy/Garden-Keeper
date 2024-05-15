# What does a serializer do? It converts instances of our items from objects into datatypes the respoonse object can understand

from rest_framework import serializers
from gk_app.models import Plante

class PlanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plante
        fields =fields = ['frequence_arrosage',
                          'ensoleillement',
                          'image_personelle',
                          'image_API',
                          'nom_personnel',
                          'nom_scientifique',
                          'description',
                          'dans_jardin']