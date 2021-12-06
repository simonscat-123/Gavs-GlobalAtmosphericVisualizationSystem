<template>
  <div class="container">
    <div class="background"></div>
    <div class="leftNiddle" @click="naviClick(0)" title="逆时针旋转"></div>
    <div class="middleNiddle"
      @click="naviClick(1)"
      :style="{ 'transform' : `rotate(${mapBearing}deg)`}"
      title="还原视角"></div>
    <div class="rightNiddle" @click="naviClick(2)" title="逆时针旋转"></div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { ref } from 'vue'

export default defineComponent({
  props: {
    mapBearing: Number,
  },
  setup(props, { emit }) {
    const naviClick = (index) => {
      emit('naviClick', index)
    }
    return {
      naviClick,
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  z-index: 9996;
  background-size: 50%; //将X2原图拉伸至原来的50%，可以使图像更清晰
  order: 1;
}
.background {
  position: absolute;
  width: 54px;
  height: 54px;
  top: 0px;
  left: 0px;
  z-index: 997;
  background-image: url('~@/assets/images/navi_control.png');
  background-repeat: no-repeat;
  background-position: 1px 1px;
  background-size: 266px;
}
.leftNiddle {
  position: absolute;
  width: 15px;
  height: 42px;
  left: 2px;
  top: 5px;
  z-index: 999;
  background-image: url('~@/assets/images/navi_control.png');
  background-repeat: no-repeat;
  background-position: -75px -5px;
  background-size: 266px;
  cursor: pointer;
  &:hover{
    background-position: -89px -5px;
  }
}
.rightNiddle {
  position: absolute;
  width: 15px;
  height: 42px;
  right: 3px;
  top: 5px;
  z-index: 999;
  background-image: url('~@/assets/images/navi_control.png');
  background-repeat: no-repeat;
  background-position: -75px -5px;
  background-size: 266px;
  cursor: pointer;
  transform: scaleX(-1);
  &:hover{
    background-position: -89px -5px;
  }
}
.middleNiddle {
  position: absolute;
  width: 14px;
  height: 44px;
  left: 19px;
  top: 4px;
  z-index: 998;
  background-image: url('~@/assets/images/navi_control.png');
  background-repeat: no-repeat;
  background-position: -56px -4px;
  background-size: 266px;
  cursor: pointer;
}
</style>
