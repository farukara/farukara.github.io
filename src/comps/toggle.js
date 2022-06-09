import styles from "./Toggle.module.css"
import {useTheme, useToggleTheme } from './ThemeCtx'
import { useState, useRef } from "react"

export default function Toggle() {
  const [active, setActive] = useState(false)
  const dark = useTheme()
  const setDark = useToggleTheme()
  const themeOptions = ['Dark', 'Light', 'System']
  const themeRef = useRef()


  function handleClick(item, i) {
    setActive(!active)
    switch (i) {
      case 0:
        setDark(true)
        themeRef.current.innerText = item
        break
      case 1:
        setDark(false)
        themeRef.current.innerText = item
        break
      case 2:
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          setDark(true)
        } else {
          setDark(false)
        }
        themeRef.current.innerText = item
      default:
        break
    }
  }
  return (
    <div className={styles.container} >

      <div className={styles.input} 
        onClick={() => {setActive(!active)}}
        style={{
          backgroundColor: dark ? '#ccc' : '#333',
          color: dark ? '#333' : '#ccc',
        }}
      >
        <div className={styles.moon}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill= {dark ? "#333" : '#ccc'} stroke="none" height='20'>
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg> 
        </div>
        <p ref={ themeRef }>Dark</p>
      </div>

      <div 
        className={styles.options} 
        style={{
          visibility: active ? 'visible' : 'hidden',
        }}
      >
        <ul>
    {themeOptions.map((item, i) => (
      <li key={item}
      onClick={ () => handleClick(item, i)}
      >
      {item}</li>
    ))}
        </ul>
      </div>

    </div>
  )
}

