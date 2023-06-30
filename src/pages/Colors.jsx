import { useState, useEffect } from "react"
import styles from "./Colors.module.scss"

import { useTheme } from "../hooks/ThemeCtx"
import { motion } from "framer-motion"
import { pageVariants } from "../App"
import SectionTitle from "../comps/sectionTitle"
import SortSearch from "../comps/sortSearch"

const sortOptions = ["name", "red value", "green value", "blue value"]

export default function Colors() {
    const { dark } = useTheme()
    const [colors, setColors] = useState([])
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("name")

    useEffect(() => {
        let ff = data.filter((color) => {
            return color.name.includes(search.toLowerCase())
        })
        ff.sort((a, b) => {
            let [ared, agreen, ablue] = a.rgb.split(",")
            let [bred, bgreen, bblue] = b.rgb.split(",")
            ared = Number(ared.split("(")[1])
            agreen = Number(agreen.trim())
            ablue = Number(ablue.trim().replace(")", ""))

            bred = Number(bred.split("(")[1])
            bgreen = Number(bgreen.trim())
            bblue = Number(bblue.trim().replace(")", ""))

            switch (true) {
                case sort === "name":
                    switch (true) {
                        case a.name < b.name:
                            return -1
                        case a.name > b.name:
                            return 1
                        default:
                            return 0
                    }
                case sort === "red value":
                    switch (true) {
                        case ared - (agreen + ablue) / 2 >
                            bred - (bgreen + bblue) / 2:
                            return -1
                        case ared - (agreen + ablue) / 2 <
                            bred - (bgreen + bblue) / 2:
                            return 1
                        default:
                            return 0
                    }
                case sort === "green value":
                    switch (true) {
                        case agreen - (ared + ablue) / 2 >
                            bgreen - (bred + bblue) / 2:
                            return -1
                        case agreen - (ared + ablue) / 2 <
                            bgreen - (bred + bblue) / 2:
                            return 1
                        default:
                            return 0
                    }
                default:
                    switch (true) {
                        case ablue - (ared + agreen) / 2 >
                            bblue - (bred + bgreen) / 2:
                            return -1
                        case ablue - (ared + agreen) / 2 <
                            bblue - (bred + bgreen) / 2:
                            return 1
                        default:
                            return 0
                    }
            }
        })
        setColors(ff)
    }, [data, data.length, search, sort])

    function getData() {
        fetch("/css-named-colors.json")
            .then((response) => {
                return response.json()
            })
            .then((objs) => {
                setData(objs)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    async function handleClick(text) {
        try {
            await navigator.clipboard.writeText(text)
            console.log("Content copied to clipboard")
        } catch (err) {
            console.error("Failed to copy: ", err)
        }
    }
    return (
        <motion.div
            className={styles.main}
            variants={pageVariants}
            initial="hidden"
            animate="show"
            exit="exit"
        >
            <SectionTitle>CSS Named Colors</SectionTitle>

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
                {colors.map((color) => {
                    return (
                        <div
                            key={color.name}
                            className={styles.row}
                            style={{
                                color: dark ? "#fff" : "#000",
                                backgroundColor: dark ? "#000" : "#fff",
                                border: `1px solid ${color.name}`,
                            }}
                        >
                            <div>
                                <div className={styles.name}>
                                    {color.name}
                                    <div
                                        onClick={() => handleClick(color.name)}
                                    >
                                        {copyicon}
                                    </div>
                                </div>
                                <div className={styles.hex}>
                                    {color.hex}
                                    <div onClick={() => handleClick(color.hex)}>
                                        {copyicon}
                                    </div>
                                </div>
                                <div className={styles.rgb}>
                                    {color.rgb}
                                    <div onClick={() => handleClick(color.rgb)}>
                                        {copyicon}
                                    </div>
                                </div>
                                <div className={styles.hsl}>
                                    hsl({color.hsl})
                                    <div
                                        onClick={() =>
                                            handleClick(`hsl(${color.hsl})`)
                                        }
                                    >
                                        {copyicon}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={styles.box}
                                style={{
                                    color: `${color.name}`,
                                    backgroundColor: `${color.name}`,
                                }}
                            ></div>
                        </div>
                    )
                })}
            </motion.div>
        </motion.div>
    )
}

let copyicon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
        />
    </svg>
)
