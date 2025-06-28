import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export const useGlobalSelectors = () => {
  const pages = useSelector((state: RootState) => state?.pages);

  return { pages };
};
