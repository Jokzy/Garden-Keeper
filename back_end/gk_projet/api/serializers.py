# What does a serializer do? It converts instances of our items from objects into datatypes the respoonse object can understand

from rest_framework import serializers
from gk_app.models import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields ='__all__'