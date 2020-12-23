import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import GoogleAuth from '../GoogleAuth'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  },
  title: {
    marginBottom: '40px'
  }
}))

const Welcome = () => {
  const classes = useStyles()
  return (
    <Container className={classes.container}>
      <Typography className={classes.title} variant="h3">Welcome to SmallHolidays</Typography>
      <GoogleAuth />
    </Container>
  )
}

export default Welcome
