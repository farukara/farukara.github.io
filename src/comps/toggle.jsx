import { motion } from "framer-motion";
import styles from "./Toggle.module.css"
import {useTheme} from '../hooks/ThemeCtx'

export const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
};

export default function Toggle() {
  const {dark, setDark } = useTheme()

  function handleClick() {
    if (setDark) {
        setDark(!dark)
    }
  }

  return (
    <div 
        data-dark={dark}
        className={styles.themeContainer}
        onClick={handleClick}
        style={{
            backgroundColor: dark ? "#333" : "#ddd",
            color: dark ? "ccc" : "333",
        }}
    >
        <motion.p className={styles.themetext}
            layout
            transition={spring}
            style={{
                order: dark ? 0 : 2,
                color: dark ? "#ccc" : "#111",
                // marginLeft: dark ? 3 : 0,
                // marginRight: dark ? 0 : 3,
            }}
        >
            {dark ? "DARK" : "LIGHT"}
        </motion.p>
        <motion.div 
            className={styles.slider}
            layout
            transition={spring}
            style={{
                backgroundColor: dark ? "#ccc" : "#333",
            }}
        >
        </motion.div>
    </div>
  )
}
