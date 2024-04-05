from django.db import models


# Create your models here.

class Plante(models.Model):
    nom_recherche = models.CharField(max_length=200)
    nom = models.CharField(max_length=200)
    nom_scientifique = models.CharField(max_length=200)
    arrosage = models.CharField(max_length=200)
    soleil = models.CharField(max_length=200)
    cycle = models.CharField(max_length=200)
   
    @classmethod
    def create(cls, nom):
        plante = cls(nom=nom)
        return plante
