import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import AuthProvider from './providers/AuthProvider'



import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment'


ReactDOM.render(

<MuiPickersUtilsProvider utils={MomentUtils}>
      <AuthProvider>
      <App />
      </AuthProvider>
    </MuiPickersUtilsProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
