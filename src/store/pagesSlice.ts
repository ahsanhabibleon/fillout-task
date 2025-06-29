import { createSlice } from '@reduxjs/toolkit';
import type { ReactNode } from 'react';
import { initialPages } from './static';

export interface IPageState {
  key: string;
  label: string;
  notDraggable?: boolean;
  isActive?: boolean;
  icon?: ReactNode;
  orderId: string | number;
}

const pagesSlice = createSlice({
  name: 'pages',
  initialState: initialPages,
  reducers: {
    addPage(state, action) {
      if (action?.payload?.index != null) {
        state.splice(action?.payload?.index + 1, 0, { ...action?.payload?.item });

        return state;
      }
      return [...state, { ...action?.payload?.item }];
    },
    orderPages(_, action) {
      return [...action.payload];
    },
    setActivePage(state, action) {
      return state?.map((page: IPageState) => {
        if (page.orderId === action.payload?.orderId) {
          return { ...page, isActive: true };
        } else {
          return { ...page, isActive: false };
        }
      });
    },
  },
});

export const { addPage, orderPages, setActivePage } = pagesSlice.actions;
export default pagesSlice.reducer;
