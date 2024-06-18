import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface Props {
  onNavigate: (screen: string) => void; 
}

const HomeScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <View style={styles.buttonContainer}>
        <Button title="Reservar Salas" color="red" onPress={() => onNavigate('Salas')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Salas Reservadas" color="red" onPress={() => onNavigate('SalasReservadas')} />
      </View>
      <Text style={styles.link} onPress={() => onNavigate('Login')}>
        Voltar
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'red',
  },
  buttonContainer: {
    marginBottom: 10, // Add margin to separate the buttons
    width: '80%', // Optional: adjust width as needed
  },
  link: {
    color: 'red',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default HomeScreen;
