<template>
  <div class="datePickerWrapper">
    <!-- 日picker -->
    <div class="dayPicker">

      <div class="pickerHeader dayPickerHeader">
        <svg class="leftBtn" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 92 92"><g fill="currentColor" class="nc-icon-wrapper"><path id="XMLID_512_" d="M82.8 48.8l-24.9 25c-.8.8-1.8 1.2-2.8 1.2-1 0-2-.4-2.8-1.2-1.6-1.6-1.6-4.1 0-5.7L70.4 50H12c-2.2 0-4-1.8-4-4s1.8-4 4-4h58.4L52.2 23.8c-1.6-1.6-1.6-4.1 0-5.7 1.6-1.6 4.1-1.6 5.7 0l24.9 25c1.6 1.6 1.6 4.2 0 5.7z"></path></g></svg>
        <span class="dayPickerHeaderCurrYear">{{showDate.year}} 年</span>
        <span class="dayPickerHeaderCurrMonth">{{showDate.month}} 月</span>
        <svg class="rightBtn" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 92 92"><g fill="currentColor" class="nc-icon-wrapper"><path id="XMLID_512_" d="M82.8 48.8l-24.9 25c-.8.8-1.8 1.2-2.8 1.2-1 0-2-.4-2.8-1.2-1.6-1.6-1.6-4.1 0-5.7L70.4 50H12c-2.2 0-4-1.8-4-4s1.8-4 4-4h58.4L52.2 23.8c-1.6-1.6-1.6-4.1 0-5.7 1.6-1.6 4.1-1.6 5.7 0l24.9 25c1.6 1.6 1.6 4.2 0 5.7z"></path></g></svg>
      </div>

      <table class="dayTabel">
        <thead>
          <tr>
            <th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th>
          </tr>
        </thead>
        <tbody>
          <tr class="dayTableRow" v-for="item in dayPickerArray" :key="item">
            <td class="dayAvaliable"
              :class="{dayNotAvaliable: !day.available}"
              v-for="day in item" :key="day">
                <span> {{day.showDay}} </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 月份picker -->
    <div class="monthPicker" v-show="false">
      <table>

      </table>
    </div>

    <!-- 年份picker -->
    <div class="yearPicker" v-show="false">
      <table>

      </table>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { updateDayArray, convertWeekday } from './DatePanelControl'

export default {
  setup() {
    const showDate = ref({
      year: 2021,
      month: 12,
      day: 26,
      weekday: '日',
    })

    const monthPickerArray = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    const yearPickerArray = []

    const nowDate = new Date()

    showDate.value.year = nowDate.getFullYear()
    showDate.value.month = nowDate.getMonth() + 1
    showDate.value.day = nowDate.getDate()
    showDate.value.weekday = convertWeekday(nowDate.getDay())

    const dayPickerArray = ref(updateDayArray(nowDate.getFullYear(), nowDate.getMonth() + 1))

    // console.log(dayPickerArray)
    return {
      showDate,
      dayPickerArray,
      monthPickerArray,
      yearPickerArray,
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
.dayPicker {
  height: 100%;
  width: 100%;
  .leftBtn {
    transform: rotate(180deg);
  }
}
.pickerHeader {
  padding: 0 20px;
  height: 36px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
}
.dayPickerHeader {
  span, svg {
    cursor: pointer;
    &:hover {
      color: rgb(43, 130, 255);
    }
  }
}
.dayTabel {
  width: 100%;
  border-collapse: collapse;
  th {
    height: 40px;
    font-size: 12px;
    line-height: 40px;
    text-align: center;
  }
  td {
    height: 30px;
    border: 1px solid #f0f0f0;
    width: 14%;
    text-align: center;
    cursor: pointer;
  }
}

.dayAvaliable {
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
</style>
