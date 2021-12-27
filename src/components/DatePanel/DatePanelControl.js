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
    }
    if (i < firstDayWeekDay) {
      dayObj.available = false
      dayObj.showDay = preMonthLastDay - firstDayWeekDay + i + 1
    } else if (i < lastDayWeekDate + firstDayWeekDay) {
      dayObj.available = true
      dayObj.showDay = thisMonthDay
      thisMonthDay++
    } else {
      dayObj.available = false
      dayObj.showDay = i - lastDayWeekDate - firstDayWeekDay + 1
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

const updateShowDateObj = () => {

}

export {
  updateDayArray,
  convertWeekday,
}
