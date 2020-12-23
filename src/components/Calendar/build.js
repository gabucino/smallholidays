export const renderHours = () => {
  const hours = []
  let hour = 1
  while (hour <= 24) {
    let timeOfDay = hour <= 12 ? ' AM' : ' PM'
    hours.push(`${hour <= 12 ? hour : hour - 12}${timeOfDay}`)
    hour = hour + 1
  }

  return hours
}

export const findTodaysEntries = (day, ownEntries, teamEntries = null) => {
  let todaysEntries = []

  for (let entry of ownEntries) {
    if (
      (day.day() !== 0 &&
        day.day() !== 6 &&
        day.isBetween(entry.startDate, entry.endDate)) ||
      day.isSame(entry.startDate, 'day') ||
      day.isSame(entry.endDate, 'day')
    ) {
      todaysEntries.push({ ...entry })
    }
  }

  if (!teamEntries) return todaysEntries

  teamEntries.forEach((member) => {
    if (!member.entries) return
    member.entries.forEach((entry) => {
      if (
        (day.day() !== 0 &&
          day.day() !== 6 &&
          day.isBetween(entry.startDate, entry.endDate)) ||
        day.isSame(entry.startDate, 'day') ||
        day.isSame(entry.endDate, 'day')
      ) {
        todaysEntries.push({
          memberId: member._id,
          name: member.name,
          ...entry,
        })
      }
    })
  })

  return todaysEntries
}


// <Typography
// className={
//   hasOwnEntry === 'holiday'
//     ? classes.holiday
//     : classes.homeOffice
// }
// component="div"
// >
// {`Your ${hasOwnEntry}`}
// </Typography>