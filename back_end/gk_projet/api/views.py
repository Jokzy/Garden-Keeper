import requests
import json
from rest_framework.response import Response
from rest_framework.decorators import api_view
from gk_app.models import Plante
from .serializers import PlanteSerializer
from django.http import HttpResponse

api_key = "sk-eKNW65d813327065e4323"  # perenual


# @api_view(['GET'])
# def getData(request):
#     items = Plante.objects.all()
#     serializer = ItemSerializer(items, many=True)
#     return Response(serializer.data) # This outputs json data

@api_view(['GET'])
def getData(request, query):
    if Plante.objects.filter(nom_recherche=query).exists():
        # or Plante.objects.get(nom=query).exists()
        plante = Plante.objects.get(nom_recherche=query)
        #  plante = Plante.objects.get(nom_recherche=query) if Plante.objects.filter(nom_recherche=query).exists() else Plante.objects.get(nom=query)
        serializer = PlanteSerializer(plante, many=False)
        return Response(serializer.data)
    else:
        perenual_url = f"https://perenual.com/api/species-list?key={api_key}&q={query}"
        r = requests.get(perenual_url)
        info = r.json()

        if info['data']:  # vérifie si le dictionnaire est vide
            # ajoute les models dans les cases de la base de données
            Plante.objects.create(nom_recherche=query, nom=info['data'][0]["common_name"],
                                  nom_scientifique=info['data'][0]["scientific_name"][0],
                                  arrosage=info['data'][0]["watering"], soleil=info['data'][0]["sunlight"],
                                  cycle=info['data'][0]["cycle"])
            plante = Plante.objects.get(nom_recherche=query)
            serializer = PlanteSerializer(plante)
            return Response(serializer.data)
        return Response({"message": "Plante introuvable"})


@api_view(['POST'])
def addItem(request):
    serializer = PlanteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)  # This outputs json data
