import type { IPageState } from "./pagesSlice";

export const initialState: IPageState[] = [
  {
    key: 'info',
    label: 'Info',
    icon: 'IconInfo',
  },
  {
    key: 'details',
    label: 'Details',
    icon: 'IconPageDefault',
  },
  {
    key: 'other',
    label: 'Other',
    icon: 'IconPageDefault',
  },
  {
    key: 'ending',
    label: 'Ending',
    icon: 'IconCircleCheck',
  },
];