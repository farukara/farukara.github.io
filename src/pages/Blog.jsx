import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

import styles from "./Blog.module.scss"
import { useTheme } from "../hooks/ThemeCtx"
import { pageVariants } from "../App"
import SortSearch from "../comps/sortSearch"
import Tags from "../comps/tags"
import SectionTitle from "../comps/sectionTitle"
import {theme} from "../defaults"

const sortOptions = ["recent", "oldest"]

export default function Blog() {
    const { dark } = useTheme()
    const [blogs, setBlogs] = useState([])
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("recent")

    useEffect(() => {
        let ff = data.filter((blog) => {
            return (
                blog.title.includes(search.toLowerCase()) ||
                blog.description.includes(search.toLowerCase())
            )
        })
        ff.sort((a, b) => {
            switch (true) {
                case sort === "oldest":
                    switch (true) {
                        case Date.parse(a.date) < Date.parse(b.date):
                            return -1
                        case Date.parse(a.date) > Date.parse(b.date):
                            return 1
                        default:
                            return 0
                    }
                case sort === "recent":
                    switch (true) {
                        case Date.parse(a.date) > Date.parse(b.date):
                            return -1
                        case Date.parse(a.date) < Date.parse(b.date):
                            return 1
                        default:
                            return 0
                    }
                default:
                    return 1
            }
        })
        setBlogs(ff)
    }, [data, data.length, search, sort])

    function getData() {
        fetch("/blogs.json")
            .then((response) => {
                return response.json()
            })
            .then((obj) => {
                setData(obj)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <motion.div
            className={styles.main}
            variants={pageVariants}
            initial="hidden"
            animate="show"
            exit="exit"
        >
            <SectionTitle>Blog</SectionTitle>
            <SortSearch
                sortOptions={sortOptions}
                search={search}
                setSearch={setSearch}
                sort={sort}
                setSort={setSort}
            />

            <motion.div
                className={styles.table}
                layout
                transition={{ duration: 0.3 }}
            >
                {blogs.map((blog) => {
                    return (
                        <Link to={`/blog/${blog.id}`} key={blog.id}>
                            <div
                                className={styles.card}
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
                                        backgroundImage: `url(${blog.image.link})`,
                                    }}
                                ></div>
                                <h2 className={styles.title}>{blog.title}</h2>
                                <Tags data={blog.tags} />
                                <div className={styles.description}>
                                    {blog.description}
                                </div>
                                <p className={styles.date}>{blog.date}</p>
                            </div>
                        </Link>
                    )
                })}
            </motion.div>
        </motion.div>
    )
}
