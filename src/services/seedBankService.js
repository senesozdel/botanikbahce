import apiClient from './api';

export const seedBankService = {

  getAllSeedBanks: async () => {
    try {
      const response = await apiClient.get('/SeedBank');
      return response.data;
    } catch (error) {
      throw new Error('Tohum bankaları getirilirken bir hata oluştu');
    }
  },
  
  getSeedBanksByName: async (name) => {
    try {
      const response = await apiClient.get(`/SeedBank/${name}`);
      return response.data;
    } catch (error) {
      throw new Error('Tohum bankaları aranırken bir hata oluştu');
    }
  },
  
  addSeedBank: async (seedBankData) => {
    try {
      const response = await apiClient.post('/SeedBank/addseedbank', seedBankData);
      return response.data;
    } catch (error) {
      throw new Error('Tohum bankası eklenirken bir hata oluştu');
    }
  },
  
  deleteSeedBank: async (seedBankData) => {
    try {
      const response = await apiClient.delete('/SeedBank/deleteseedbank', { data: seedBankData });
      return response.data;
    } catch (error) {
      throw new Error('Tohum bankası silinirken bir hata oluştu');
    }
  },
  
  updateSeedBank: async (seedBankData) => {
    try {
      const response = await apiClient.put('/SeedBank/updateseedbank', seedBankData);
      return response.data;
    } catch (error) {
      throw new Error('Tohum bankası güncellenirken bir hata oluştu');
    }
  }
};