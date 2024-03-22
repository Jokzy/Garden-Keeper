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
def getData(query):
    perenual_url = f"https://perenual.com/api/species-list?key={api_key}&q={query}"
    r= requests.get(perenual_url)
    info= r.json()
    temp=info['data'][0]['watering']
    return HttpResponse(temp)


@api_view(['POST'])
def addItem(request):
    serializer = PlanteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data) # This outputs json data

