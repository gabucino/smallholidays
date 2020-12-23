import React, { useContext } from 'react'
import { AuthContext } from './providers/AuthProvider'
import axios from 'axios'
import GoogleLogin from 'react-google-login'

const GoogleAuth = (props) => {
  let { dispatch } = useContext(AuthContext)

  const responseGoogle = async (response) => {
    if (response.error) return console.log('error')
    await axios
      .post(`http://localhost:8080/api/auth/google`, {
        access_token: response.accessToken,
      })
      .then((result) => {
        localStorage.setItem('token', result.data.token)
        dispatch({ type: 'login', payload: result.data.user })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <GoogleLogin
      clientId="863198129152-1k226qe9jetbr644psi8oahfv4sv4isf.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default GoogleAuth
