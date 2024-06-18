// /components/Drawer.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface DrawerProps {
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ onClose }) => {
  return (
    <View style={styles.drawer}>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeButton}>Fechar</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Informações do Usuário</Text>
      <Text style={styles.info}>Nome: João Silva</Text>
      <Text style={styles.info}>Email: joao.silva@example.com</Text>
      {/* Add more user info as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  closeButton: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Drawer;
