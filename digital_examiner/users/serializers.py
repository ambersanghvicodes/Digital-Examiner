from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Subject, Questions,Todo, UserDetail, Pattern,Institute

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id','title', 'completed']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        # extra_kwargs = {'password': {'write_only': True}}

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name', 'last_name', 'email', 'username', 'password', ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserEditSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
class UserDetailSerializer(serializers.ModelSerializer):
    class  Meta : 
        model = UserDetail
        fields = ['token',]


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id','name', 'timestamp']


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = ['id','question', 'diagram1', 'mark', 'difficult_level']

class PatternSerializer(serializers.ModelSerializer) : 
    class Meta:
        model = Pattern
        fields=['id', 'title', 'nos','tm', 'noq', 'mark_array', 'question_array']

class InstituteSerializer(serializers.ModelSerializer) : 
    class Meta:
        model = Institute
        fields = ['id','name', 'address', 'city', 'state', 'country']