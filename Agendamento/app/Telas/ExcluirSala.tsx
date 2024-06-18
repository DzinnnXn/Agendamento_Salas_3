import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { getSalas, deleteSala } from '@/app/api';

interface Sala {
  id: string;
  salas: string;
  descricao: string;
  equipamentos: string;
}

interface Props {
  onNavigate: (screen: string) => void;
}

const ExcluirSalaScreen: React.FC<Props> = ({ onNavigate }) => {
  const [salas, setSalas] = useState<Sala[]>([]);

  useEffect(() => {
    fetchSalas();
  }, []);

  const fetchSalas = async () => {
    try {
      const response = await getSalas();
      setSalas(response);
    } catch (error) {
      console.error('Erro ao buscar salas:', error);
    }
  };

  const handleDeleteSala = async (id: string) => {
    try {
      await deleteSala(id);
      Alert.alert('Sucesso', 'Sala excluída com sucesso');
      fetchSalas(); // Atualize a lista de salas após exclusão
    } catch (error) {
      console.error('Erro ao excluir sala:', error);
      Alert.alert('Erro', 'Não foi possível excluir a sala. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Excluir Sala</Text>
      <FlatList
        data={salas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.roomContainer}>
            <Text style={styles.roomName}>{item.salas}</Text>
            <Text style={styles.roomDescription}>{item.descricao}</Text>
            <Text style={styles.roomEquipments}>{item.equipamentos}</Text>
            <Button title="Excluir Sala" color="red" onPress={() => handleDeleteSala(item.id)} />
          </View>
        )}
      />
      <Text style={styles.link} onPress={() => onNavigate('CoordinatorHome')}>
        Voltar
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  roomContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  roomName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  roomDescription: {
    fontSize: 16,
    color: '#555',
  },
  roomEquipments: {
    fontSize: 14,
    color: '#777',
  },
  link: {
    color: 'red',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default ExcluirSalaScreen;
