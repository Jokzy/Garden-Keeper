from django.db import models
# Create your models here.

class Plante(models.Model):
    id_perenual = models.CharField(max_length=100, default='')
    frequence_arrosage = models.CharField(max_length=200, default='')
    ensoleillement = models.JSONField(max_length=200, default=dict)
    image_personelle = models.CharField(max_length=200, default='')
    image_API = models.CharField(max_length=200, default='')
    nom_personnel = models.CharField(max_length=200, default='Sans nom')
    nom_scientifique = models.CharField(max_length=200, default='')
    description = models.CharField(max_length=200, default='')
    dans_jardin = models.BooleanField(max_length=200, default=False)

    @classmethod
    def create(cls, nom):
        plante = cls(nom=nom)
        return plante


    # -------------- CODE GRAVEYARD --------------
    # nom_recherche = models.CharField(max_length=200)
    # nom = models.CharField(max_length=200)
    # nom_scientifique = models.JSONField()
    # arrosage = models.CharField(max_length=200)
    # soleil = models.JSONField()
    # cycle = models.CharField(max_length=200)
