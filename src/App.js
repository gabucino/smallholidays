import React, { Fragment, useContext, useEffect, useCallback } from 'react'
import { AuthContext } from './providers/AuthProvider'
import { ThemeProvider } from '@material-ui/core'
import axios from 'axios'
import Calendar from './components/Calendar/Calendar'
import Welcome from './components/Welcome'
import Layout from './Layout'
import theme from './theme'

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('token')

    if (token) {
      config.headers = { Authorization: `Bearer ${token}` }
    }

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

function App() {
  let { state, dispatch } = useContext(AuthContext)

  const stableDispatch = useCallback(dispatch, []) //assuming that it doesn't need to change

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      axios
        .get(`http://localhost:8080/api/autologin`)
        .then((result) => {
          stableDispatch({ type: 'login', payload: result.data.user })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [stableDispatch])

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        {state.user && <Layout />}
        {state.user ? <Calendar /> : <Welcome />}
      </ThemeProvider>
    </Fragment>
  )
}

export default App
