import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import Input from '@/components/Input';
import { signup } from '@/app/api';

interface Props {
  onNavigate: (screen: string) => void;
}

const RegisterScreen: React.FC<Props> = ({ onNavigate }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignup = async () => {
    try {
      const response = await signup(username, email, password, firstName, lastName);
      console.log('Resposta da requisição de cadastro:', response);

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso');
      // Navegue para a tela de login após o cadastro
      onNavigate('Login');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      Alert.alert('Erro', 'Não foi possível realizar o cadastro. Verifique seus dados e tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <Input placeholder="Nome" value={firstName} onChangeText={setFirstName} />
      <Input placeholder="Sobrenome" value={lastName} onChangeText={setLastName} />
      <Input placeholder="Username" value={username} onChangeText={setUsername} />
      <Input placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <Input placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Cadastrar" color="red" onPress={handleSignup} />
      <Text style={styles.link} onPress={() => onNavigate('Login')}>
        Já tem uma conta? Faça login
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

export default RegisterScreen;
