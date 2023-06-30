import { motion, AnimatePresence } from "framer-motion"
import { useRef } from "react"
import { useTheme } from "../hooks/ThemeCtx"
import styles from "./Modal.module.css"
import { spring } from "./toggle"

export default function Modal({ isModalOpen, setIsModalOpen, children }) {
    const { dark } = useTheme()
    const contentRef = useRef(null)

    function handleClick(e) {
        if (!contentRef.current.contains(e.target)) {
            setIsModalOpen(false)
        }
    }

    return (
        <div className={styles.overlay} onClick={handleClick}>
            <AnimatePresence>
                <motion.div
                    className={styles.modal}
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={spring}
                    ref={contentRef}
                    style={{
                        color: dark ? "#ddd" : "#444",
                        backgroundColor: dark ? "#111" : "#eee",
                    }}
                >
                    <div className={styles.content}>{children}</div>
                    <p
                        className={styles.close}
                        onClick={() => setIsModalOpen(false)}
                    >
                        +
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
