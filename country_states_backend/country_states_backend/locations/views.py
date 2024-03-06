from rest_framework import viewsets
from .models import Country, State
from .serializers import CountrySerializer, StateSerializer
from rest_framework import generics

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

