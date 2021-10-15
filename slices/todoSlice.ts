import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Task, Tag } from '../types/types';

type State = {
  editedTask: Omit<Task, 'completed' | 'createdAt'>;
  selectedTag: Omit<Tag, 'createdAt'>;
};

const initialState: State = {
  editedTask: { id: '', title: '' },
  selectedTag: { id: '', name: '' },
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setEditedTask: (
      state,
      action: PayloadAction<Omit<Task, 'completed' | 'createdAt'>>,
    ) => {
      state.editedTask = action.payload;
    },
    resetEditedTask: (state) => {
      state.editedTask = initialState.editedTask;
    },
    setSelectedTag: (state, action: PayloadAction<Omit<Tag, 'createdAt'>>) => {
      state.selectedTag = action.payload;
    },
    resetSelectedTag: (state) => {
      state.selectedTag = initialState.selectedTag;
    },
  },
});
export const {
  setEditedTask,
  resetEditedTask,
  setSelectedTag,
  resetSelectedTag,
} = todoSlice.actions;

export const selectEditedTask = (state: RootState) => state.todo.editedTask;
export const selectTag = (state: RootState) => state.todo.selectedTag;

export default todoSlice.reducer;
