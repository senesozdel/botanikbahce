import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import plantsReducer from '../features/plants/plantsSlice';
import seedBanksReducer from '../features/seedBanks/seedBanksSlice';
import collectorsReducer from '../features/collectors/collectorSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    plants: plantsReducer,
    seedBanks: seedBanksReducer,
    collectors: collectorsReducer,
  },
});