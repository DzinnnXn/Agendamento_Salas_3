// SalasReservadas.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

interface SalaReservada {
  id: string;
  nome: string;
  descricao: string;
}

interface Props {
  onNavigate: (screen: string) => void;
}

const SalasReservadasScreen: React.FC<Props> = ({ onNavigate }) => {
  const [salasReservadas, setSalasReservadas] = useState<SalaReservada[]>([]);

  useEffect(() => {
    const fetchSalasReservadas = async () => {
      try {
        const response = await axios.get('http://192.168.0.105:8000/api/salas-reservadas/');
        setSalasReservadas(response.data);
      } catch (error) {
        console.error('Erro ao buscar salas reservadas:', error);
      }
    };

    fetchSalasReservadas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salas Reservadas</Text>
      <FlatList
        data={salasReservadas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.roomContainer}>
            <Text style={styles.roomName}>{item.nome}</Text>
            <Text style={styles.roomDescription}>{item.descricao}</Text>
          </View>
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
  link: {
    color: 'red',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default SalasReservadasScreen;
