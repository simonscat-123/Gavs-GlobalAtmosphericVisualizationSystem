<template>
  <div class="container">
    <div class="zoomOut" @click="zoomClick(0)" >
      <img class="zoomOutImg" :src="plus" title="放大"/>
    </div>
    <div class="zoomLevel" @click="zoomClick(1)" title="还原层级">{{mapLevel}}</div>
    <div class="zoomIn" @click="zoomClick(2)" >
      <img class="zoomInImg" :src="minus" title="缩小"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { onMounted } from 'vue'
import SVGInject from '@iconfu/svg-inject'
import { plus, minus } from '@/assets/icons/icons.js'

export default defineComponent({
  props: {
    mapLevel: Number,
  },
  setup(props, { emit }) {
    // 在onMounTed时转换，相当于在img载入完成直接进行转换，
    // 消弱nextTick时转换的闪烁现象。但还是存在
    onMounted(() => {
      SVGInject(document.getElementsByTagName('img'));
    })
    const zoomClick = (index) => {
      emit('zoomClick', index)
    }
    return {
      plus,
      minus,
      zoomClick,
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 26px;
  height: 80px;
  order: 2;
  z-index: 9997;
  margin-top: 10px;
  .zoomOut {
    position: relative;
    width: 26px;
    height: 26px;
    background-color: #FFF;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    cursor: pointer;
    .zoomOutImg {
      width: 100%;
      height: 100%;
      z-index: 9999;
      color: rgb(153, 153, 153);
      &:hover {
        color: rgb(43, 130, 255);
      }
    }
  }
  .zoomLevel {
    position: relative;
    width: 26px;
    height: 26px;
    background-color: #FFF;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-top: 1px;
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    text-align: center;
    line-height: 26px;
    color:grey;
    user-select: none;
    cursor: pointer;
    &:hover {
      color: rgb(43, 130, 255);
    }
  }
  .zoomIn {
    position: relative;
    width: 26px;
    height: 26px;
    background-color: #FFF;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-top: 1px;
    cursor: pointer;
    .zoomInImg {
      width: 100%;
      height: 100%;
      z-index: 9999;
      color: rgb(153, 153, 153);
      &:hover {
        color: rgb(43, 130, 255);
      }
    }
  }
}
</style>
