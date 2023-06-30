import styles from "./SmallScreenBar.module.scss"
import Burger from "./burger"
import Logo from "./logo"

function SmallScreenBar() {
    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <Logo />
                <Burger />
            </nav>
        </div>
    )
}

export default SmallScreenBar
