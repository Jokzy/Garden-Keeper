import requests
import json
from rest_framework.response import Response
from rest_framework.decorators import api_view
from gk_app.models import Plante
from .serializers import PlanteSerializer
from django.http import HttpResponse

api_key = "sk-eKNW65d813327065e4323" #perenual

# @api_view(['GET'])
# def getData(request):
#     items = Plante.objects.all()
#     serializer = ItemSerializer(items, many=True)
#     return Response(serializer.data) # This outputs json data

@api_view(['GET'])
def getData(request, query):
    if Plante.objects.filter(nom=query).exists():
        return Response(Plante.objects.get(nom=query))
    # plante = Plante.objects.get(scientific_name=query)  # here u check shit bitch to see if it exists
    else:
        perenual_url = f"https://perenual.com/api/species-list?key={api_key}&q={query}"
        r= requests.get(perenual_url)
        info= r.json()

        Plante.objects.create(nom=info["nom"], nom_scientifique=info["nom_scientifique"])

        #temp=info['data'][0]['watering']
        return Response(info)




@api_view(['POST'])
def addItem(request):
    serializer = PlanteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data) # This outputs json data

