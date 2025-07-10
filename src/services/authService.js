import apiClient from './api';

export const authService = {
  // Kullanıcı girişi
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/Auth/Login', credentials);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      return { token, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Giriş işlemi sırasında bir hata oluştu');
    }
  },
    register: async (credentials) => {
    try {
      const response = await apiClient.post('/User/adduser', credentials);

    } catch (error) {
      throw new Error(error.response?.data?.message || 'KAyıt işlemi sırasında bir hata oluştu');
    }
  },
  
  // Kullanıcı çıkışı
  logout: () => {
    localStorage.removeItem('token');
  },
  
  // Token kontrolü
  checkAuth: () => {
    return !!localStorage.getItem('token');
  }
};