import styles from "./Burger.module.css"
import { useTheme } from "../hooks/ThemeCtx"
import { useIsOpenSmallMenu } from "../hooks/SmallScreenMenuCtx"
import { useToggleSmallMenu } from "../hooks/SmallScreenMenuCtx"

export default function Burger() {
    const { dark } = useTheme()
    const isOpen = useIsOpenSmallMenu()
    const setIsOpen = useToggleSmallMenu()
    return (
        <div className={styles.controls} onClick={() => setIsOpen(!isOpen)}>
            Menu
            <div className={styles.burger}>
                {[...Array(3)].map((_, i) => {
                    return (
                        <div
                            key={i}
                            style={{
                                backgroundColor: dark ? "#ddd" : "#444",
                            }}
                        ></div>
                    )
                })}
            </div>
        </div>
    )
}
