import { createMuiTheme } from '@material-ui/core'
import { red } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#a3c0aa',
      dark: '#1d4431',
    },
    secondary: {
      main: '#ea4033',
      dark: '#671612',
    },
    background: {
      default: '#e3ece5',
    },
    error: red,
    defaultWhite: '#FFF'
  },
  typography: {
    h3: {
        fontFamily: 
      'Mountains of Christmas'
    }, 
    body2: {
      fontWeight: 700
    }
  },
})

export default theme
