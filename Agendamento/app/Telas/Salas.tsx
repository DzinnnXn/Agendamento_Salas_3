// Salas.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

interface Sala {
  id: string;
  salas: string;
  descricao: string;
  equipamentos: string;
}

interface Props {
  onNavigate: (screen: string) => void;
  onRoomSelect: (room: Sala) => void;
}

const SalasScreen: React.FC<Props> = ({ onNavigate, onRoomSelect }) => {
  const [salas, setSalas] = useState<Sala[]>([]);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await axios.get('http://192.168.0.16:8000/api/salas/');
        setSalas(response.data);
      } catch (error) {
        console.error('Erro ao buscar salas:', error);
      }
    };

    fetchSalas();
  }, []);

  const handleRoomPress = (room: Sala) => {
    onRoomSelect(room);
    onNavigate('Agendamento');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salas Disponíveis</Text>
      <FlatList
        data={salas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRoomPress(item)}>
            <View style={styles.roomContainer}>
              <Text style={styles.roomName}>{item.salas}</Text>
              <Text style={styles.roomDescription}>{item.descricao}</Text>
              <Text style={styles.roomEquipments}>{item.equipamentos}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.link} onPress={() => onNavigate('Home')}>
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

export default SalasScreen;
