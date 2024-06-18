// api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseURL = 'http://192.168.0.16:8000/api'; // Atualize para a URL base correta do seu backend

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signup = async (username, email, password, firstName, lastName) => {
    try {
        const response = await axios.post('http://192.168.0.16:8000/api/signup/', {
            username: username,
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName
        });
        console.log('POST request:', response.data);

        return response.data;
    } catch (error) {
        console.error('Error signing up', error);
        throw error;
    }
};

export const login = async (username, password) => {
    try {
        const response = await axios.post('http://192.168.0.16:8000/api/login_mobile/', {
            username: username,
            password: password,
        });
        console.log('POST request:', response.data);

        // Armazenar o tipo de usuário em AsyncStorage
        await AsyncStorage.setItem('user_type', response.data.user_type);

        return response.data;
    } catch (error) {
        console.error('Error logging in', error);
        throw error;
    }
};

export const AddSala = async (nome, descricao, equipamentos) => {
    try {
      const response = await api.post('/adicionar_sala/', { nome, descricao, equipamentos });
      return response.data;
    } catch (error) {
      console.error('Error adding room', error);
      throw error;
    }
  };
  
  export const getSalas = async () => {
    const response = await axios.get(`${baseURL}/salas/`);
    return response.data;
  };
  
  export const deleteSala = async (id) => {
    try {
      const response = await axios.delete(`http://192.168.0.16:8000/api/salas/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir sala:', error);
      throw error; // Propague o erro para lidar com ele no componente que chama deleteSala
    }
  };

export default api;
