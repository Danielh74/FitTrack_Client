import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const useTheme = () => {
    const theme = useContext(ThemeContext);

    if (!theme) {
        throw new Error("useTheme must be used within an ThemeProvider")
    }
    return theme
};

export default useTheme