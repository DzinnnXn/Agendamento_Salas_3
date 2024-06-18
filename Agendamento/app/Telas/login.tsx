import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import Input from '@/components/Input';
import { login } from '@/app/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios'; // Importe AxiosError para tipar o erro do Axios

interface Props {
  onNavigate: (screen: string, userType?: string) => void;
  setUserType: React.Dispatch<React.SetStateAction<string>>;
}

const LoginScreen: React.FC<Props> = ({ onNavigate, setUserType }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      console.log('Resposta da requisição:', response);
  
      const userTypeLowercase = response.user_type.toLowerCase();
  
      if (userTypeLowercase === 'professor' || userTypeLowercase === 'coordenador') {
        setUserType(response.user_type);
  
        // Armazenar o token no AsyncStorage
        if (response.token) {
          await AsyncStorage.setItem('token', response.token);
        }
  
        // Navegar para a tela apropriada com base no tipo de usuário
        if (userTypeLowercase === 'professor') {
          onNavigate('Home', response.user_type);
        } else if (userTypeLowercase === 'coordenador') {
          onNavigate('CoordinatorHome', response.user_type);
        }
      } else {
        Alert.alert('Erro', 'Tipo de usuário desconhecido. Contate o suporte.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
  
      // Verificar se é um erro do Axios e se a resposta está disponível
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        Alert.alert('Erro', 'Credenciais inválidas. Verifique seus dados e tente novamente.');
      } else {
        Alert.alert('Erro', 'Erro ao fazer login. Tente novamente mais tarde.');
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Input placeholder="Username" value={username} onChangeText={setUsername} />
      <Input placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Entrar" color="red" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => onNavigate('Register')}>
        Não tem uma conta? Cadastre-se
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'red',
  },
  link: {
    color: 'red',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default LoginScreen;
