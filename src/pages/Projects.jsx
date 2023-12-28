import { useState, useEffect } from "react"
import styles from "./Projects.module.scss"
import { motion } from "framer-motion"

import { useTheme } from "../hooks/ThemeCtx"
import Tags from "../comps/tags"
import SectionTitle from "../comps/sectionTitle"
import { theme } from "../defaults"

export default function Projects() {
    const [projects, setProjects] = useState()
    const { dark } = useTheme()

    useEffect(() => {
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
                {projects &&
                    projects.map((project) => (
                        <motion.a
                            key={project.id}
                            className={styles.card}
                            whileHover={{ scale: 1.01 }}
                            href={project.link}
                            target="_blank"
                            data-testid="motionlink"
                            style={{
                                color: dark ? theme.colors.card.fg.dark : theme.colors.card.fg.light,
                                backgroundColor: dark ? theme.colors.card.bg.dark : theme.colors.card.bg.light,
                                border: dark
                                    ? theme.colors.border.dark
                                    : theme.colors.border.light,
                            }}
                        >
                            <div
                                className={styles.image}
                                style={{
                                    backgroundImage: `url(${project.image})`,
                                }}
                            ></div>
                            <div className={styles.lower}>
                                <h2>{project.name}</h2>
                                <Tags data={project.tech} />
                                <div className={styles.description}>
                                    {project.description}
                                </div>
                            </div>
                        </motion.a>
                    ))}
            </main>
        </div>
    )
}
