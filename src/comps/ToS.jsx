import ReactMarkdown from "react-markdown"
import { useState, useEffect } from "react"

export default function ToS() {
    const [content, setContent] = useState("")

    useEffect(() => {
        fetch(`/tos.md`)
            .then((data) => data.text())
            .then((text) => setContent(text))
    }, [])

    return <ReactMarkdown children={content} />
}
