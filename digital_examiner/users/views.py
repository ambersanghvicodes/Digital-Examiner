from django.contrib.auth.models import User
from .serializers import (
    UserSerializer, SubjectSerializer, QuestionSerializer, UserEditSerializer,
    UserCreateSerializer, TodoSerializer, PatternSerializer,InstituteSerializer
)
from rest_framework.parsers import FileUploadParser, MultiPartParser 

from rest_framework import generics
from .models import  Subject, Questions, Todo, Pattern, Institute
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
# from rest_framework.authentication import SessionAuthentication, BasicAuthentication , TokenAuthentication
from rest_framework.permissions import IsAuthenticated
# from .permissions import IsAuthenticatedAndOwner, IsAuthenticatedAndOwner1

# oauth toolkit
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from oauth2_provider.contrib.rest_framework import OAuth2Authentication


class TodoList(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    authentication_classes= ()
    permission_classes = ()

class TodoEdit(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    authentication_classes= ()
    permission_classes = ()

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (OAuth2Authentication,)
    permission_classes = [TokenHasReadWriteScope,]

    

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    # authentication_classes = (AllowAny,)
    # permission_classes = (AllowAny,)
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            # "token": AuthToken.objects.create(user)[1]
        })


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserEditSerializer
    # authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


# 

class SubjectList(generics.ListCreateAPIView):
    serializer_class = SubjectSerializer
    authentication_classes = (OAuth2Authentication,)
    permission_classes = [TokenHasReadWriteScope,]


    def get_queryset(self):
        return Subject.objects.all().filter(user = self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
class SubjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    authentication_classes = (OAuth2Authentication,)
    permission_classes = [TokenHasReadWriteScope,]

@api_view(['GET', 'POST'])
def question_list(request, pk):
    """
    List all code questions, or create a new question.
    """
    if request.method == 'GET':
        questions = Questions.objects.all().filter(user = request.user)
        questions = questions.filter(subject=pk)

        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            serializer.subject = Subject.object.get(id = pk)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QuestionList(generics.ListCreateAPIView):
    parser_class = (FileUploadParser, )
    serializer_class = QuestionSerializer
    lookup_url_kwarg = "pk"
    # authentication_classes = (TokenAuthentication,BasicAuthentication, SessionAuthentication)
    authentication_classes = (OAuth2Authentication,)
    permission_classes = [TokenHasReadWriteScope,]

    def get_queryset(self):
        pk = self.kwargs.get(self.lookup_url_kwarg)
        questions = Questions.objects.all().filter(user = self.request.user)
        questions = questions.filter(subject=pk)
        return questions

    def perform_create(self, serializer):
        pk = self.kwargs.get(self.lookup_url_kwarg)
        sub = Subject.objects.all().filter(id = pk)
        serializer.save(user = self.request.user, subject = sub[0])


class QuestionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Questions.objects.all()
    serializer_class = QuestionSerializer
    authentication_classes = (OAuth2Authentication,)
    permission_classes = [TokenHasReadWriteScope,]
    lookup_field = "id"



class PatternList(generics.ListCreateAPIView):
    serializer_class = PatternSerializer
    authentication_classes = (OAuth2Authentication,)
    permission_classes = [TokenHasReadWriteScope,]
    def get_queryset(self):
        return Pattern.objects.all().filter(user = self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
class PatternDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pattern.objects.all()
    serializer_class = PatternSerializer
    authentication_classes = (OAuth2Authentication,)
    permission_classes = [TokenHasReadWriteScope,]


class InstituteList(generics.ListCreateAPIView):
    serializer_class = InstituteSerializer
    authentication_classes = (OAuth2Authentication,)
    permission_classes = [TokenHasReadWriteScope,]
    def get_queryset(self):
        return Institute.objects.all().filter(user = self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
class InstituteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Institute.objects.all()
    serializer_class = InstituteSerializer
    authentication_classes = (OAuth2Authentication,)
    permission_classes = [TokenHasReadWriteScope,]
