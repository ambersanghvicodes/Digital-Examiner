# from django import forms
# from django.contrib.auth.forms import UserCreationForm, UserChangeForm
# from .models import CustomUser
# from django.contrib.auth.models import User


# class CustomUserCreationForm(UserCreationForm):
#  email = forms.EmailField(required=True)

#  class Meta:
#   model = User
#   fields = (
#    'username', 
#    'first_name',
#    'last_name',
#    'email',
#    'password1',
#    'password2'
#   )

# class CustomUserChangeForm(UserChangeForm):
#     class Meta:
#         model = CustomUser
#         fields = UserChangeForm.Meta.fields
