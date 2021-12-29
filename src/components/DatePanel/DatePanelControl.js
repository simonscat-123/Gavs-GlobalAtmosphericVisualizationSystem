const updateDayArray = (year, month) => {
  const pDayPickerArray = [[], [], [], [], [], []] // 6行7列的表
  const firstDay = new Date(year, month - 1, 1) // 这个月第一天
  const firstDayWeekDay = firstDay.getDay()
  const lastDay = new Date(year, month, 0) // 这个月的最后一天
  // const lastDayWeekDay = lastDay.getDay()
  const lastDayWeekDate = lastDay.getDate() // 这个月的长度

  const preMonthLastDay = new Date(year, month - 1, 0).getDate()

  for (let i = 0, thisMonthDay = 1; i < 42; i++) {
    const dayObj = {
      available: true,
      showDay: 0,
      month: 0,
      year: 0,
      show: false,
    }
    if (i < firstDayWeekDay) {
      dayObj.available = false
      dayObj.showDay = preMonthLastDay - firstDayWeekDay + i + 1
      if (month === 1) {
        dayObj.month = 12
        dayObj.year = year - 1
      } else {
        dayObj.month = month - 1
        dayObj.year = year
      }
    } else if (i < lastDayWeekDate + firstDayWeekDay) {
      dayObj.available = true
      dayObj.showDay = thisMonthDay
      dayObj.month = month
      dayObj.year = year
      thisMonthDay++
    } else {
      dayObj.available = false
      dayObj.showDay = i - lastDayWeekDate - firstDayWeekDay + 1
      if (month === 12) {
        dayObj.month = 1
        dayObj.year = year + 1
      } else {
        dayObj.month = month + 1
        dayObj.year = year
      }
    }
    const row = Math.floor(i / 7)
    pDayPickerArray[row].push(dayObj)
  }
  return pDayPickerArray
}

const convertWeekday = (weekday) => {
  let str = ''
  switch (weekday) {
    case 0: str = '日'
      break
    case 1: str = '一'
      break
    case 2: str = '二'
      break
    case 3: str = '三'
      break
    case 4: str = '四'
      break
    case 5: str = '五'
      break
    case 6: str = '六'
      break
    default: break
  }
  return str
}

const updateShowDateObj = (showDate, newDate) => {
  Object.keys(newDate).forEach((prop) => {
    showDate[prop] = newDate[prop]
  });
  // 不用return
}

const updateNowShowDate = (showDate, nowShowDate) => {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      // if (showDate.value[row][col])
      if (showDate[row][col].year === nowShowDate.year
        && showDate[row][col].month === nowShowDate.month
        && showDate[row][col].showDay === nowShowDate.showDay) {
        showDate[row][col].show = true
      } else if (showDate[row][col].show === true) {
        showDate[row][col].show = false
      }
    }
  }
}

const updateYearArray = (year) => {
  const pYearPickerArray = []
  const minYear = Math.floor(year / 10) * 10
  pYearPickerArray.push([minYear, minYear + 1, minYear + 2, minYear + 3, minYear + 4])
  pYearPickerArray.push([minYear + 5, minYear + 6, minYear + 7, minYear + 8, minYear + 9])
  return pYearPickerArray
}

export {
  updateDayArray,
  convertWeekday,
  updateShowDateObj,
  updateNowShowDate,
  updateYearArray,
}
