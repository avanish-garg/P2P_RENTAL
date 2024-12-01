import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const createRental = async (data) => {
  try {
    const response = await api.post('/create-rental', data);
    return response.data;
  } catch (error) {
    console.error('Error creating rental:', error);
    throw error;
  }
};
