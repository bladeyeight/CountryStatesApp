from rest_framework import serializers
from .models import Country, State

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name', 'code']

class StateSerializer(serializers.ModelSerializer):
    countryId = serializers.PrimaryKeyRelatedField(
        queryset=Country.objects.all(),
        write_only=False,
        read_only=False
    )

    class Meta:
        model = State
        fields = ['id', 'name','code', 'countryId']
    
    def create(self, validated_data):
        return State.objects.create(**validated_data)
