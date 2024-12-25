/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import dashboardReducer from '@/features/store/slices/dashboardSlice';
import paymentReducer from './slices/paymentSlice';
import profileReducer from './slices/profileSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
    payment: paymentReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 