import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { seedBankService } from '../../services/seedBankService';

export const fetchSeedBanks = createAsyncThunk(
  'seedBanks/fetchSeedBanks',
  async (_, { rejectWithValue }) => {
    try {
      return await seedBankService.getAllSeedBanks();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchSeedBanks = createAsyncThunk(
  'seedBanks/searchSeedBanks',
  async (name, { rejectWithValue }) => {
    try {
      return await seedBankService.getSeedBanksByName(name);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addSeedBank = createAsyncThunk(
  'seedBanks/addSeedBank',
  async (seedBankData, { rejectWithValue }) => {
    try {
      return await seedBankService.addSeedBank(seedBankData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSeedBank = createAsyncThunk(
  'seedBanks/updateSeedBank',
  async (seedBankData, { rejectWithValue }) => {
    try {
      const success = await seedBankService.updateSeedBank(seedBankData);
      return { success, seedBank: seedBankData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSeedBank = createAsyncThunk(
  'seedBanks/deleteSeedBank',
  async (seedBankData, { rejectWithValue }) => {
    try {
      const success = await seedBankService.deleteSeedBank(seedBankData);
      return { success, id: seedBankData.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  seedBanks: [],
  filteredSeedBanks: [],
  status: 'idle',
  error: null,
  currentSeedBank: null
};

const seedBanksSlice = createSlice({
  name: 'seedBanks',
  initialState,
  reducers: {
    setCurrentSeedBank: (state, action) => {
      state.currentSeedBank = action.payload;
    },
    clearCurrentSeedBank: (state) => {
      state.currentSeedBank = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeedBanks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSeedBanks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.seedBanks = action.payload;
        state.filteredSeedBanks = action.payload;
      })
      .addCase(fetchSeedBanks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      .addCase(searchSeedBanks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchSeedBanks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.filteredSeedBanks = action.payload;
      })
      .addCase(searchSeedBanks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addSeedBank.fulfilled, (state, action) => {
        state.seedBanks.push(action.payload);
        state.filteredSeedBanks.push(action.payload);
      })
      .addCase(updateSeedBank.fulfilled, (state, action) => {
        if (action.payload.success) {
          const index = state.seedBanks.findIndex(sb => sb.id === action.payload.seedBank.id);
          if (index !== -1) {
            state.seedBanks[index] = {
              ...state.seedBanks[index],
              ...action.payload.seedBank
            };
            
            const filteredIndex = state.filteredSeedBanks.findIndex(sb => sb.id === action.payload.seedBank.id);
            if (filteredIndex !== -1) {
              state.filteredSeedBanks[filteredIndex] = {
                ...state.filteredSeedBanks[filteredIndex],
                ...action.payload.seedBank
              };
            }
          }
        }
      })
      .addCase(deleteSeedBank.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.seedBanks = state.seedBanks.filter(sb => sb.id !== action.payload.id);
          state.filteredSeedBanks = state.filteredSeedBanks.filter(sb => sb.id !== action.payload.id);
        }
      });
  }
});

export const { setCurrentSeedBank, clearCurrentSeedBank } = seedBanksSlice.actions;
export default seedBanksSlice.reducer;