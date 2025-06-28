import type { IPageState } from "./pagesSlice";

export const initialState: IPageState[] = [
  {
    key: 'info',
    label: 'Info',
    orderId: 1,
    icon: 'IconInfo',
  },
  {
    key: 'details',
    label: 'Details',
    orderId: 2,
    icon: 'IconPageDefault',
  },
  {
    key: 'other',
    label: 'Other',
    orderId: 3,
    icon: 'IconPageDefault',
  },
  {
    key: 'ending',
    label: 'Ending',
    orderId: 4,
    icon: 'IconCircleCheck',
  },
];