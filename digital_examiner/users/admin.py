from django.contrib import admin
from .models import  Subject, Questions, Pattern, Institute, QPDF

admin.site.register(Questions)
admin.site.register(Subject)
admin.site.register(Pattern)
admin.site.register(Institute)
admin.site.register(QPDF)