<template>
  <div class="datePickerWrapper">
    <div class="pickerHeader">
      <svg class="leftBtn" @click="datePickerChange(0)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 92 92"><g fill="currentColor" class="nc-icon-wrapper"><path id="XMLID_512_" d="M82.8 48.8l-24.9 25c-.8.8-1.8 1.2-2.8 1.2-1 0-2-.4-2.8-1.2-1.6-1.6-1.6-4.1 0-5.7L70.4 50H12c-2.2 0-4-1.8-4-4s1.8-4 4-4h58.4L52.2 23.8c-1.6-1.6-1.6-4.1 0-5.7 1.6-1.6 4.1-1.6 5.7 0l24.9 25c1.6 1.6 1.6 4.2 0 5.7z"></path></g></svg>
      <span class="dayPickerHeaderCurrYear">{{showDate.dayPickerYear}} 年</span>
      <span class="dayPickerHeaderCurrMonth" v-show="pickerType === 0">{{showDate.dayPickerMonth}} 月</span>
      <svg class="rightBtn" @click="datePickerChange(1)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 92 92"><g fill="currentColor" class="nc-icon-wrapper"><path id="XMLID_512_" d="M82.8 48.8l-24.9 25c-.8.8-1.8 1.2-2.8 1.2-1 0-2-.4-2.8-1.2-1.6-1.6-1.6-4.1 0-5.7L70.4 50H12c-2.2 0-4-1.8-4-4s1.8-4 4-4h58.4L52.2 23.8c-1.6-1.6-1.6-4.1 0-5.7 1.6-1.6 4.1-1.6 5.7 0l24.9 25c1.6 1.6 1.6 4.2 0 5.7z"></path></g></svg>
    </div>
    <!-- 日picker -->
    <div class="dayPicker" v-show="pickerType === 0">
      <table class="dayTabel">
        <thead>
          <tr>
            <th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th>
          </tr>
        </thead>
        <tbody>
          <tr class="dayTableRow" v-for="item in dayPickerArray" :key="item">
            <td class="dayAvaliable"
              :class="{
                dayNotAvaliable: !day.available,
                dayAvaliableShow: day.show}"
              v-for="day in item" :key="day"
              @click="dayPickerDateClick(day)">
                <span> {{day.showDay}} </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 月份picker -->
    <div class="monthPicker" v-show="pickerType === 1">
      <table class="monthTable">
        <tbody>
          <tr class="monthTableRow" v-for="item in monthPickerArray" :key="item">
            <td class="monthAvaliable" v-for="month in item" :key="month">
              <span>{{month}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 年份picker -->
    <div class="yearPicker" v-show="pickerType === 2">
      <table class="yearTable">
        <tbody>
          <tr class="yearTableRow" v-for="item in yearPickerArray" :key="item">
            <td class="yearAvaliable" v-for="year in item" :key="year">
              <span>{{year}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { updateDayArray, updateNowShowDate, updateShowDateObj, updateYearArray } from './DatePanelControl'

export default {
  setup() {
    // 当前展示的日期 showDate
    const showDate = ref({
      showDay: 0,
      month: 0,
      year: 0,
      dayPickerMonth: 0,
      dayPickerYear: 0,
    })

    const nowDate = new Date()
    // 更新 showDate
    updateShowDateObj(showDate.value, {
      showDay: nowDate.getDate(),
      month: nowDate.getMonth(),
      year: nowDate.getFullYear(),
      dayPickerMonth: nowDate.getMonth(),
      dayPickerYear: nowDate.getFullYear(),
    })

    // 初始化年、月、日期表
    const dayPickerArray = ref(updateDayArray(showDate.value.year, showDate.value.month))
    const monthPickerArray = [['一月', '二月', '三月', '四月'], ['五月', '六月', '七月', '八月'], ['九月', '十月', '十一月', '十二月']]
    const yearPickerArray = ref(updateYearArray(showDate.value.year))
    // 更新日期表的当前日期
    updateNowShowDate(dayPickerArray.value, showDate.value)

    // 点击左右箭头
    const datePickerChange = (handle) => {
      let newMonth = 0
      let newYear = 0
      if (handle === 0) { // leftBtn clicked
        if (showDate.value.dayPickerMonth === 1) {
          newMonth = 12
          newYear = showDate.value.dayPickerYear - 1
        } else {
          newMonth = showDate.value.dayPickerMonth - 1
          newYear = showDate.value.dayPickerYear
        }
      } else if (handle === 1) { // rightBtn clicked
        if (showDate.value.dayPickerMonth === 12) {
          newMonth = 1
          newYear = showDate.value.dayPickerYear + 1
        } else {
          newMonth = showDate.value.dayPickerMonth + 1
          newYear = showDate.value.dayPickerYear
        }
      }
      showDate.value.dayPickerMonth = newMonth
      showDate.value.dayPickerYear = newYear
      dayPickerArray.value = updateDayArray(newYear, newMonth)
      updateNowShowDate(dayPickerArray.value, showDate.value)
    }
    // 点击具体日期
    const dayPickerDateClick = (day) => {
      updateShowDateObj(showDate.value, {
        showDay: day.showDay,
        month: day.month,
        year: day.year,
      })
      updateNowShowDate(dayPickerArray.value, showDate.value)
    }
    // 变换日期选择板 0 day 1 month 2 year
    const pickerType = ref(0)
    const switchPicker = (type) => {
      pickerType.value = type
    }
    switchPicker(2)
    return {
      showDate,
      dayPickerArray,
      datePickerChange,
      dayPickerDateClick,
      monthPickerArray,
      yearPickerArray,
      pickerType,
      switchPicker,
    }
  },
}
</script>

<style lang="scss" scoped>
.datePickerWrapper {
  width: 240px;
  font-size: 16px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  background: #fff;
  color: #606266;
  user-select: none;
}
.dayPicker, .monthPicker, .yearPicker{
  height: 100%;
  width: 100%;
}
.pickerHeader {
  padding: 0 20px;
  height: 36px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  span, svg {
    cursor: pointer;
    &:hover {
      color: rgb(43, 130, 255);
    }
  }
  .leftBtn {
    transform: rotate(180deg);
  }
}
.dayTabel {
  position: relative;
  width: 100%;
  border-collapse: collapse;
  th {
    height: 40px;
    font-size: 12px;
    line-height: 40px;
    text-align: center;
  }
  td {
    position: relative;
    height: 30px;
    border: 1px solid #f0f0f0;
    width: 14%;
    text-align: center;
    cursor: pointer;
    & span {
      position: relative;
      display: block;
      margin: 0;
      padding: 0;
      height: 24px;
      width: 24px;
      line-height: 24px;
      border-radius: 50%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}

.dayAvaliable, .monthAvaliable, .yearAvaliable{
  font-size: 10px;
  &:hover {
    color: rgb(43, 130, 255);
  }
}
.dayNotAvaliable {
  color: #c0c4cc;
  &:hover {
    color: #c0c4cc;
  }
}

.dayAvaliableShow {
  color: #fff;
  &:hover {
    color: #fff;
  }
  & span {
    background-color: rgb(43, 130, 255);
  }
}

.monthTable {
  position: relative;
  width: 100%;
  border-collapse: collapse;
  td {
    position: relative;
    height: 30px;
    border: 1px solid #f0f0f0;
    width: 25%;
    text-align: center;
    cursor: pointer;
    & span {
      position: relative;
      display: block;
      margin: 0;
      padding: 0;
      // height: 24px;
      // width: 24px;
      line-height: 24px;
      border-radius: 50%;
      // left: 50%;
      // transform: translateX(-50%);
    }
  }
}
.yearTable {
  position: relative;
  width: 100%;
  border-collapse: collapse;
  td {
    position: relative;
    height: 30px;
    border: 1px solid #f0f0f0;
    width: 25%;
    text-align: center;
    cursor: pointer;
    & span {
      position: relative;
      display: block;
      margin: 0;
      padding: 0;
      // height: 24px;
      // width: 24px;
      line-height: 24px;
      border-radius: 50%;
      // left: 50%;
      // transform: translateX(-50%);
    }
  }
}
</style>
