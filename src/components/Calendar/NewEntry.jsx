import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import { DatePicker } from '@material-ui/pickers'
import axios from 'axios'
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress'

const NewEntry = (props) => {
  const { editItem } = props
  const [requestType, setRequestType] = useState('')
  const [startDate, setStartDate] = useState(moment())
  const [endDate, setEndDate] = useState(startDate)
  const [formValid, setFormValid] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editItem) {
      setStartDate(moment(editItem.startDate))
      setEndDate(moment(editItem.endDate))
      setRequestType(editItem.requestType)
    }
  }, [editItem])

  useEffect(() => {
    if (requestType && !editItem) {
      setFormValid(true)
    } else if (editItem) {
      if (
        !moment(startDate).isSame(editItem.startDate, 'day') ||
        !moment(endDate).isSame(editItem.endDate, 'day') ||
        requestType !== editItem.requestType
      ) {
        setFormValid(true)
      } else {
        setFormValid(false)
      }
    }
  }, [editItem, startDate, endDate, requestType, setFormValid])

  useEffect(() => {
    if (startDate.day() === 0 || startDate.day() === 6) {
      const nextWeekDay = startDate.clone().endOf('isoweek').add(1, 'day')
      setStartDate(nextWeekDay)
    }
  }, [startDate])

  useEffect(() => {
    if (startDate > endDate) {
      setEndDate(startDate)
    }
  }, [startDate, endDate, setEndDate])

  function disableWeekends(date) {
    return date.day() === 0 || date.day() === 6
  }

  const deleteEntry = () => {
    axios
      .delete(
        `http://localhost:8080/api/entries/${props.userId}/${editItem._id}`
      )
      .then((result) => {
        props.deleteEntry(editItem._id)
        props.close()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSubmit = () => {
    setLoading(true)
    let entry = {
      requestType,
      startDate,
      endDate,
    }

    if (editItem) {
      entry = {
        ...entry,
        _id: editItem._id,
      }
    }

    const method = editItem ? 'patch' : 'post'

    axios({
      method: method,
      url: `http://localhost:8080/api/entry`,
      data: entry,
    })
      .then((result) => {
        if (!editItem) {
          props.addEntry(result.data.newRequest)
        } else {
          props.editEntry(entry)
        }
        setLoading(false)
        props.close()
      })
      .catch((err) => {
        setLoading(false)
      })
  }

  const closeDialog = () => {
    setStartDate(moment())
    setEndDate(startDate)
    setRequestType('')
    props.close()
  }

  return (
    <Dialog
      open={props.open}
      onClose={closeDialog}
      aria-labelledby="new-holiday-dialog"
      PaperProps={{
        style: {
          padding: '10px 20px',
        },
      }}
    >
      <DialogTitle>{`${
        editItem ? 'Edit' : 'Request'
      } Holiday/Home Office`}</DialogTitle>
      <InputLabel id="requestType">Type</InputLabel>
      <Select
        labelId="requestType"
        id="requestType"
        value={requestType}
        onChange={(e) => setRequestType(e.target.value)}
      >
        <MenuItem value={'holiday'}>Holiday</MenuItem>
        <MenuItem value={'homeoffice'}>Home Office</MenuItem>
      </Select>
      <DatePicker
        variant="inline"
        label="From"
        value={startDate}
        onChange={setStartDate}
        disabled={moment(startDate).isBefore(moment(), 'day')}
        autoOk={true}
        disablePast={
          moment(startDate).isBefore(moment(), 'day') ? null : moment()
        }
        shouldDisableDate={disableWeekends}
      />
      <DatePicker
        variant="inline"
        label="To"
        disablePast={true}
        value={endDate}
        onChange={setEndDate}
        autoOk={true}
        shouldDisableDate={disableWeekends}
        minDate={startDate}
      />
      <DialogActions>
        <Button
          autoFocus
          onClick={props.close}
          color="primary"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!formValid || loading}
          color="primary"
        >
          {!loading ? 'Submit' : <CircularProgress />}
        </Button>

        {editItem && (
          <Button disabled={loading} onClick={deleteEntry} variant="outlined">
            Delete entry
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default NewEntry
