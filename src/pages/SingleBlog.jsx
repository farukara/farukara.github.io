import ReactMarkdown from "react-markdown"
import styles from "./SingleBlog.module.scss"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useTheme } from "../hooks/ThemeCtx"

export default function SingleBlog() {
    const { dark } = useTheme()
    const [content, setContent] = useState("")
    const { id } = useParams()

    useEffect(() => {
        fetch(`/blog/${id}/${id}.md`)
            .then((data) => data.text())
            .then((text) => setContent(text))
    }, [id])

    useEffect(() => {}, [content])

    return (
        <div
            className={styles.main}
            style={{
                color: dark ? "#aaa" : "#333",
            }}
        >
            <ReactMarkdown children={content} />
        </div>
    )
}
