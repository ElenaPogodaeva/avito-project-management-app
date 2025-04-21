import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import boardsReducer from './boardsSlice';
import boardReducer from './boardSlice';
import tasksReducer from './tasksSlice';
import usersReducer from './usersSlice';
// import { usersApi } from '../api/users';
// import { boardsApi } from '../api/boards';

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    //board: boardReducer,
    users: usersReducer,
    tasks: tasksReducer,
    // [boardsApi.reducerPath]: boardsApi.reducer,
    // [usersApi.reducerPath]: usersApi.reducer,
  },

  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
