import styles from './SectionTitle.module.css'
import { useTheme } from '../hooks/ThemeCtx'

export default function SectionTitle({children}) {
  const { dark } = useTheme()

  return (
    <h2 className={styles.title}
      style={{
        color: dark ? "#ddd" : "#444",
        backgroundImage: `radial-gradient(ellipse at center, darkgoldenrod 0%, ${dark ? "transparent" : "transparent"} 50%)`,
      }}
    >{children}</h2>
  )
}
