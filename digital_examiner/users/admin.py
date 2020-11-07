from django.contrib import admin
from .models import  Subject, Questions

admin.site.register(Questions)
admin.site.register(Subject)