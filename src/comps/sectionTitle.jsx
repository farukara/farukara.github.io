import styles from "./SectionTitle.module.scss"
import { useTheme } from "../hooks/ThemeCtx"
import { theme } from "../defaults"

export default function SectionTitle({ children }) {
    const { dark } = useTheme()

    return (
        <h2
            className={styles.title}
            style={{
                backgroundColor: dark
                    ? theme.colors.bg2.dark
                    : theme.colors.bg2.light,
                color: dark
                    ? theme.colors.color1.dark
                    : theme.colors.color1.light,
            }}
        >
            {children}
        </h2>
    )
}
