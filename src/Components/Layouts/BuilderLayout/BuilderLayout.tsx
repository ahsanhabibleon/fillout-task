import styles from './BuilderLayout.module.scss';
import type { ILayoutType } from './BuilderLayout.types';

const BuilderLayout = ({ children }: ILayoutType ) => {
  return (
    <div className={styles.main_layout}>
        <div className={styles.main_layout__container}>
            {children}
        </div>
    </div>
  )
}

export default BuilderLayout