import { COLORS, MENU_ITEMS } from '@/constants'
import styles from './index.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { changeBrushSize, changeColor } from '@/slice/toolboxSlice'
import cx from 'classnames'
import { socket } from '@/socket'

export const Toolbox = () => {
  const dispatch = useDispatch()
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem)
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem])
  const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL
  const showBrushToolOption = activeMenuItem === MENU_ITEMS.PENCIL || activeMenuItem === MENU_ITEMS.ERASER

  const handleBrushSize = (e) => {
    dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }))
    socket.emit('changeConfig', { color, size: e.target.value })
  }

  const handleChangeColor = (newColor) => {
    dispatch(changeColor({ item: activeMenuItem, color: newColor }))
    socket.emit('changeConfig', { color: newColor, size })
  }

  return (
    <div className={styles.toolboxContainer}>
      {showStrokeToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolLabel}>Stroke Color {activeMenuItem}</h4>
          <div className={styles.itemContainer}>
            <div
              className={cx(styles.colorBox, { [styles.active]: color === COLORS.BLACK })}
              style={{ backgroundColor: COLORS.BLACK }}
              onClick={() => handleChangeColor(COLORS.BLACK)}
            />
            <div
              className={cx(styles.colorBox, { [styles.active]: color === COLORS.BLUE })}
              style={{ backgroundColor: COLORS.BLUE }}
              onClick={() => handleChangeColor(COLORS.BLUE)}
            />
            <div
              className={cx(styles.colorBox, { [styles.active]: color === COLORS.GREEN })}
              style={{ backgroundColor: COLORS.GREEN }}
              onClick={() => handleChangeColor(COLORS.GREEN)}
            />
            <div
              className={cx(styles.colorBox, { [styles.active]: color === COLORS.ORANGE })}
              style={{ backgroundColor: COLORS.ORANGE }}
              onClick={() => handleChangeColor(COLORS.ORANGE)}
            />
            <div
              className={cx(styles.colorBox, { [styles.active]: color === COLORS.RED })}
              style={{ backgroundColor: COLORS.RED }}
              onClick={() => handleChangeColor(COLORS.RED)}
            />
          </div>
        </div>
      )}
      {showBrushToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolLabel}>Brush Size</h4>
          <div className={styles.itemContainer}>
            <input type="range" min={1} max={50} step={1} onChange={handleBrushSize} value={size} />
          </div>
        </div>
      )}
    </div>
  )
}
