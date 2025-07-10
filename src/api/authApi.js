import axios from 'axios';

const API_URL = 'https://localhost:7218'; 

// Kullanıcı girişi
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Giriş işlemi sırasında bir hata oluştu');
  }
};

// API isteklerine token ekleme
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};