import React, { useContext } from 'react'
import { AuthContext } from '../../providers/AuthProvider'

import { DatePicker } from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import FormControl from '@material-ui/core/FormControl'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Tooltip from '@material-ui/core/Tooltip'




const useStyles = makeStyles((theme) => ({
  header: {
    position: 'relative',
    height: '200px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    minWidth: '100%',
    margin: 'auto 0',
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.defaultWhite,
  },
  datepicker: {
    display: 'flex',
    marginTop: '10px',
  },
  resize: {
    fontSize: '25px',
    color: theme.palette.defaultWhite,
  },
  select: {
    color: theme.palette.defaultWhite,
    '&:before': {
      borderColor: theme.palette.defaultWhite,
    },
  },
  filters: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10px auto',
    flex: 1,
    justifyContent: 'space-around',
  },
  viewIconContainer: {
    display: 'flex',
  },
  viewIcon: {
    marginRight: '10px',
    cursor: 'pointer',
    color: theme.palette.defaultWhite,
    border: `1px solid ${theme.palette.defaultWhite}`,
    borderRadius: 0,
  },
  fab: {
    position: 'absolute',
    bottom: '-28px',
    right: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: '65px',
      height: '65px',
      bottom: '-32.5px',
      right: theme.spacing(7),
    },
    [theme.breakpoints.up('lg')]: {
      width: '65px',
      height: '65px',
      bottom: '-32.5px',
      right: theme.spacing(37.5),
    },
  },
  tooltip: {
    backgroundColor: theme.palette.primary.main,
  },
}))

const Calendar = (props) => {
  const classes = useStyles(props)
  let { state } = useContext(AuthContext)


  const viewNamesObj = {
    month: {
      title: 'Month',
      icon: 'view_module',
    },
    week: {
      title: 'Week',
      icon: 'view_week',
    },
    day: {
      title: 'Day',
      icon: 'view_day',
    },
  }

  const renderViewIcons = (viewNamesObj) => {
    return Object.keys(viewNamesObj).map((name) => (
      <Tooltip
        classes={{ tooltip: classes.tooltip }}
        title={viewNamesObj[name].title}
        key={name}
      >
        <div>
          <IconButton
            className={classes.viewIcon}
            aria-label={name}
            onClick={() => props.setView(name)}
            disabled={props.view === name}
          >
            <Icon>{viewNamesObj[name].icon}</Icon>
          </IconButton>
        </div>
      </Tooltip>
    ))
  }

  return (
    <Container className={classes.header}>
      <div className={classes.datepicker}>
        <Icon style={{ cursor: 'pointer' }} fontSize="large" onClick={props.showPrev}>
          arrow_back
        </Icon>
        <DatePicker
          variant="inline"
          openTo="year"
          views={['year', 'month']}
          value={props.perspectivePoint}
          onChange={props.changePerspectivePoint}
          autoOk={true}
          InputProps={{
            disableUnderline: true,
            classes: {
              input: classes.resize,
            },
          }}
          inputProps={{ style: { textAlign: 'center' } }}
        />
        <Icon style={{ cursor: 'pointer' }} fontSize="large" onClick={props.showNext}>
          arrow_forward
        </Icon>
      </div>
      <div className={classes.filters}>
        <div className={classes.viewIconContainer}>
          {renderViewIcons(viewNamesObj)}
        </div>

        {state.user.role === 'manager' && (
          <FormControl>
            {' '}
            <Select
              className={classes.select}
              id="entryFilter"
              value={props.showEntries}
              onChange={(e) => props.setShowEntries(e.target.value)}
              inputProps={{
                classes: {
                  icon: classes.select,
                },
              }}
            >
              <MenuItem value={'own'}>My entries</MenuItem>
              <MenuItem value={'all'}>All entries</MenuItem>
            </Select>
          </FormControl>
        )}
      </div>
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="add"
        onClick={() => props.setDialog(true)}
      >
        <AddIcon />
      </Fab>
    </Container>
  )
}

export default Calendar
