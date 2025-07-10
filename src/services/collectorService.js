import apiClient from './api';

export const collectorService = {
  getAllCollectors: async () => {
    try {
      const response = await apiClient.get('/Collector');
      return response.data;
    } catch (error) {
      throw new Error('Toplayıcılar getirilirken bir hata oluştu');
    }
  },

  getCollectorsByName: async (name) => {
    try {
      const response = await apiClient.get(`/Collector/${name}`);
      return response.data;
    } catch (error) {
      throw new Error('Toplayıcılar aranırken bir hata oluştu');
    }
  },

  addCollector: async (collectorData) => {
    try {
      const response = await apiClient.post('/Collector/addcollector', collectorData);
      return response.data;
    } catch (error) {
      throw new Error('Toplayıcı eklenirken bir hata oluştu');
    }
  },

  deleteCollector: async (collectorData) => {
    try {
      const response = await apiClient.delete('/Collector/deletecollector', { data: collectorData });
      return response.data;
    } catch (error) {
      throw new Error('Toplayıcı silinirken bir hata oluştu');
    }
  },

  updateCollector: async (collectorData) => {
    try {
      const response = await apiClient.put('/Collector/updatecollector', collectorData);
      return response.data;
    } catch (error) {
      throw new Error('Toplayıcı güncellenirken bir hata oluştu');
    }
  }
};
