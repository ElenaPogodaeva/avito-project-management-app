import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './thunks';
import { Assignee } from '../types';

export type UsersState = {
  users: Assignee[];
  isLoading: boolean;
  error: string;
};

const initialState: UsersState = {
  users: [],
  isLoading: true,
  error: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';

      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Error occured';
      state.users = [];
    });
  },
});

export default usersSlice.reducer;
