import React, { createContext, useReducer } from 'react'

export const AuthContext = createContext({ user: null })

let initialState = {
  user: null,
}

let reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload }
    case 'logout':
      return { ...initialState }
    case 'updateRole':
      return { ...state, user: { ...state.user, role: action.payload } }
    default:
      return state
  }
}

const AuthProvider = (props) => {
  let [state, dispatch] = useReducer(reducer, initialState)
  let value = { state, dispatch }

  return (
    <AuthContext.Provider value={value}>
      {' '}
      {props.children}{' '}
    </AuthContext.Provider>
  )
}

export default AuthProvider
