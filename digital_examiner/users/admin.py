from django.contrib import admin
from .models import  Subject, Questions, Pattern, Institute

admin.site.register(Questions)
admin.site.register(Subject)
admin.site.register(Pattern)
admin.site.register(Institute)