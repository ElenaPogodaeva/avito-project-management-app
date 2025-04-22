import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBoard, fetchTasks } from './thunks';
import { Task, TaskUpdate } from '../types';

export type TasksState = {
  tasks: Task[];
  searchValue: string;
  isLoading: boolean;
  error: string;
};

const initialState: TasksState = {
  tasks: [],
  searchValue: '',
  isLoading: true,
  error: '',
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    editTask(state, action: PayloadAction<{ taskId: number; task: TaskUpdate }>) {
      const { taskId, task } = action.payload;
      const currentTask = state.tasks.find((item) => item.id === taskId) as Task;
      currentTask.assignee.id = task.assigneeId;
      currentTask.title = task.title;
      currentTask.description = task.description;
      currentTask.priority = task.priority;
      currentTask.status = task.status;
    },
    searchByName: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) =>
        task.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Error occured';
      state.tasks = [];
    });
    builder.addCase(fetchBoard.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.tasks = action.payload;
    });
    builder.addCase(fetchBoard.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Error occured';
      state.tasks = [];
    });
  },
});

export const { editTask, searchByName } = tasksSlice.actions;

export default tasksSlice.reducer;
