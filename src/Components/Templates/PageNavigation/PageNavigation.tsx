import DraggableList from '../../Molecules/DraggableList/DraggableList';
import styles from './PageNavigation.module.scss';

const PageNavigation = () => {
  return (
    <div className={styles.page_navigation}>
      <DraggableList />
    </div>
  )
}

export default PageNavigation