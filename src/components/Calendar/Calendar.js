import React, { useState, useEffect, useContext, Fragment } from 'react'
import { AuthContext } from '../../providers/AuthProvider'

import axios from 'axios'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress'

import CalendarHeader from './CalendarHeader'
import NewEntry from './NewEntry'
import MonthlyView from './MonthlyView'
import DailyAndWeeklyView from './DailyAndWeeklyView'

const useStyles = makeStyles((theme) => ({
  calendar: {
    width: '100%',
    margin: 0,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(9),

    }
  },
}))

const Calendar = (props) => {
  const classes = useStyles(props)
  const [perspectivePoint, setPerspectivePoint] = useState(moment())

  const [dialog, setDialog] = useState(false)
  const [loading, setLoading] = useState(true)
  const [ownEntries, setOwnEntries] = useState([])
  const [teamEntries, setTeamEntries] = useState(null)
  const [editItem, setEditItem] = useState(null)
  const [view, setView] = useState('month')

  const [showEntries, setShowEntries] = useState('own')
  let { state } = useContext(AuthContext)

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/entries`)
      .then((result) => {
        setOwnEntries(result.data.ownEntries)
        if (state.user.role === 'manager') {
          setTeamEntries(result.data.teamEntries)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [state.user.role])

  const addEntry = (newEntry) => {
    setOwnEntries((prevState) => [...prevState, newEntry])
  }

  const findEntry = (entryId) => {
    ownEntries.forEach((entry) => {
      if (entryId === entry._id) {

        setEditItem(entry)
        setDialog(true)
      }
    })
  }

  const editEntry = (entry) => {
    const modifiedEntries = ownEntries.map((oldEntry) => {
      if (oldEntry._id === entry._id) {
        return { ...oldEntry, ...entry }
      } else {
        return oldEntry
      }
    })
    setOwnEntries(modifiedEntries)
  }

  const deleteEntry = (deletedEntry) => {
    const filteredEntries = ownEntries.filter((entry) => {
      return entry._id !== deletedEntry
    })

    setOwnEntries(filteredEntries)
  }

  const closeDialog = () => {
    setEditItem(null)
    setDialog(false)
  }

  const showPrev = () => {
    const newPerspective = perspectivePoint.clone().subtract(1, view)
    setPerspectivePoint(newPerspective)
  }

  const showNext = () => {
    const newPerspective = perspectivePoint.clone().add(1, view)
    setPerspectivePoint(newPerspective)
  }

  return (
    <div>
      {loading ? (
        <LinearProgress />
      ) : (
        <Fragment>
          <CalendarHeader
            showPrev={showPrev}
            showNext={showNext}
            changePerspectivePoint={(newPerspective) =>
              setPerspectivePoint(newPerspective)
            }
            perspectivePoint={perspectivePoint}
            view={view}
            setView={(newView) => setView(newView)}
            showEntries={showEntries}
            setShowEntries={(newFilter) => setShowEntries(newFilter)}
            setDialog={(newState) => setDialog(newState)}
          />
          <Container maxWidth="xl" className={classes.calendar}>
            {view === 'month' ? (
              <MonthlyView
                perspectivePoint={perspectivePoint}
                setPerspectivePoint={(newPoint) =>
                  setPerspectivePoint(newPoint)
                }
                findEntry={findEntry}
                ownEntries={ownEntries}
                teamEntries={teamEntries}
                showEntries={showEntries}
              />
            ) : (
              <DailyAndWeeklyView
                perspectivePoint={perspectivePoint}
                setPerspectivePoint={(newPoint) =>
                  setPerspectivePoint(newPoint)
                }
                findEntry={findEntry}
                ownEntries={ownEntries}
                teamEntries={teamEntries}
                showEntries={showEntries}
                view={view}
              />
            )}
          </Container>

          <NewEntry
            open={dialog}
            close={closeDialog}
            entries={ownEntries}
            addEntry={addEntry}
            editItem={editItem}
            editEntry={editEntry}
            userId={state.user._id}
            deleteEntry={deleteEntry}
          />
        </Fragment>
      )}
    </div>
  )
}

export default Calendar
