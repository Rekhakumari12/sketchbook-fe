import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEraser, faFileArrowDown, faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import styles from './index.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { MENU_ITEMS } from '@/constants'
import { menuItemClick, actionItemClick } from '@/slice/menuSlice'
import cx from 'classnames'

export const Menu = () => {
  const dispatch = useDispatch()
  const { activeMenuItem } = useSelector((state) => state.menu)
  const handleClick = (itemName) => {
    dispatch(menuItemClick(itemName))
  }

  const handleActionItemClick = (itemName) => {
    dispatch(actionItemClick(itemName))
  }

  return (
    <div className={styles.menuContainer}>
      {/* visual menu items - have active state */}

      <button
        className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL })}
        onClick={() => handleClick(MENU_ITEMS.PENCIL)}
      >
        <FontAwesomeIcon icon={faPencil} className={styles.icon} />
      </button>
      <button
        className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === MENU_ITEMS.ERASER })}
        onClick={(e) => handleClick(MENU_ITEMS.ERASER)}
      >
        <FontAwesomeIcon icon={faEraser} className={styles.icon} />
      </button>
      {/* action menu items */}

      <button className={styles.iconWrapper} onClick={(e) => handleActionItemClick(MENU_ITEMS.UNDO)}>
        <FontAwesomeIcon icon={faRotateLeft} className={styles.icon} />
      </button>
      <button className={styles.iconWrapper} onClick={(e) => handleActionItemClick(MENU_ITEMS.REDO)}>
        <FontAwesomeIcon icon={faRotateRight} className={styles.icon} />
      </button>
      <button className={styles.iconWrapper} onClick={(e) => handleActionItemClick(MENU_ITEMS.DOWNLOAD)}>
        <FontAwesomeIcon icon={faFileArrowDown} className={styles.icon} />
      </button>
    </div>
  )
}
