from django.contrib import admin
from .models import CustomUser


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['email', 'is_staff', 'is_admin']
    list_editable = ['is_staff', 'is_admin']


admin.site.register(CustomUser, CustomUserAdmin)


