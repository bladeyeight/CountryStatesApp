from rest_framework import viewsets, status
from .models import Country, State
from .serializers import CountrySerializer, StateSerializer
from rest_framework import generics
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework import permissions
from .serializers import UserSerializer
from django.http import HttpResponse
from knox.views import LoginView as KnoxLoginView
from knox.models import AuthToken

    # permission_classes = [IsAuthenticated]

class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            self.permission_classes = [IsAuthenticated, ]
        else:
            self.permission_classes = []
        return super().get_permissions()

class StateViewSet(viewsets.ModelViewSet):
    queryset = State.objects.all()
    serializer_class = StateSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            self.permission_classes = [IsAuthenticated, ]
        else:
            self.permission_classes = []
        return super().get_permissions()


class StateListView(generics.ListAPIView):
    serializer_class = StateSerializer

    def get_queryset(self):
        country_code = self.kwargs['country_code'].upper()
        return State.objects.filter(countryId__code=country_code)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny,]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        print('RequestReceived', request.data)
        if user:
            _, token = AuthToken.objects.create(user)
            return Response({
                'username': user.username,
                'token': token
            })
        else:
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny,]

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            _, token = AuthToken.objects.create(user)
            return Response({'user': serializer.data, 'token': token})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# def test_view(request):
#     return HttpResponse("Test view response")