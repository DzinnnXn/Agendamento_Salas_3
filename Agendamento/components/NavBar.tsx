// /components/NavBar.tsx
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface NavbarProps {
  onNavigate: (screen: string) => void;
  onOpenMenu: () => void; // Add a prop to handle menu opening
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenMenu }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => onNavigate('Login')}>
        <Image
          source={require('../assets/images/senai.png')} 
          style={styles.navImage}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onOpenMenu}>
        <Text style={styles.navButtonText}>Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'red',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  navImage: {
    width: 180,
    height: 40,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default Navbar;
