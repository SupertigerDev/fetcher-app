import { createContext, ReactNode, useContext, useEffect, useId, useInsertionEffect, useRef, useState } from "react";


type Theme = "dark" | "light"
const ThemeContext = createContext({
  theme: "dark" as Theme,
  toggleTheme: () => { },
  onThemeChanged: (cb: (theme: Theme) => void) => { }
});

export const useTheme = () => {
  return useContext(ThemeContext);
}


export const ThemeProvider = (props: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(localStorage.getItem('theme') as Theme || "dark");
  const onThemeChangedFns = useRef<Record<string, (theme: Theme) => void>>({});

  useEffect(() => {
    applyThemeFromStorage()
  }, [])

  const toggleTheme = () => {
    animateTheme();

    const darkThemeApplied = document.body.classList.toggle('dark');

    const newTheme = darkThemeApplied ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme);
    applyThemeFromStorage();
    Object.values(onThemeChangedFns.current).forEach((cb) => {
      cb(theme);
    })
  }

  const onThemeChanged = (callback: (theme: Theme) => void) => {
    const id = useId();

    useEffect(() => {
      onThemeChangedFns.current[id] = callback;
      return () => {
        delete onThemeChangedFns.current[id];
      }
    }, [])
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, onThemeChanged }}>
      {props.children}
    </ThemeContext.Provider>
  )
}


function animateTheme() {
  const styleEl = document.createElement("style");
  styleEl.innerHTML = `
  * {
    transition: 0.2s;
  }
  `;
  document.head.appendChild(styleEl);
  setTimeout(() => {
    document.head.removeChild(styleEl);
  }, 200);
}

export function applyThemeFromStorage() {
  document.body.classList.remove('dark');
  document.body.classList.remove('light');
  const currentTheme = localStorage.getItem('theme') || "dark";
  document.body.classList.add(currentTheme);
}