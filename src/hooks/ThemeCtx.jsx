import { useState, useEffect, createContext, useContext } from "react";

const ThemeCtx = createContext(true);
const ChangeThemeCtx = createContext(null);

export function useTheme () {
  const dark = useContext(ThemeCtx);
  const setDark = useContext(ChangeThemeCtx);
  return {dark, setDark};
}

export default function ThemeProvider ({children}) {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDark(true)
    } else {
      setDark(false)
    }

    if (localStorage.dark) {
      setDark(JSON.parse(localStorage.dark))
    }
  }, [setDark])




  useEffect (() => {
    localStorage.setItem("dark", JSON.stringify(dark))
  }, [dark])

  useEffect (() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      event.matches ? setDark(true) : setDark(false);
    });
  }, [])

  return (
    <ThemeCtx.Provider value={dark}>
      <ChangeThemeCtx.Provider value={setDark}>
        {children}
      </ChangeThemeCtx.Provider>
    </ThemeCtx.Provider>
  )
}
