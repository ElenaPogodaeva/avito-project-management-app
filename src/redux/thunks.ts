import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createTask,
  getBoards,
  getBoardTasks,
  getTasks,
  getUsers,
  updateTask,
  updateTaskStatus,
} from '../api/api';
import { TaskCreate, TaskUpdate, UpdateStatus } from '../types';
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
  'board/fetchBoard',
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

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue }) => {
  try {
    const response = await getTasks();
    const tasks = response.data;
    return tasks;
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const updateTaskById = createAsyncThunk(
  'tasks/updateTaskById',
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

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task: TaskCreate, { rejectWithValue, dispatch }) => {
    try {
      const response = await createTask(task);
      // dispatch(editTask({ taskId, task }));
      return response;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const updateStatus = createAsyncThunk(
  'tasks/updateStatus',
  async (data: { taskId: number; status: UpdateStatus }, { rejectWithValue, dispatch }) => {
    try {
      const { taskId, status } = data;
      const response = await updateTaskStatus(taskId, status);
      // dispatch(editTask({ taskId, task }));
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
