import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import { useGlobalSelectors } from '../../../store/selectors/useGlobalSelectors';
import { useGlobalDispatcher } from '../../../store/dispatchers/useGlobalDispatcher';
import SortableItem from '../../Atoms/SortableItem/SortableItem';
import styles from './DraggableList.module.scss';
import Icon from '../../Icons';


const DraggableList = () => {
  const {pages: pages} = useGlobalSelectors();
  const {addNewPage, reOrderPages, setPageAsActive} = useGlobalDispatcher();

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

    reOrderPages(reordered)
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={pages.map(item => item?.key)} // item.key == draggable ID
        strategy={horizontalListSortingStrategy}
      >
        <ul className={styles.sortable_list}>
          {pages.map((page, index) => (
            <>
              <SortableItem onClick={() => setPageAsActive(page.key)} key={page.key} item={page} />
              <span onClick={() => addNewPage(page)} className={`${styles.sortable_list_item_icon_add_wrapper}`}>
                {index !== pages?.length -1 && <span className={`${styles.sortable_list_item_icon_add}`}><Icon name='IconPlusSmall' /></span>}
              </span>
            </>
          ))}
          <SortableItem  onClick={addNewPage} className={styles.sortable_list_item__add} item={{ label: 'Add page', key: 'add-page', orderId: -1, notDraggable: true, icon: 'IconPlus' }} />
        </ul>
      </SortableContext>
    </DndContext>
  );
}

export default DraggableList;
