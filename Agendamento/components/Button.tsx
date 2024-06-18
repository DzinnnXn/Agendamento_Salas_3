import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
};

export default function Button({ label, onPress }: Props){
  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    button: {
      marginTop: 10,
      alignItems: 'center',
      width: 350,
      backgroundColor: '#e61919',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 17,
      paddingBottom: 10
    },
  });

return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};