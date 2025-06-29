import { useDispatch } from 'react-redux';
import { addPage, orderPages, setActivePage, type IPageState } from '../pagesSlice';

export const useGlobalDispatcher = () => {
  const dispatch = useDispatch();

  const addNewPage = (item?: IPageState, index?: number) => {
    dispatch(
      addPage({
        item,
        index,
      })
    );
  };

  const reOrderPages = (orderedPages: IPageState[]) => {
    dispatch(orderPages(orderedPages));
  };

  const setPageAsActive = (pageKey: string) => {
    dispatch(setActivePage({ pageKey }));
  };

  return {
    addNewPage,
    reOrderPages,
    setPageAsActive,
  };
};
