import styles from './Home.module.css'
import About from './About'
import Projects from './Projects'
import { motion } from "framer-motion";
import { pageVariants } from "../App";

export default function Home() {

  return (
    <motion.div className={styles.main}
        variants={pageVariants}
        initial="hidden"
        animate="show"
        exit="exit"
    >
      <div className={styles.section}
      >
        <About />
      </div>
      <div className={styles.section}>
        <Projects />
      </div>
    </motion.div>
  );
}
