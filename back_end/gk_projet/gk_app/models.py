from django.db import models


# Create your models here.

class Plante(models.Model):
    nom = models.CharField(max_length=200)
    nom_scientifique = models.CharField(max_length=200)
