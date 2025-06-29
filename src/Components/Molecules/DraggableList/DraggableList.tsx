import React, { useCallback, useRef, useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';

import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { Button, Input } from '@headlessui/react';
import { v4 as uuidv4 } from 'uuid';

import { useGlobalSelectors } from '../../../store/selectors/useGlobalSelectors';
import { useGlobalDispatcher } from '../../../store/dispatchers/useGlobalDispatcher';
import { pageTypes, type PageTypeEnum } from '../../../store/static';

import SortableItem from '../../Atoms/SortableItem/SortableItem';
import styles from './DraggableList.module.scss';
import Icon, { type IconName } from '../../Icons';
import Modal from '../Modal/Modal';

interface Page {
  key: string;
  label: string;
  icon: string;
  isActive: boolean;
  notDraggable?: boolean;
  orderId: string | number;
}

const DraggableList = () => {
  const { pages: pages } = useGlobalSelectors();
  const { addNewPage, reOrderPages, setPageAsActive } = useGlobalDispatcher();

  const [openModal, setOpenModal] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState<number | null>(null);
  const [pageType, setPageType] = useState<string>('');

  const pageNameRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = pages?.findIndex(i => i.orderId === active.id);
    const newIndex = pages?.findIndex(i => i.orderId === over.id);

    const newItems = arrayMove(pages, oldIndex, newIndex);

    reOrderPages(newItems);
  };

  const handleSetPageType = useCallback(({ pageType }: { pageType: string }) => {
    setOpenModal('page-name');
    if (pageType != null) {
      setPageType(pageType);
    }
  }, []);

  const handleOpenModal = useCallback((index?: number | null) => {
    setOpenModal('page-type');
    if (index != null) {
      setPageIndex(index);
    }
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const pageLabel = pageNameRef?.current?.value;
      const id = uuidv4();

      addNewPage(
        {
          key: pageType || '',
          label: pageLabel || '',
          icon: pageTypes[pageType as PageTypeEnum]?.icon,
          isActive: false,
          orderId: id as string,
        } as Page,
        pageIndex as number
      );
      setOpenModal(null);
    },
    [pageIndex, addNewPage, pageType]
  );

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        // onDragStart={event => setActiveId(event.active.id)}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={pages?.map(item => item?.orderId)} // item.key == draggable ID
          strategy={horizontalListSortingStrategy}
        >
          <ul className={styles.sortable_list}>
            {pages?.map((page, index) => (
              <React.Fragment key={page.orderId}>
                <SortableItem onClick={() => setPageAsActive(page.orderId as string)} item={page} />
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
                orderId: 'xxx',
              }}
            />
          </ul>
        </SortableContext>
      </DndContext>

      <Modal
        title="Choose a page type"
        visible={openModal === 'page-type'}
        onCloseModal={() => setOpenModal(null)}
      >
        <ul className={styles.list_of_page_types}>
          {Object.keys(pageTypes)?.map((key: string) => (
            <li key={key} onClick={() => handleSetPageType({ pageType: key })}>
              <Icon name={pageTypes[key  as PageTypeEnum].icon as IconName} />
              <span>{pageTypes[key  as keyof typeof pageTypes].label}</span>
            </li>
          ))}
        </ul>
      </Modal>

      <Modal
        title="Name your page"
        visible={openModal === 'page-name'}
        onCloseModal={() => setOpenModal(null)}
      >
        <form onSubmit={handleSubmit} className={styles.name_your_page}>
          <Input ref={pageNameRef} name="page-name" required type="text" />
          <Button
            type="submit"
            className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-active:bg-sky-700 data-hover:bg-sky-500"
          >
            Save
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default DraggableList;
