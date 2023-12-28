import { useState } from "react"
import styles from "./SortSearch.module.scss"

import { useTheme } from "../hooks/ThemeCtx"
import { motion } from "framer-motion"
import { spring } from "./toggle"
import { theme } from "../defaults"

export default function SortSearch({
    sortOptions,
    search,
    setSearch,
    sort,
    setSort,
}) {
    const { dark } = useTheme()
    const [isSortOpen, setIsSortOpen] = useState(false)

    return (
        <div
            className={styles.settings}
            style={{
                backgroundColor: dark
                    ? theme.colors.bg1.dark
                    : theme.colors.bg1.light,
                color: dark
                    ? theme.colors.fg1.dark
                    : theme.colors.fg1.light,
            }}
        >
            <div
                className={styles.sort} //layout transition={{ spring }}
                style={{
                    width: isSortOpen ? "auto" : "31px",
                }}
            >
                <button
                    className={styles.icon}
                    aria-label="submit search"
                    onClick={() => setIsSortOpen(!isSortOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        width="100%"
                        height="100%"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                        />
                    </svg>
                </button>
                <div
                    className={styles.options}
                    style={{
                        display: isSortOpen ? "flex" : "none",
                    }}
                >
                    <span>Sort by:</span>
                    <div className={styles.chips}>
                        {sortOptions.map((option) => (
                            <span
                                key={option}
                                onClick={() => setSort(option)}
                                style={{
                                    backgroundColor:
                                        sort === option
                                            ? "rgba(148, 0, 211, 0.4)"
                                            : "",
                                    color: sort === option && "#ddd",
                                }}
                            >
                                {option.split(" ")[0]}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.search}>
                <div className={styles.content}>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={styles.search__input}
                        aria-label="search"
                        placeholder="enter your search"
                    />
                    <button className={styles.icon} aria-label="submit search">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            width="100%"
                            height="100%"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
