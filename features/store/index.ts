/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import dashboardReducer from '@/features/store/slices/dashboardSlice';
import paymentReducer from './slices/paymentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 