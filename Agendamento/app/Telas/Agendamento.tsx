import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

interface Props {
  room: any;
  onNavigate: (screen: string) => void;
}

const AgendamentoScreen: React.FC<Props> = ({ room, onNavigate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState('manhaA');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };

  const handleAgendar = async () => {
    try {
      const response = await axios.post('http://192.168.0.16:8000/api/agendamentos/', {
        sala: room.id,
        dias: selectedDate.toISOString().split('T')[0],
        periodo: selectedPeriod,
      });
      if (response.status === 201) {
        alert('Sala agendada com sucesso!');
        onNavigate('Home');
      }
    } catch (error) {
      console.error('Erro ao agendar a sala:', error);
      alert('Erro ao agendar a sala. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendamento para {room.nome}</Text>

      <View style={styles.pickerContainer}>
        <Button title="Escolha a data" onPress={() => setShowDatePicker(true)} color="red" />
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <Text style={styles.selectedDate}>{selectedDate.toDateString()}</Text>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Escolha o período</Text>
        <Picker
          selectedValue={selectedPeriod}
          onValueChange={(itemValue) => setSelectedPeriod(itemValue)}
        >
          <Picker.Item label="Manhã A" value="manhaA" />
          <Picker.Item label="Manhã B" value="manhaB" />
          <Picker.Item label="Tarde A" value="tardeA" />
          <Picker.Item label="Tarde B" value="tardeB" />
          <Picker.Item label="Noite A" value="noiteA" />
        </Picker>
      </View>

      <Button title="Agendar" color="red" onPress={handleAgendar} />
      <Text style={styles.link} onPress={() => onNavigate('Salas')}>
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
  pickerContainer: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  selectedDate: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  link: {
    color: 'red',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default AgendamentoScreen;
