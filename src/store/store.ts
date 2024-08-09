import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import heroReducer from './slices/hero-slice';

export const store = configureStore({
  reducer: {
    heroes: heroReducer,
  },
});

// Define AppDispatch type
export type AppDispatch = typeof store.dispatch;

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

// Create a custom hook for using dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;