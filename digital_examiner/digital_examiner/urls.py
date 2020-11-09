"""digital_examiner URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import CustomObtainAuthToken
urlpatterns = [
    path('admin/', admin.site.urls),
    # path('accounts/', include('allauth.urls')),
    path('api_view/', include('users.urls')),
    # path('rest_auth/login/',CustomObtainAuthToken.as_view()),
    # path('rest_auth/',include('rest_auth.urls')),
    # path('rest_auth/registration/', include('rest_auth.registration.urls')),
    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),

    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    # path('rest_auth/')
]


if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)