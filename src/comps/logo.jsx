import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {

  return (
    <Link to={"/"}>
        <div className={styles.main}>
            <h1>Farukara</h1>
            <h2>Web Developer From Turkey</h2>
        </div>
    </Link>
  );
}

export default Logo;
