// CoordenadorHome.tsx

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface Props {
  onNavigate: (screen: string) => void;
}

const CoordinatorHomeScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, Coordenador!</Text>
      <View style={styles.buttonContainer}>
        <Button title="Adicionar Sala" color="red" onPress={() => onNavigate('AdicionarSala')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Excluir Sala" color="red" onPress={() => onNavigate('ExcluirSala')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Ver Salas" color="red" onPress={() => onNavigate('Salas')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Agendar Sala" color="red" onPress={() => onNavigate('Agendar')} />
      </View>
      <Text style={styles.link} onPress={() => onNavigate('Login')}>
        Sair
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
    marginBottom: 10,
    width: '80%',
  },
  link: {
    color: 'red',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default CoordinatorHomeScreen;
