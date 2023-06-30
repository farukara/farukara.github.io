import styles from "./Tags.module.css"

export default function Tags({ data }) {
    return (
        <div className={styles.tags}>
            {data.map((d) => (
                <span className={styles.tag} key={d}>
                    {d}
                </span>
            ))}
        </div>
    )
}
