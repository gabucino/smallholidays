import React, {  Fragment } from 'react'
import clsx from 'clsx'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'

import EditIcon from '@material-ui/icons/Edit'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  hasOwnEntry: {
    width: '100%',
    borderRadius: '5px',
    color: '#4F4846',
    display: 'flex',
    justifyContent: 'center',
  },
  mobileEntries: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  mediumScreen: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  holiday: {
    backgroundColor: theme.palette.primary.main,
  },
  homeOffice: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.defaultWhite,
  },
}))

const EntryLabel = ({ entry, isToday, findEntry, day, numberOfEntries }) => {
  const classes = useStyles()

  return (
    <Fragment>
      <div
        key={entry._id}
        width="100%"
        className={
          entry.requestType === 'holiday'
            ? clsx(classes.hasOwnEntry, classes.holiday)
            : clsx(classes.hasOwnEntry, classes.homeOffice)
        }
      >
        {' '}
        <div className={classes.mediumScreen}>
          <Typography variant="body1">
            {`${entry.name ? `${entry.name}'s` : 'Your'} ${entry.requestType}`}
          </Typography>
          {(isToday || day.isAfter(moment(), 'day')) && !entry.name && (
            <EditIcon onClick={() => findEntry(entry._id)} />
          )}
        </div>
        <Typography
          className={classes.mobileEntries}
          variant="body1"
        >
          {numberOfEntries}
        </Typography>
      </div>
    </Fragment>
  )
}

export default EntryLabel
