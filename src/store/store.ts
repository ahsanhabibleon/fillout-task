// src/store/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import pagesReducer from './pagesSlice';
import { loadState, saveState } from './sessionStorage';

// Combine all reducers here
const rootReducer = combineReducers({
  pages: pagesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(), // sessionStorage state
});

store.subscribe(() => {
  saveState({
    pages: store.getState().pages,
  });
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
