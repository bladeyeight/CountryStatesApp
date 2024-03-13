from rest_framework import viewsets, status
from .models import Country, State
from .serializers import CountrySerializer, StateSerializer
from rest_framework import generics
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from django.http import HttpResponse

    # permission_classes = [IsAuthenticated]

class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

class StateViewSet(viewsets.ModelViewSet):
    queryset = State.objects.all()
    serializer_class = StateSerializer


class StateListView(generics.ListAPIView):
    serializer_class = StateSerializer

    def get_queryset(self):
        country_code = self.kwargs['country_code'].upper()
        return State.objects.filter(countryId__code=country_code)

class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        print('LoginDataReceived', request.data)
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        else:
            return Response({"error": "Invalid Credentials"}, status=400)
        
class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        print('RegistrationDataReceived', request.data)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key, **serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# def test_view(request):
#     return HttpResponse("Test view response")