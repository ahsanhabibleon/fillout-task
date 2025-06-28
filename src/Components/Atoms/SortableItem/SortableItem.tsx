import { useSortable } from '@dnd-kit/sortable';
import type { IPageState } from '../../../store/pagesSlice';
import { CSS } from '@dnd-kit/utilities';

import styles from './SortableList.module.scss';
import { useCallback } from 'react';
import Icon, { type IconName } from '../../Icons';


const SortableItem = (props : { item: IPageState, className?: string; onClick?: (item?: IPageState) => void }) => {

  const {item, className = '', onClick = () => {}} = props;

  const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id: item?.key });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const handleOnClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (typeof onClick == 'function' && event.button === 0) {
          onClick(item);
        }
    }, [item, onClick]);

    const handleRightClick = (event: React.MouseEvent<HTMLLIElement>) => {
      event.preventDefault(); // prevent default context menu
      event.stopPropagation();
      console.log('Right-clicked:');
    };

    if (item?.notDraggable) {
      return <li onClick={handleOnClick} className={`${styles.sortable_list_item} ${className}`} >
        {item?.icon && <span className={`${styles.sortable_list_item_icon}`}><Icon name={item?.icon as IconName} /></span>}
        <span>{item.label}</span>
      </li>
    }
  
    return (
      <li {...attributes} {...listeners}
        onContextMenu={handleRightClick}
        onMouseDown={handleOnClick}
        className={`${styles.sortable_list_item} ${className} ${item?.isActive ? styles.sortable_list_item_active : ''}`}
        ref={setNodeRef}
        style={style}
      >
        {item?.icon && <span className={`${styles.sortable_list_item_icon}`}><Icon name={item?.icon as IconName} /></span>}
        <span onClick={handleRightClick}>{item.label}</span>
        <span className={`${styles.sortable_list_item_icon} ${styles.sortable_list_item_icon_active}`}><Icon name='IconThreeDots' /></span>
      </li>
    );
}

export default SortableItem