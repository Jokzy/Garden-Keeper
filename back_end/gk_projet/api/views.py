import requests
import base64
import json
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from gk_app.models import Plante
from .serializers import PlanteSerializer
from django.http import HttpResponse

perenual_key = "sk-eKNW65d813327065e4323"  # perenual
plantID_key = "O6JC4gc3FtgXkbE6frVGPaLiqkRmULsUTKrwO9APWAaWxCqWMV" #TODO: Put this in comments when it isn't being used

@api_view(['GET'])
def getData(request, query):
    if Plante.objects.filter(nom_recherche=query).exists():
        plante = Plante.objects.get(nom_recherche=query)
        serializer = PlanteSerializer(plante, many=False)
        return Response(serializer.data)
    else:
        perenual_url = f"https://perenual.com/api/species-list?key={perenual_key}&q={query}"
        r = requests.get(perenual_url)
        info = r.json()

        if info['data']: # vérifie si le dictionnaire est vide
            Plante.objects.create(nom_recherche=query, nom=info['data'][0]["common_name"],
                                  nom_scientifique=info['data'][0]["scientific_name"],
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

@api_view(['POST'])
def addPlant(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            processed_data = {}
            for key, value in data.items():
                if value:
                    processed_data[key] = value

            # Creating a Plante instance and adding it to the database
            Plante.objects.create(**processed_data)

            response_data = {'message': 'Data received succesfully', 'processed_data': processed_data}
            return JsonResponse(response_data)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'})
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'})


# @api_view(['POST'])
# def sendImage(request, img): #idea: location of image in your files in arg
#     with open('back_end/gk_projet/api/images/rose.jpg', 'rb') as file:
#         image = base64.b64encode(file.read()).decode('ascii')
#
#     # print(image) #TODO: TEST
#     # response = requests.post(url='https://plant.id/api/v3/identification',
#     #                   headers={'Api-Key': plantID_key, 'Content-Type': 'application/json'},
#     #                   json={'images': image},
#     #                   )
#     response = requests.post(url='https://plant.id/api/v3/identification',
#                              headers={'Api-Key': plantID_key, 'Content-Type': 'application/json'},
#                              json={'image': img},)
#
#     info = response.json()
#     print({"message": info["result"]["classification"]["suggestions"][0]["name"]})
#     return Response({"message": info["result"]["classification"]["suggestions"][0]["name"]})