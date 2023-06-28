import styles from './About.module.css'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import SectionTitle from '../comps/sectionTitle'

export default function About() {
  const [ tools, setTools ] = useState(null)

  useEffect (() => {
    const getData = async () => {
      const resp = await fetch("tools.json")
      const data = await resp.json()
      setTools(data)
    }
    getData();
  }, [])

  return (
  <div className={styles.main} >
    <SectionTitle>Tech Stack</SectionTitle>
    <div className={styles.tech}>
      {tools && tools.map ((tool, i) => {
        return (
          <motion.div key={tool.name}
            className={styles.card}
            initial={{opacity:0, x:"-100%", y: "-100%"}}
            animate={{opacity:1, x:0, y: 0}}
            transition={{duration: 0.15, delay: i * 0.2}}
          >
            <img src={tool.img} alt={tool.alt}/>
            <p className={styles.toolname}>
              {tool.name}
            </p>
          </motion.div>
        )
      })}
    </div>
  </div>
  )
}
