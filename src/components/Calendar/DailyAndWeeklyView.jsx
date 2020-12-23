import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Fragment } from 'react'

import { renderHours, findTodaysEntries } from './build'
import EntryLabel from './EntryLabel'

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    width: '100%',
    padding: 0,
    backgroundColor: theme.palette.defaultWhite,
  },
  headerCell: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    textAlign: 'center',
    paddingTop: '30px',
    width: '14.28%',
  },
  header: {
    paddingLeft: '78px',
    boxSizing: 'border-box',
  },

  column: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 0,
  },
  hourField: {
    border: '1px solid #ededed',
    width: '100%',
    height: '48px',
    borderCollapse: 'collapse',
  },
  hourList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '78px',
    boxSizing: 'border-box',
  },
  hour: {
    margin: 'auto 15px',
  },
}))

const DailyAndWeeklyView = (props) => {
  const classes = useStyles(props)

  const [calendar, setCalendar] = useState([])

  useEffect(() => {
    const { perspectivePoint, view } = props
    const calendarArr = []
    if (view === 'week') {
      const startDate = perspectivePoint.clone().startOf('isoweek')
      const endDate = perspectivePoint.clone().endOf('isoweek')
      const day = startDate.clone().subtract(1, 'day')

      while (day.isBefore(endDate, 'day')) {
        calendarArr.push(day.add(1, 'day').clone())
      }
    } else {
      calendarArr.push(perspectivePoint)
    }

    setCalendar(calendarArr)
  }, [props, props.perspectivePoint])

  return (
    <Fragment>
      <div className={clsx(classes.row, classes.header)}>
        {calendar.map((day, idx) => {
          let todaysEntries = findTodaysEntries(
            day,
            props.ownEntries,
            props.teamEntries
          )

          const isToday = moment().isSame(day, 'day')

          return (
            <Paper square={true} key={day} className={classes.headerCell}>
              <div>
                <Typography variant="body1">
                  {' '}
                  {moment(calendar[idx]).format('dd')}
                </Typography>
                <Typography variant="body2">
                  {moment(calendar[idx]).format('Do')}
                </Typography>
              </div>
              <div>
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
              </div>
            </Paper>
          )
        })}
      </div>

      <Container maxWidth="xl" className={classes.row}>
        <div className={classes.hourList}>
          {renderHours().map((hour) => (
            <p key={hour} className={classes.hour}>
              {hour}
            </p>
          ))}
        </div>
        {calendar.map((day, i) => {
          return (
            <div key={day} className={classes.column}>
              {renderHours().map((hour) => (
                <div key={hour} className={classes.hourField}></div>
              ))}
            </div>
          )
        })}
      </Container>
    </Fragment>
  )
}

export default DailyAndWeeklyView
