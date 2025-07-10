import apiClient from './api';

export const plantService = {
  getAllPlants: async () => {
    try {
      const response = await apiClient.get('/Plant');
      return response.data;
    } catch (error) {
      throw new Error('Bitkiler getirilirken bir hata oluştu');
    }
  },
  
  getPlantsByName: async (name) => {
    try {
      const response = await apiClient.get(`/Plant/${name}`);
      return response.data;
    } catch (error) {
      throw new Error('Bitkiler aranırken bir hata oluştu');
    }
  },
  
  addPlant: async (plantData) => {
    try {
      const response = await apiClient.post('/Plant/addplant', plantData);
      return response.data;
    } catch (error) {
      throw new Error('Bitki eklenirken bir hata oluştu');
    }
  },
  
  deletePlant: async (plantData) => {
    try {
      const response = await apiClient.delete('/Plant/deleteplant', { data: plantData });
      return response.data;
    } catch (error) {
      throw new Error('Bitki silinirken bir hata oluştu');
    }
  },
  
  updatePlant: async (plantData) => {
    try {
      const response = await apiClient.put('/Plant/updateplant', plantData);
      return response.data;
    } catch (error) {
      throw new Error('Bitki güncellenirken bir hata oluştu');
    }
  }
};