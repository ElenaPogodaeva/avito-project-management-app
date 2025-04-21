import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTasks } from './thunks';
import { Task, TaskUpdate } from '../types';

export type TasksState = {
  tasks: Task[];
  isLoading: boolean;
  error: string;
};

const initialState: TasksState = {
  tasks: [],
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
  },
});

export const { editTask } = tasksSlice.actions;

export default tasksSlice.reducer;
