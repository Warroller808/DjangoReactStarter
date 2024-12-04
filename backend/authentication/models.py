from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError("L'email est obligatoire.")
        
        user = self.model(
            email=self.normalize_email(email)
        )
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, password=None):
        user = self.create_user(email=email, password=password)
        user.is_staff = True
        user.is_admin = True
        user.save()
        return user


class CustomUser(AbstractBaseUser):
    email = models.EmailField(
        unique=True,
        max_length=255,
        blank=False
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    objects = CustomUserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True
    
    def has_module_perms(self, app_label):
        return True