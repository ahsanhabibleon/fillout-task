import { createSlice } from '@reduxjs/toolkit';
import type { ReactNode } from 'react';
import { initialState } from './static';

export interface IPageState {
  key: string;
  label: string;
  orderId: number;
  notDraggable?: boolean;
  isActive?: boolean;
  icon?: ReactNode;
}

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    addPage(state, action) {
      return [
        ...state,
        {
          key: `new-page-${state?.length + 1}`,
          label: `Page ${state?.length + 1}`,
          orderId: action.payload?.orderId || state?.length + 1,
          icon: 'IconPageDefault',
        },
      ];
    },
    orderPages(state, action) {
      return [...action.payload];
    },
    setActivePage(state, action) {
      return state?.map((page: IPageState) => {
        if (page.key === action.payload?.pageKey) {
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
