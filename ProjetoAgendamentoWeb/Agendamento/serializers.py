# serializers.py
from rest_framework import serializers

# views.py
from rest_framework import views, status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .models import Salas
from .models import SalasReservadas
from .models import Agendamentos

class AgendamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agendamentos
        fields = ['sala', 'dias', 'periodo', 'agendado_por']

class SalaReservadaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalasReservadas
        fields = ['id', 'nome', 'descricao']



class TokenSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()



class SalaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salas
        fields = ['id', 'salas', 'descricao', 'equipamentos']

class ObtainTokenView(views.APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user:
            # Criação do token de acesso e de atualização aqui
            access_token = '...'  # Gere o token de acesso
            refresh_token = '...'  # Gere o token de atualização

            return Response({'access': access_token, 'refresh': refresh_token}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)
