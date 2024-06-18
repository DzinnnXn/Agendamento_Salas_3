import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { AddSala } from '@/app/api'; // importe a função AddSala do api.js

interface Props {
  onNavigate: (screen: string) => void;
}

const AdicionarSalaScreen: React.FC<Props> = ({ onNavigate }) => {
  const [nomeSala, setNomeSala] = useState('');
  const [descricao, setDescricao] = useState('');
  const [equipamentos, setEquipamentos] = useState('');

  const handleAdicionarSala = async () => {
    try {
      // Chame a função AddSala com os dados da sala
      const response = await AddSala(nomeSala, descricao, equipamentos);
      console.log('Resposta da requisição de adição de sala:', response);

      // Exiba um alerta ou mensagem de sucesso
      Alert.alert('Sucesso', 'Sala adicionada com sucesso');

      // Navegue para a tela apropriada após a adição da sala
      onNavigate('CoordinatorHome');
    } catch (error) {
      console.error('Erro ao adicionar sala:', error);
      Alert.alert('Erro', 'Não foi possível adicionar a sala. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Sala</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Sala"
        value={nomeSala}
        onChangeText={setNomeSala}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Equipamentos"
        value={equipamentos}
        onChangeText={setEquipamentos}
      />
      <Button title="Adicionar Sala" color="red" onPress={handleAdicionarSala} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default AdicionarSalaScreen;
