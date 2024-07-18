import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#EC4351',
    },
    secondary: {
      main: '#43484E',
    },
  },
  typography: {
    fontFamily: ['Open Sans'],
  },
})

export default theme
