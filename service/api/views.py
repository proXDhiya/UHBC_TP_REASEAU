from rest_framework.response import Response
from rest_framework.decorators import api_view
import base64
from Crypto.Cipher import AES
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello, world!"})

@api_view(['POST'])
def user_info(request):
    name = request.data.get('name')
    return Response({"message": f"Hello, {name}!"})

@csrf_exempt
@api_view(['POST'])
def encrypt(request):
    message = request.data.get('message')
    key = request.data.get('key')
    if message is None or key is None:
        return JsonResponse({"message": "Missing message or key"}, status=400)
    padded_message = message.ljust((len(message) // 16 + 1) * 16)
    cipher = AES.new(key.encode(), AES.MODE_ECB)
    encrypted_message = cipher.encrypt(padded_message.encode())
    encoded_message = base64.b64encode(encrypted_message).decode()
    return JsonResponse({"message": encoded_message}, status=200)

@csrf_exempt
@api_view(['POST'])
def decrypt(request):
    message = request.data.get('message')
    key = request.data.get('key')
    if message is None or key is None:
        return JsonResponse({"message": "Missing message or key"}, status=400)
    cipher = AES.new(key.encode(), AES.MODE_ECB)
    decoded_message = base64.b64decode(message)
    decrypted_message = cipher.decrypt(decoded_message).decode()
    return JsonResponse({"message": decrypted_message}, status=200)

