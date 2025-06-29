import { useCallback, useEffect, useRef, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

import type { IPageState } from '../../../store/pagesSlice';
import Icon, { type IconName } from '../../Icons';
import styles from './SortableList.module.scss';

const SortableItem = (props: {
  item: IPageState;
  className?: string;
  onClick?: (item?: IPageState) => void;
}) => {
  const { item, className = '', onClick = () => {} } = props;

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item?.orderId,
  });

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const contextMenuRef = useRef<HTMLButtonElement>(null);
  const contextMenuPopOverRef = useRef<HTMLDivElement>(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleOnClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setIsContextMenuOpen(false);
      if (typeof onClick == 'function' && event.button === 0) {
        onClick(item);
      }
    },
    [item, onClick]
  );

  const handleRightClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault(); // prevent default context menu
    event.stopPropagation();
    setIsContextMenuOpen(true);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuPopOverRef.current &&
        !contextMenuPopOverRef?.current?.contains(event.target as Node)
      ) {
        setIsContextMenuOpen(false);
      }
    };

    if (isContextMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isContextMenuOpen]);

  if (item?.notDraggable) {
    return (
      <li onClick={handleOnClick} className={`${styles.sortable_list_item} ${className}`}>
        {item?.icon && (
          <span className={`${styles.sortable_list_item_icon}`}>
            <Icon name={item?.icon as IconName} />
          </span>
        )}
        <span>{item.label}</span>
      </li>
    );
  }

  return (
    <li
      {...attributes}
      {...listeners}
      onMouseDown={handleOnClick}
      className={`${styles.sortable_list_item} ${className} ${item?.isActive ? styles.sortable_list_item_active : ''}`}
      ref={setNodeRef}
      style={style}
    >
      {item?.icon && (
        <span className={`${styles.sortable_list_item_icon}`}>
          <Icon name={item?.icon as IconName} />
        </span>
      )}
      <span>{item.label}</span>

      <Popover
        className="group"
        ref={contextMenuPopOverRef}
        onPointerDown={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <PopoverButton
          className={`flex items-center gap-2 ${styles.context_menu_btn}`}
          ref={contextMenuRef}
          onContextMenu={e => handleRightClick(e)}
        >
          <span
            className={`${styles.sortable_list_item_icon} ${styles.sortable_list_item_icon_active}`}
          >
            <Icon name="IconThreeDots" />
          </span>
        </PopoverButton>

        {isContextMenuOpen && (
          <PopoverPanel static anchor="bottom" className={styles.page_context_popover}>
            <h4>Settings</h4>
            <div className={styles.page_context_popover_settings}>
              <div className={styles.page_context_popover_settings_item}>
                <Icon name="IconFlag" />
                Set as first page
              </div>
              <div className={styles.page_context_popover_settings_item}>
                <Icon name="IconPencil" />
                Rename
              </div>
              <div className={styles.page_context_popover_settings_item}>
                <Icon name="IconCopy" />
                Copy
              </div>
              <div className={styles.page_context_popover_settings_item}>
                <Icon name="IconDuplicate" />
                Duplicate
              </div>
            </div>

            <div className={styles.page_context_popover_footer}>
              <Icon name="IconDelete" />
              Delete
            </div>
          </PopoverPanel>
        )}
      </Popover>
    </li>
  );
};

export default SortableItem;
