import unittest
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import CustomUser

class TestAuthenticationViews(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(
            email='testuser@example.com',
            password='testpassword123'
        )
        self.client.force_authenticate(user=self.user)

    def test_get_current_user_authenticated(self):
        response = self.client.get(reverse('authentication:current_user'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user']['email'], self.user.email)

    def test_get_current_user_unauthenticated(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(reverse('authentication:current_user'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

if __name__ == '__main__':
    unittest.main()