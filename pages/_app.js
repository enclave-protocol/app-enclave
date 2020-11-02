import {useState} from "react"
import global from '../styles/global'
import ThemeContext from "../theme/provider"
import {Theme} from "../theme/theme"

function MyApp({ Component, pageProps }) {
  const [theme, useTheme] = useState(Theme.dark)

  const toggleTheme = () => {
    useTheme(theme === Theme.dark ? Theme.light : Theme.dark)
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <Component {...pageProps} />
      <style jsx global>
        {global}
      </style>
    </ThemeContext.Provider>
  )
}

export default MyApp
