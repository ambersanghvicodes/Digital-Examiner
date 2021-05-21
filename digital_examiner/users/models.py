from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models

class UserDetail(models.Model):
  token = models.CharField(max_length=500)

class Subject(models.Model):
 name = models.CharField(max_length=30)
 timestamp = models.DateTimeField(auto_now_add=True)
 user= models.ForeignKey('auth.User', on_delete=models.CASCADE)

 def __str__(self):
  return self.name


CHOICES = (
 ('Easy', 'Easy' ),
 ('Medium','Medium'),
 ('Hard', 'Hard'),
 )

class Questions(models.Model):
 question = models.TextField(max_length=600)
 diagram1 = models.ImageField(upload_to = 'question_images', null = True, blank = True )
 mark = models.IntegerField(default=0)
 difficult_level = models.CharField(max_length = 10 , choices = CHOICES, default='Easy')
 subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
 user= models.ForeignKey('auth.User', on_delete=models.CASCADE)
 
 def __str__(self):
  return self.question


class Todo(models.Model):
  title = models.CharField(max_length=200)
  completed = models.BooleanField(default=False)

  def __str__(self):
    return self.title


class Pattern(models.Model):
  title = models.CharField(max_length=200, default='')
  nos = models.IntegerField(default=0)
  noq=models.IntegerField(default=0)
  tm=models.IntegerField(default=0)
  mark_array = models.CharField(max_length=200, default='')
  question_array = models.CharField(max_length=200, default='')
  user= models.ForeignKey('auth.User', on_delete=models.CASCADE, default=None)

class Institute(models.Model):
  name= models.CharField(max_length=200, default='')
  address = models.TextField(max_length=500, default='')
  city = models.CharField(max_length=100, default='')
  state = models.CharField(max_length=100, default='')
  country = models.CharField(max_length=100, default='')
  user= models.ForeignKey('auth.User', on_delete=models.CASCADE, default=None)


class QPDF(models.Model):
  name  = models.CharField(max_length=200, default='')
  pdf = models.FileField(upload_to = 'pdfs')
  subject  = models.ForeignKey(Subject, on_delete=models.CASCADE)
  date_time  = models.DateTimeField(auto_now_add=True)