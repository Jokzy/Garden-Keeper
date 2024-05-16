import requests
import base64
import json
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from gk_app.models import Plante
from .serializers import PlanteSerializer

perenual_key = "sk-EOO16646872e1c7935538"
plantID_key = "78wKYnmoSAawYGVcmrotGJw3mBweeCN7mMDaZ8PXDNOoVtLLfV"


@api_view(['GET'])
def getPlant(request, id_perenual):
    try:
        plante = Plante.objects.get(id_perenual=id_perenual)
        serializer = PlanteSerializer(plante)

        # If the plant is found and serialized correctly, the serialized data will be returned
        return Response({'Plant_data': serializer.data}, status=200)
    except Plante.DoesNotExist:
        return Response({"error": "Plant not found"}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=404)


@api_view(['POST'])
def addItem(request):
    serializer = PlanteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)  # This outputs json data


@api_view(['POST'])
def addPlant(request):
    try:
        data = json.loads(request.body)
        processed_data = {key: value for key, value in data.items() if value}

        if not processed_data:
            return JsonResponse({"message": "No data provided"}, status=400)

        plante = Plante.objects.create(**processed_data)
        serializer = PlanteSerializer(plante)
        return JsonResponse({'message': 'Data received successfully', 'processed_data': serializer.data}, status=201)

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON format"}, status=400)


@api_view(['PATCH'])
def editPlant(request, id_perenual):
    try:
        data = json.loads(request.body)
        processed_data = {key: value for key, value in data.items() if value}

        plante = Plante.objects.get(id_perenual=id_perenual)
        serializer = PlanteSerializer(plante, data=processed_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Plant update successfully', 'updated_data': serializer.data}, status=200)
        else:
            return Response(serializer.errors, status=400)
    except Plante.DoesNotExist:
        return Response({"error": "Plant not found"}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=404)

# ----------------- CODE GRAVEYARD -----------------
# @api_view(['POST'])
# def sendImage(request, img): #idea: location of image in your files in arg
#     with open('back_end/gk_projet/api/images/rose.jpg', 'rb') as file:
#         image = base64.b64encode(file.read()).decode('ascii')
#
#     # print(image)
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

# @api_view(['POST'])
# def addPlant(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             processed_data = {}
#             for key, value in data.items():
#                 if value:
#                     processed_data[key] = value
#
#             # Creating a Plante instance and adding it to the database
#             Plante.objects.create(**processed_data)
#             #The next lines are to serialize the plante object so that we can store it in the database
#             nom_scientifique = processed_data.get('nom_scientifique')
#             if nom_scientifique:
#                 plante = Plante.objects.get(nom_scientifique=nom_scientifique)
#                 serializer = PlanteSerializer(data=plante)
#                 if serializer.is_valid():
#                     serializer.save()
#                 response_data = {'message': 'Data received succesfully', 'processed_data': processed_data}
#                 return JsonResponse(response_data)
#             else:
#                 return JsonResponse({'error': 'Plante not found'})
#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON format'})
#     else:
#         return JsonResponse({'error': 'Only POST requests are allowed'})

# @api_view(['GET'])
# def getData(request, query):
#     if Plante.objects.filter(nom_recherche=query).exists():
#         plante = Plante.objects.get(nom_recherche=query)
#         serializer = PlanteSerializer(plante, many=False)
#         return Response(serializer.data)
#     else:
#         # perenual_url = f"https://perenual.com/api/species-list?key={perenual_key}&q={query}"
#         # r = requests.get(perenual_url)
#         # info = r.json()
#         #
#         # if info['data']: # vérifie si le dictionnaire est vide
#         #     Plante.objects.create(nom_recherche=query, nom=info['data'][0]["common_name"],
#         #                           nom_scientifique=info['data'][0]["scientific_name"],
#         #                           arrosage=info['data'][0]["watering"], soleil=info['data'][0]["sunlight"],
#         #                           cycle=info['data'][0]["cycle"])
#         #
#         #     plante = Plante.objects.get(nom_recherche=query)
#         #     serializer = PlanteSerializer(plante)
#         #     return Response(serializer.data)
#         return Response({"message": "Plante introuvable"})
