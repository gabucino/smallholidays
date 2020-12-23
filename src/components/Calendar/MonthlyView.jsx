import React, { useState, useEffect, Fragment } from 'react'
import clsx from 'clsx'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { findTodaysEntries } from './build'
import EntryLabel from './EntryLabel'

const useStyles = makeStyles((theme) => ({
  monthHeader: {
    display: 'flex',
    width: '100%',
    padding: 0,
  },
  row: {
    display: 'flex',
    width: '100%',
  },
  week: {
    minHeight: '15vh',
    maxHeight: '20vh',
    padding: 0,
  },
  field: {
    width: '14.28%',
    textAlign: 'center',
  },
  pastDate: {
    color: '#bbbbbb',
  },
  today: {
    backgroundColor: '#ecf2ee',
  },
}))

const DAYS = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su']

const MonthlyView = (props) => {
  const classes = useStyles(props)

  const [calendar, setCalendar] = useState([])

  useEffect(() => {
    const startDate = props.perspectivePoint
      .clone()
      .startOf('month')
      .startOf('isoweek')
    const endDate = props.perspectivePoint
      .clone()
      .endOf('month')
      .endOf('isoweek')
    const day = startDate.clone().subtract(1, 'day')
    const calendarArr = []

    while (day.isBefore(endDate, 'day')) {
      calendarArr.push(
        Array(7)
          .fill('')
          .map(() => day.add(1, 'day').clone())
      )
    }
    setCalendar(calendarArr)
  }, [props.perspectivePoint])

  return (
    <Fragment>
      <Container maxWidth="xl" className={classes.monthHeader}>
        {DAYS.map((day) => (
          <Paper key={day} square={true} className={classes.field}>
            <Typography variant="body1" component="div">
              <Box fontWeight="fontWeightBold" m={1}>
                {day}
              </Box>
            </Typography>{' '}
          </Paper>
        ))}
      </Container>
      {calendar.map((week, i) => (
        <Container
          key={i}
          maxWidth="xl"
          className={clsx(classes.row, classes.week)}
        >
          {week.map((day) => {
            let todaysEntries = findTodaysEntries(
              day,
              props.ownEntries,
              props.teamEntries
            )

            const isToday = moment().isSame(day, 'day')
            const isPastDate = moment().isAfter(day, 'day')

            return (
              <Paper
                key={day.toString()}
                square={true}
                className={
                  isToday ? clsx(classes.field, classes.today) : classes.field
                }
              >
                <Typography
                  classes={isPastDate ? { root: classes.pastDate } : {}}
                  variant="body1"
                >
                  {day.format('D')}
                </Typography>
                {todaysEntries.map((entry) => {
                  return (
                    <EntryLabel
                      key={entry._id}
                      entry={entry}
                      findEntry={props.findEntry}
                      numberOfEntries={todaysEntries.length}
                      day={day}
                      isToday={isToday}
                    />
                  )
                })}
              </Paper>
            )
          })}
        </Container>
      ))}
    </Fragment>
  )
}

export default MonthlyView
