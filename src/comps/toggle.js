import { useState } from 'react';
import styles from "./Toggle.module.css"

export default function Toggle() {
  const [p, setP] = useState(true)

  function handleClick (e) {
    setP (!p)
  }
  return (
    <div className={styles.container}
        onClick = {handleClick}
        style={{
          justifyContent: p ? "flex-end" : "flex-start",
        }}
    >

      <svg xmlns="http://www.w3.org/2000/svg" className={styles.moon} viewBox="0 0 20 20" fill="white">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg> 

      <div className={styles.slider} >
      </div>

    </div>
  )
}

