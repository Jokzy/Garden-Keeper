# What does a serializer do? It converts instances of our items from objects into datatypes the respoonse object can understand

from rest_framework import serializers
from gk_app.models import Plante

class PlanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plante
        fields ='__all__'