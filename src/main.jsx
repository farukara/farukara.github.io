import ReactDOM from "react-dom/client"
import { StrictMode } from "react"
import { HashRouter as Router } from "react-router-dom"
import "./index.css"

import App from "./App.jsx"

import ThemeProvider from "./hooks/ThemeCtx"
import SmallScreenMenuProvider from "./hooks/SmallScreenMenuCtx"

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Router>
            <ThemeProvider>
                <SmallScreenMenuProvider>
                    <App />
                </SmallScreenMenuProvider>
            </ThemeProvider>
        </Router>
    </StrictMode>
)
