import styles from "./App.module.scss"
import Toggle from "./comps/toggle"
import SmallScreenBar from "./comps/smallScreenBar"
import Home from "./pages/Home"
import Blog from "./pages/Blog"
import Colors from "./pages/Colors"
import Contact from "./pages/Contact"
import SingleBlog from "./pages/SingleBlog"
import Burger from "./comps/burger"
import Logo from "./comps/logo"
import { Routes, Route, NavLink, Link, useLocation } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

import Modal from "./comps/modal"
import ToS from "./comps/ToS"

import { useTheme } from "./hooks/ThemeCtx"
import { useIsOpenSmallMenu } from "./hooks/SmallScreenMenuCtx"
import { useToggleSmallMenu } from "./hooks/SmallScreenMenuCtx"
import { theme } from "./defaults"

export const pageVariants = {
    hidden: {
        opacity: 0,
        x: "100vw",
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.3,
            type: "spring",
            mass: 0.4,
            damping: 8,
        },
    },
    exit: {
        x: "-100vw",
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },
}

function App() {
    const location = useLocation()
    const navRef = useRef(null)
    const floatingMenuRef = useRef(null)
    const [isOpenFloatingBurger, setIsOpenFloatingBurger] = useState(false)
    const [isPPModalOpen, setIsPPModalOpen] = useState(false)
    const { dark } = useTheme()
    const isOpen = useIsOpenSmallMenu()
    const setIsOpen = useToggleSmallMenu()

    useEffect(() => {
        const nav = navRef.current
        const callback = (entries) => {
            const [entry] = entries
            setIsOpenFloatingBurger(!entry.isIntersecting)
        }
        const options = {
            root: null,
            rootMargin: "30px",
            threshold: 0.1,
        }
        const observer = new IntersectionObserver(callback, options)
        if (navRef) observer.observe(nav)

        return () => {
            if (nav) observer.unobserve(nav)
        }
    }, [navRef])

    let activeStyle = {
        color: "dodgerblue",
        fontWeight: "bold",
        textShadow:
            "0px 0px 3px white,0px 0px 5px white,0px 0px 8px white,0px 0px 11px white",
    }

    const navVariants = {
        hidden: {
            opacity: 0,
            x: "30vw",
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 2,
                type: "spring",
                mass: 0.4,
                damping: 8,
            },
        },
        exit: {
            x: "30vw",
            opacity: 0,
            transition: { ease: "easeInOut" },
        },
    }

    function handleClick(e) {
        if (
            floatingMenuRef.current &&
            !floatingMenuRef.current.contains(e.target)
        ) {
            setIsOpen(false)
        }
    }

    return (
        <main
            className={styles.main}
            onClick={handleClick}
            style={{
                backgroundColor: dark ? "#000" : "#fff",
                color: dark ? "#ddd" : "#444",
            }}
        >
            <div
                ref={navRef}
                style={{
                    display: !window.matchMedia(`(max-width: 768px)`).matches
                        ? "none"
                        : "flex",
                }}
            >
                <SmallScreenBar />
            </div>

            <AnimatePresence mode="wait">
                {(isOpen ||
                    !window.matchMedia(`(max-width: 768px)`).matches) && (
                    <motion.nav
                        className={styles.nav}
                        ref={floatingMenuRef}
                        variants={navVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{
                            display: !window.matchMedia(`(max-width:768px)`)
                                .matches
                                ? "flex"
                                : isOpen
                                ? "flex"
                                : "none",
                            backgroundColor: dark
                                ? theme.colors.bg2.dark
                                : theme.colors.bg2.light,
                        }}
                    >
                        <div
                            style={{
                                display: window.matchMedia(`(max-width: 768px)`)
                                    .matches
                                    ? "none"
                                    : "flex",
                            }}
                        >
                            <Logo />
                        </div>
                        <ul>
                            <li onClick={() => setIsOpen(false)}>
                                <NavLink
                                    to="/"
                                    end
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li onClick={() => setIsOpen(false)}>
                                <NavLink
                                    to="/blog"
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }
                                >
                                    Blog
                                </NavLink>
                            </li>
                            <li onClick={() => setIsOpen(false)}>
                                <NavLink
                                    to="/colors"
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }
                                >
                                    Colors
                                </NavLink>
                            </li>
                            <li onClick={() => setIsOpen(false)}>
                                <NavLink
                                    to="/contact"
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                        <div className={styles.controls}>
                            <Toggle setIsOpen={setIsOpen} />

                            <div
                                className={styles.close}
                                onClick={() => setIsOpen(!isOpen)}
                                style={{
                                    display: !window.matchMedia(
                                        `(max-width: 768px)`
                                    ).matches
                                        ? "none"
                                        : "block",
                                }}
                            >
                                &times;
                            </div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>

            <div
                style={{
                    position: "fixed",
                    display: window.matchMedia(`(max-width: 768px)`).matches
                        ? isOpenFloatingBurger
                            ? "flex"
                            : "none"
                        : "none",
                    top: "10px",
                    right: "15px",
                    zIndex: "5",
                }}
            >
                <Burger />
            </div>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="blog/:id" element={<SingleBlog />} />
                    <Route path="blog" element={<Blog />} />
                    <Route path="colors" element={<Colors />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </AnimatePresence>

            {isPPModalOpen && (
                <Modal
                    isModalOpen={isPPModalOpen}
                    setIsModalOpen={setIsPPModalOpen}
                >
                    <ToS />
                </Modal>
            )}
            <footer
                className={styles.footer}
                style={{
                    backgroundColor: dark ? "#000" : "#fff",
                }}
            >
                <span>Have a question?</span>
                <Link to="/contact">Send me a message.</Link>
                <span>|</span>
                <span>© 2022-2023 Farukara</span>
                <span>|</span>
                <span
                    onClick={() => {
                        setIsPPModalOpen(true)
                    }}
                >
                    Privacy Policy
                </span>
                <span>|</span>
                <span>GDPR</span>
            </footer>
        </main>
    )
}

export default App
