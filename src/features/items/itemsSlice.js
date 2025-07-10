import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as itemsApi from '../../api/itemsApi';

export const fetchItemsAsync = createAsyncThunk(
  'items/fetchItems',
  async () => {
    return await itemsApi.fetchItems();
  }
);

export const fetchItemByIdAsync = createAsyncThunk(
  'items/fetchItemById',
  async (id) => {
    return await itemsApi.fetchItemById(id);
  }
);

export const addItemAsync = createAsyncThunk(
  'items/addItem',
  async (item) => {
    return await itemsApi.addItem(item);
  }
);

export const updateItemAsync = createAsyncThunk(
  'items/updateItem',
  async ({ id, item }) => {
    return await itemsApi.updateItem(id, item);
  }
);

export const deleteItemAsync = createAsyncThunk(
  'items/deleteItem',
  async (id) => {
    await itemsApi.deleteItem(id);
    return id;
  }
);

const initialState = {
  items: [],
  currentItem: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearCurrentItem: (state) => {
      state.currentItem = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItemsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchItemByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentItem = action.payload;
      })
      .addCase(fetchItemByIdAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addItemAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export const { clearCurrentItem } = itemsSlice.actions;
export default itemsSlice.reducer;