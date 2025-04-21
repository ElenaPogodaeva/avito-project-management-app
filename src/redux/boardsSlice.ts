import { createSlice } from '@reduxjs/toolkit';
import { fetchBoards } from './thunks';
import { Board } from '../types';

export type BoardsState = {
  boards: Board[];
  isLoading: boolean;
  error: string;
};

const initialState: BoardsState = {
  boards: [],
  isLoading: true,
  error: '',
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.boards = action.payload;
    });
    builder.addCase(fetchBoards.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Error occured';
      state.boards = [];
    });
  },
});

export default boardsSlice.reducer;
