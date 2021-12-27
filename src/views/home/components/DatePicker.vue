<template>
  <div class="container">
    <!-- <div class="back">
      <img class="imgBtn" :src="arrow" />
    </div>
    <div class="back">
      <img class="imgBtn" :src="arrowThin" />
    </div> -->
    <div class="date">

    </div>
    <!-- <div class="go">
      <img class="imgBtn" :src="arrowThin" />
    </div>
    <div class="go">
      <img class="imgBtn" :src="arrow" />
    </div> -->
  </div>
  <div class="datePanelContainer">
    <DatePanel/>
  </div>
</template>

<script>
// import SVGInject from '@iconfu/svg-inject'
import { onMounted } from 'vue'
import { arrow, arrowThin } from '@/assets/icons/icons.js'
import DatePanel from '@/components/DatePanel/DatePanel'

export default {
  components: {
    DatePanel,
  },
  setup() {
    // onMounted(() => {
    //   SVGInject(document.getElementsByTagName('img'));
    // })
    return {
      arrow,
      arrowThin,
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 24px;
  width: 96px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-items: center;
  .back{
    // position: relative;
    height: 24px;
    width: 24px;
    transform: rotate(180deg);
  }
  .go{
    // position: relative;
    height: 24px;
    width: 24px;
  }
  .date {
    position: relative;
    height: 24px;
    width: 100px;
    // background: chartreuse;
  }
}
.datePanelContainer {
  position: absolute;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
}

.imgBtn {
  height: 100%;
  width: 100%;
  &:hover{
    cursor: pointer;
    color: rgb(43, 130, 255);;
  }
}
</style>
