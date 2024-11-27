import { COLORS, MENU_ITEMS } from "@/constants";
import styles from "./index.module.css";
import { useSelector } from "react-redux";

export const Toolbox = () => {
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
  const showBrushToolOption =
    activeMenuItem === MENU_ITEMS.PENCIL ||
    activeMenuItem === MENU_ITEMS.ERASER;
  const handleBrushSize = () => {};

  return (
    <div className={styles.toolboxContainer}>
      {showStrokeToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolLabel}>Stroke Color {activeMenuItem}</h4>
          <div className={styles.itemContainer}>
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.BLACK }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.BLUE }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.GREEN }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.ORANGE }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.RED }}
            />
          </div>
        </div>
      )}
      {showBrushToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolLabel}>Brush Size</h4>
          <div className={styles.itemContainer}>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              onChange={handleBrushSize}
            />
          </div>
        </div>
      )}
    </div>
  );
};
