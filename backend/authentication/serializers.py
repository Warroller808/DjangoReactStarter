from rest_framework import serializers

from .models import CustomUser


class CustomUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'is_staff', 'is_admin']