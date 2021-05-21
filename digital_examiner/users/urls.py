from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('users/create/', views.UserCreate.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('subjects/', views.SubjectList.as_view()),
    path('subjects/<int:pk>/', views.SubjectDetail.as_view()),
    path('subjects/<int:pk>/questions/', views.QuestionList.as_view()),
    path('subjects/<int:pk>/questions/<int:id>/', views.QuestionDetail.as_view()),
    path('todo/', views.TodoList.as_view()),
    path('todo/<int:pk>/', views.TodoEdit.as_view()),
    path('patterns/', views.PatternList.as_view()),
    path('patterns/<int:pk>/', views.PatternDetail.as_view()),
    path('institutions/', views.InstituteList.as_view()),
    path('institutions/<int:pk>/', views.InstituteDetail.as_view()),
    path('institutions/', views.InstituteList.as_view()),
    path('pdf_view/',views.QPDFWrite.as_view())
  ]

urlpatterns = format_suffix_patterns(urlpatterns)
