import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  sala: {
    id: string;
    nome: string;
    descricao: string;
    equipamentos: string;
    // Outras propriedades da sala
  } | null; // Definir como opcional
}

const AgendarScreen: React.FC<Props> = ({ sala }) => {
  // Verificar se sala está definida antes de acessar suas propriedades
  if (!sala) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nenhuma sala selecionada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{sala.nome}</Text>
      <Text style={styles.description}>{sala.descricao}</Text>
      {/* Renderizar outros detalhes da sala, como equipamentos, etc. */}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default AgendarScreen;
