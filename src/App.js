import './App.css';
import styles from "./styles/App.module.css"
import Toggle from './comps/toggle'

function App() {
  return (
        <div className={styles.container}>

      <nav className={styles.nav}>
        <ul>
          <li>Home</li>
          <li>Projects</li>
          <li>Blog</li>
          <li>About</li>
        </ul>
        <div className={styles.controls}>
          <Toggle />
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.image}>
          </div>
        </div>
      </main>

        <footer className={styles.footer}>
          2002 Copyright
        </footer>

    </div>

  );
}

export default App;
