import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';

import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

import { useGlobalSelectors } from '../../../store/selectors/useGlobalSelectors';
import { useGlobalDispatcher } from '../../../store/dispatchers/useGlobalDispatcher';
import SortableItem from '../../Atoms/SortableItem/SortableItem';
import styles from './DraggableList.module.scss';
import Icon from '../../Icons';
import React, { useCallback, useRef, useState } from 'react';
import Modal from '../Modal/Modal';

interface Page {
  key: string;
  label: string;
  icon: string;
  isActive: boolean;
  notDraggable?: boolean;
  orderId?: number;
}

const DraggableList = () => {
  const { pages: pages } = useGlobalSelectors();
  const { addNewPage, reOrderPages, setPageAsActive } = useGlobalDispatcher();

  const [openModal, setOpenModal] = useState(false);
  const [pageIndex, setPageIndex] = useState<number | null>(null);

  const pageNameRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = pages.findIndex(i => i.key === active.id);
    const newIndex = pages.findIndex(i => i.key === over.id);

    const newItems = arrayMove(pages, oldIndex, newIndex);

    const reordered = newItems.map((item, idx) => ({
      ...item,
      orderId: idx + 1,
    }));

    reOrderPages(reordered);
  };

  const handleOpenModal = useCallback((index?: number | null) => {
    setOpenModal(true);
    if (index != null) {
      setPageIndex(index);
    }
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const pageLabel = pageNameRef?.current?.value;
      const existingPagesBySameName = pages.filter(page => page.label?.includes(pageLabel as string));
      const length = existingPagesBySameName?.length;
      const suffixToAdd = length ? ` ${(length + 1)}` : ''

      addNewPage(
        {
          key: pageLabel?.split(' ')?.join('-')?.concat((suffixToAdd || '')?.toString()) || '',
          label: pageLabel ? pageLabel?.concat((suffixToAdd || '')?.toString()) : '',
          icon: 'IconPageDefault',
          isActive: false,
        } as Page,
        pageIndex as number
      );
      setOpenModal(false);
    },
    [pageIndex, addNewPage, pages]
  );

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={pages.map(item => item?.key)} // item.key == draggable ID
          strategy={horizontalListSortingStrategy}
        >
          <ul className={styles.sortable_list}>
            {pages.map((page, index) => (
              <React.Fragment key={page.key}>
                <SortableItem onClick={() => setPageAsActive(page.key)} item={page} />
                <span
                  onClick={() => handleOpenModal(index)}
                  className={`${styles.sortable_list_item_icon_add_wrapper}`}
                >
                  {index !== pages?.length - 1 && (
                    <span className={`${styles.sortable_list_item_icon_add}`}>
                      <Icon name="IconPlusSmall" />
                    </span>
                  )}
                </span>
              </React.Fragment>
            ))}
            <SortableItem
              onClick={() => handleOpenModal(null)}
              className={styles.sortable_list_item__add}
              item={{
                label: 'Add page',
                key: 'add-page',
                notDraggable: true,
                icon: 'IconPlus',
              }}
            />
          </ul>
        </SortableContext>
      </DndContext>

      <Modal title="Name your page" visible={openModal}>
        <form onSubmit={handleSubmit} className={styles.modal_content}>
          <input ref={pageNameRef} name="page-name" required type="text" />
          <button type="submit">Save page</button>
        </form>
      </Modal>
    </>
  );
};

export default DraggableList;
