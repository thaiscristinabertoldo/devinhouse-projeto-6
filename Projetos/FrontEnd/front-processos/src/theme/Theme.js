import { createTheme } from '@material-ui/core'

export const getTheme = darkMode =>
  createTheme({
    ...(darkMode ? darkTheme : lightTheme)
  })

const darkTheme = createTheme({
  palette: {
    type: 'dark'
  }
})

const lightTheme = createTheme({
  palette: {
    type: 'light'
  }
})
