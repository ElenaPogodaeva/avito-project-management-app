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

export const fetchTasks = createAsyncThunk('boards/fetchBoard', async (_, { rejectWithValue }) => {
  try {
    const response = await getTasks();
    const tasks = response.data;
    return tasks;
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const updateTaskById = createAsyncThunk(
  'cart/updateUserCard',
  async (data: { taskId: number; task: TaskUpdate }, { rejectWithValue, dispatch }) => {
    try {
      const { taskId, task } = data;
      const response = await updateTask(taskId, task);
      dispatch(editTask({ taskId, task }));
      return response;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await getUsers();
    const users = response.data;
    return users;
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});
