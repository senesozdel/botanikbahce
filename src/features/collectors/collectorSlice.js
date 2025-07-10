import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collectorService } from '../../services/collectorService';

export const fetchCollectors = createAsyncThunk(
  'collectors/fetchCollectors',
  async (_, { rejectWithValue }) => {
    try {
      return await collectorService.getAllCollectors();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchCollectors = createAsyncThunk(
  'collectors/searchCollectors',
  async (name, { rejectWithValue }) => {
    try {
      return await collectorService.getCollectorsByName(name);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCollector = createAsyncThunk(
  'collectors/addCollector',
  async (collectorData, { rejectWithValue }) => {
    try {
      return await collectorService.addCollector(collectorData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCollector = createAsyncThunk(
  'collectors/updateCollector',
  async (collectorData, { rejectWithValue }) => {
    try {
      const success = await collectorService.updateCollector(collectorData);
      return { success, collector: collectorData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCollector = createAsyncThunk(
  'collectors/deleteCollector',
  async (collectorData, { rejectWithValue }) => {
    try {
      const success = await collectorService.deleteCollector(collectorData);
      return { success, id: collectorData.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  collectors: [],
  filteredCollectors: [],
  status: 'idle',
  error: null,
  currentCollector: null
};

const collectorSlice = createSlice({
  name: 'collectors',
  initialState,
  reducers: {
    setCurrentCollector: (state, action) => {
      state.currentCollector = action.payload;
    },
    clearCurrentCollector: (state) => {
      state.currentCollector = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollectors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCollectors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.collectors = action.payload;
        state.filteredCollectors = action.payload;
      })
      .addCase(fetchCollectors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(searchCollectors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchCollectors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.filteredCollectors = action.payload;
      })
      .addCase(searchCollectors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addCollector.fulfilled, (state, action) => {
        state.collectors.push(action.payload);
        state.filteredCollectors.push(action.payload);
      })
      .addCase(updateCollector.fulfilled, (state, action) => {
        if (action.payload.success) {
          const index = state.collectors.findIndex(c => c.id === action.payload.collector.id);
          if (index !== -1) {
            state.collectors[index] = {
              ...state.collectors[index],
              ...action.payload.collector
            };
          }

          const filteredIndex = state.filteredCollectors.findIndex(c => c.id === action.payload.collector.id);
          if (filteredIndex !== -1) {
            state.filteredCollectors[filteredIndex] = {
              ...state.filteredCollectors[filteredIndex],
              ...action.payload.collector
            };
          }
        }
      })
      .addCase(deleteCollector.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.collectors = state.collectors.filter(c => c.id !== action.payload.id);
          state.filteredCollectors = state.filteredCollectors.filter(c => c.id !== action.payload.id);
        }
      });
  }
});

export const { setCurrentCollector, clearCurrentCollector } = collectorSlice.actions;
export default collectorSlice.reducer;
