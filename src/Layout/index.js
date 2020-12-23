import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    width: '100%',
    height: '100%',
    display: 'flex',
    padding: '10px 15px',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.palette.primary.dark,
    color: theme.palette.defaultWhite 
  },
  toolbarButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}))

export default function ButtonAppBar() {
  const classes = useStyles()
  let { state, dispatch } = useContext(AuthContext)

  const signOut = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'logout' })
  }

  const makeManager = () => {
    axios
      .patch(`http://localhost:8080/api/makemanager`)
      .then((result) => {
        dispatch({ type: 'updateRole', payload: 'manager' })
      })
      .catch((err) => {
        console.err(err)
      })
  }

  return (
    <AppBar position="static" style={{ height: '100px' , width: '100%', display: 'flex', alignItems: 'center'}}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h3">SmallCalendar</Typography>
        {/* {user && <Button color="inherit" startIcon={<TodayIcon />}>
            Calendar
          
          </Button>} */}
        <div className={classes.toolbarButtons}>
          <Box textAlign="center" fontStyle="italic" m={1}>
            Welcome {state.user.firstName}
          </Box>
          <Link color="inherit" onClick={signOut}>
            Sign Out{' '}
          </Link>
          {state.user.role !== 'manager' && (
            <Link color="inherit" onClick={makeManager}>
              I'm manager
            </Link>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}
