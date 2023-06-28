import { useState, useEffect } from 'react';
import styles from'./Projects.module.css';
import { motion } from 'framer-motion'

import { useTheme } from '../hooks/ThemeCtx'
import Tags from '../comps/tags'
import SectionTitle from '../comps/sectionTitle'

export default function Projects () {
  const [ projects, setProjects ] = useState()
  const { dark } = useTheme()

  useEffect (() => {
    const fetchprojects = async () => {
      const raw = await fetch("projects.json")
      const data = await raw.json()
      setProjects(data)
    }
    fetchprojects()
  }, [])

  return (
  <div className={styles.container}>
    <SectionTitle>Projects</SectionTitle>
    <main className={styles.grid}>
      {projects && projects.map(project => (
        <motion.a key={project.id}
          className={styles.card}
          whileHover={{scale:1.01}}
          href={project.link} 
          target="_blank" 
          data-testid="motionlink"
          style= {{
              border: dark ? "1px solid #444d" : "1px solid #dddd",
          }}
        >
          <div className={styles.image}
              style={{
                backgroundImage: `url(${project.image})`,
              }}
          >
          </div>
          <h2>{project.name}</h2>
            <Tags data={project.tech} />
          <div className={styles.description}>
            {project.description}
          </div>
        </motion.a>
      ))}
    </main>
  </div>
  )
}
