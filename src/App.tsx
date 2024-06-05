import { RouterProvider } from "react-router-dom";
import { ThemeContext, ThemeProvider } from "styled-components";
import themes from "assets/styles/theme";
import GlobalStyles from "assets/styles/GlobalStyles";
import { router } from "router";
import { useDisplayStore } from "stores/display.store";

export default function App() {
  const { setTheme, getTheme } = useDisplayStore();
  const themeChange = () => {
    getTheme() === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: getTheme(),
        setCurrentTheme: themeChange,
      }}
    >
      <ThemeProvider theme={themes[getTheme()]}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
