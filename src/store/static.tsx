import type { IconName } from '../Components/Icons';
import type { IPageState } from './pagesSlice';

export type PageType = {
  key: string;
  label: string;
  icon: IconName;
};

const PageTypeEnum = {
  Info: 'info',
  Details: 'details',
  Other: 'other',
  Ending: 'ending',
} as const;

export type PageTypeEnum = typeof PageTypeEnum[keyof typeof PageTypeEnum];

export const pageTypes = {
  info: {
    key: 'info',
    label: 'Info',
    icon: 'IconInfo',
  },
  details: {
    key: 'details',
    label: 'Details',
    icon: 'IconPageDefault',
  },
  other: {
    key: 'other',
    label: 'Other',
    icon: 'IconPageDefault',
  },
  ending: {
    key: 'ending',
    label: 'Ending',
    icon: 'IconCircleCheck',
  },
};

export const initialPages: IPageState[] = Object.values(pageTypes)?.map((page, index) => ({
  ...page,
  orderId: `${page?.key}-${index}`,
}));
