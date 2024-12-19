from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import CustomUser
from .serializers import CustomUserSerializer


class CustomUserViewSet(viewsets.ModelViewSet):
    # API endpoint that allows users to be viewed or edited
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class CurrentUserView(APIView):
    # API endpoint that allows current user to be viewed
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Retrieves current user information
        user = request.user
        print(f"authenticated user: {user.email}")
        return Response({'user': {
                            'isAuthenticated': True,
                            'email': user.email,
                            'is_staff': user.is_staff,
                            'is_admin': user.is_admin,
                        }})