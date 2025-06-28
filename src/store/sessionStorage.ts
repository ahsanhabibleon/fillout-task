import type { IPageState } from "./pagesSlice";

// src/store/sessionStorage.ts
export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('builderState');
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch {
    return undefined;
  }
};

export const saveState = (state: {pages: IPageState[]}) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('builderState', serializedState);
  } catch {
    // ignore write errors
  }
};
