from rest_framework import serializers
from .models import Country, State
from django.contrib.auth.models import User

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

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
        
