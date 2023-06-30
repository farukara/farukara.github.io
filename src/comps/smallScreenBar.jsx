import styles from "./SmallScreenBar.module.scss"
import Burger from "./burger"
import Logo from "./logo"

function SmallScreenBar() {
    return (
        <div className={styles.container}>
            <Logo />
            <Burger />
        </div>
    )
}

export default SmallScreenBar
