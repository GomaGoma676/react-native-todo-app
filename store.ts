import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import todoReducer from './slices/todoSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
