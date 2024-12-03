import { createContext, useEffect, useState } from "react";

interface Props {
    darkMode: boolean

    toggle: () => void
}

const initialValues: Props = {
    darkMode: false,
    toggle: () => { }
}

const ThemeContext = createContext(initialValues);

function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false)
    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            setDarkMode(true);
            document.body.classList.add("dark");
        }
    }, []);

    const toggle = () => {
        const currentTheme = !darkMode ? "dark" : "light";
        localStorage.setItem("theme", currentTheme);
        setDarkMode((prev) => !prev);
        document.body.classList.toggle("dark", !darkMode);
    }
    return <ThemeContext.Provider value={{
        darkMode, toggle
    }}>{children}</ThemeContext.Provider>
}

export { ThemeContext, ThemeProvider }