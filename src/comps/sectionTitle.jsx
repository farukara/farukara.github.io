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
                    ? theme.colors.bg1.dark
                    : theme.colors.bg1.light,
                color: dark
                    ? theme.colors.fg1.dark
                    : theme.colors.fg1.light,
            }}
        >
            {children}
        </h2>
    )
}
