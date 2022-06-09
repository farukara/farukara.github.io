import { useContext, useState, createContext } from "react";

const ThemeCtx = createContext()
const ThemeToggleCtx = createContext()

export function useTheme () {
  return useContext(ThemeCtx)
}
export function useToggleTheme () {
  return useContext(ThemeToggleCtx)
}
export default function ThemeProv({children}) {
  const [dark, setDark] = useState(false)

  return (
    <ThemeCtx.Provider value={dark}>
      <ThemeToggleCtx.Provider value={setDark}>
        {children}
      </ThemeToggleCtx.Provider >
    </ThemeCtx.Provider >
  )
}
