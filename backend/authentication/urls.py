from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import CustomUserViewSet, CurrentUserView


app_name = "authentication"

router = routers.DefaultRouter()
router.register(r'users', CustomUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('user/', CurrentUserView.as_view(), name='current_user'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]