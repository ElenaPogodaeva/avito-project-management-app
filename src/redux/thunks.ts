import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBoards, getBoardTasks, getTasks, getUsers, updateTask } from '../api/api';
import { TaskUpdate } from '../types';
import { editTask } from './tasksSlice';

export const fetchBoards = createAsyncThunk(
  'boards/fetchBoards',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBoards();
      const boards = response.data;
      return boards;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const fetchBoard = createAsyncThunk(
  'boards/fetchBoard',
  async (boardId: number, { rejectWithValue }) => {
    try {
      const response = await getBoardTasks(boardId);
      const boards = response.data;
      return boards;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);