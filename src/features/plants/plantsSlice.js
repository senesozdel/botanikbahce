import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { plantService } from '../../services/plantService';

export const fetchPlants = createAsyncThunk(
  'plants/fetchPlants',
  async (_, { rejectWithValue }) => {
    try {
      return await plantService.getAllPlants();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchPlants = createAsyncThunk(
  'plants/searchPlants',
  async (name, { rejectWithValue }) => {
    try {
      return await plantService.getPlantsByName(name);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addPlant = createAsyncThunk(
  'plants/addPlant',
  async (plantData, { rejectWithValue }) => {
    try {
      return await plantService.addPlant(plantData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePlant = createAsyncThunk(
  'plants/updatePlant',
  async (plantData, { rejectWithValue }) => {
    try {
      const success = await plantService.updatePlant(plantData);
      return { success, plant: plantData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePlant = createAsyncThunk(
  'plants/deletePlant',
  async (plantData, { rejectWithValue }) => {
    try {
      const success = await plantService.deletePlant(plantData);
      return { success, id: plantData.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  plants: [],
  filteredPlants: [],
  status: 'idle',
  error: null,
  currentPlant: null
};

const plantsSlice = createSlice({
  name: 'plants',
  initialState,
  reducers: {
    setCurrentPlant: (state, action) => {
      state.currentPlant = action.payload;
    },
    clearCurrentPlant: (state) => {
      state.currentPlant = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlants.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.plants = action.payload;
        state.filteredPlants = action.payload;
      })
      .addCase(fetchPlants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(searchPlants.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchPlants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.filteredPlants = action.payload;
      })
      .addCase(searchPlants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addPlant.fulfilled, (state, action) => {
        state.plants.push(action.payload);
        state.filteredPlants.push(action.payload);
      })
      .addCase(updatePlant.fulfilled, (state, action) => {
        if (action.payload.success) {
          const index = state.plants.findIndex(p => p.id === action.payload.plant.id);
          if (index !== -1) {
            state.plants[index] = {
              ...state.plants[index],
              ...action.payload.plant
            };
            
            const filteredIndex = state.filteredPlants.findIndex(p => p.id === action.payload.plant.id);
            if (filteredIndex !== -1) {
              state.filteredPlants[filteredIndex] = {
                ...state.filteredPlants[filteredIndex],
                ...action.payload.plant
              };
            }
          }
        }
      })
      .addCase(deletePlant.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.plants = state.plants.filter(p => p.id !== action.payload.id);
          state.filteredPlants = state.filteredPlants.filter(p => p.id !== action.payload.id);
        }
      });
  }
});

export const { setCurrentPlant, clearCurrentPlant } = plantsSlice.actions;
export default plantsSlice.reducer;