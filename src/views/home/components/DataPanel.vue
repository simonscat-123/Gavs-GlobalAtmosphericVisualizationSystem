<template>
  <div :class="{
      dataPanelContainer: true,
      dataPanelContainerClick: isClick.dataPanel,
    }"
    :style="{
      'overflow': isClick.dataPanelDelay ? 'visible':'hidden'
      }"
    >
    <div :class="{
      dataPanelBkg: true,
      dataPanelBkgHover: isHover.dataPanel
      }" />
    <div :class="{
        dataPanel: true,
        dataPanelClick : isClick.dataPanel,
      }">
      <div class="dataPanelHeader"
        v-if="isClick.dataPanel"
        >
        <div class="dataPanelHeaderTitle">数据展板</div>
        <img
          class="closeBtn"
          :src="cross"
          @mouseup="clsBtnClick"/>
      </div>
      <div class="dataPanelContent"
        v-if="isClick.dataPanel">
        <div class="singleContent"
          v-for="(data) in listData"
          :key="data.title"
          :style="{
            'background-image': `url(${data.image})`,
          }"
          >
          <div class="singleContentTitle">{{data.title}}</div>
          <div class="singleContentDiscription"></div>
        </div>
      </div>

    </div>

    <div :class="{
        dataPanelMask: true,
        dataPanelMaskHover: isHover.dataPanel,
      }"
      v-if="!isClick.dataPanel"
      @mouseenter="dataPanelEnter"
      @mouseleave="dataPanelLeave"
      @mouseup="dataPanelClick"
    >数据展板</div>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue';
import SVGInject from '@iconfu/svg-inject';
import { cross } from '@/assets/icons/icons.js'
import imageAerosol from '@/assets/images/preview_aerosol@small.png'
import imageTemp from '@/assets/images/preview_Temp2@small.png'
import imageRain from '@/assets/images/preview_rain2@small.png'

export default ({
  setup() {
    nextTick(() => {
      SVGInject(document.getElementsByClassName('closeBtn'));
    })
    // 列表数据部分
    const listData = [
      { id: 1, title: '高精度气溶胶数据集', discription: '气溶胶的描述', image: imageAerosol, isHover: false, show: true },
      { id: 2, title: '全球地表温度数据集', discription: '气溶胶的描述', image: imageTemp, isHover: false, show: true },
      { id: 3, title: '中国降雨量数据集', discription: '气溶胶的描述', image: imageRain, isHover: false, show: true },
    ];
    // 页面互动部分
    const isHover = ref({
      dataPanel: false,
    });
    const dataPanelEnter = () => {
      isHover.value.dataPanel = true
    }
    const dataPanelLeave = () => {
      isHover.value.dataPanel = false
    }
    const isClick = ref({
      dataPanel: false,
      dataPanelDelay: false,
    })
    const dataPanelClick = () => {
      isHover.value.dataPanel = false
      isClick.value.dataPanel = true
      setTimeout(() => {
        isClick.value.dataPanelDelay = true
      }, 500)
    }
    const clsBtnClick = () => {
      isClick.value.dataPanel = false
      isClick.value.dataPanelDelay = false
    }
    const singleContentHover = (index) => {
      listData[index].isHover = !listData[index].isHover
      console.log(index)
    }

    return {
      isHover,
      dataPanelEnter,
      dataPanelLeave,
      isClick,
      dataPanelClick,
      singleContentHover,
      clsBtnClick,
      listData,
      cross,
    };
  },
});
</script>

<style lang="scss" scoped>
@use "sass:math";

$panelHeight: 80px;
$panelWidth: 96px;
@function getPanelFixedHeightRatio ($fixedHeight) {
  @return math.div($fixedHeight, $panelHeight)
};
.dataPanelContainer {
  position: absolute;
  width: $panelWidth;
  height: $panelHeight;
  left: 16px;
  bottom: 16px;
  z-index: 9996;
  border-radius: 8px;
  overflow: hidden; // 解决子元素模糊溢出的问题
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: width 0.5s, height 0.5s
}
.dataPanelContainerClick {
  width: 300px;
  height: 500px;
}
.dataPanelBkg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 9997;
  border-radius: 8px;
  background-image: url('~@/assets/images/preview_aerosol.jpeg');
  background-repeat:no-repeat;
  background-size:100% 100%;
  transition: filter 0.5s;
}
.dataPanelBkgHover {
  filter: blur(4px);
}
.dataPanel {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 9998;
  border-radius: 8px;
  background-color:rgba(255, 255, 255, 0);
  transition: background-color 0.5s;
}
.dataPanelClick {
  background-color:rgba(255, 255, 255, 1);
}

.dataPanelMask {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  text-align: center;
  line-height: $panelHeight;
  color: rgba(1, 1, 1, 0);
  z-index: 9999;
  transition: color 0.5s;
}
.dataPanelMaskHover {
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
.dataPanelHeader {
  padding: 0;
  margin: 4px auto;
  height: 28px;
  width: 286px;
  top: 0;
  color: #090909;
  box-shadow: 0 1px 1px -1px #090909;
}
.dataPanelHeader::after {
  // clearfix
  content: '';
  clear: both;
  display: block;
}
.dataPanelHeaderTitle {
  height: 100%;
  width: fit-content;
  line-height: 24px;
  font-size: 16px;
  margin: 0;
  padding: 0;
  float: left;
  user-select: none;
}
.closeBtn {
  display: block;
  float: right;
  width: auto;
  height: 20px;
  transform: translate(0,4px); //看上去居中，临时写法
  cursor: pointer;
}
.dataPanelContent {
  height: calc(100% - 36px);
  width: 286px;
  margin: auto;
  overflow: visible;
}

.singleContent {
  position: relative;
  width: 286px;
  height: 100px;
  margin-top: 8px;
  border-radius: 8px;
  // overflow-x: visible;
  // background-color: silver;
  transition: transform 0.5s;
  &:hover {
    transform: scale(1.1, 1.1);
    cursor: pointer;
  }

}
.singleContentTitle {
  position: absolute;
  width: 278px;
  height: 50px;
  top: 4px;
  left: 4px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  color: white;
  /* text-shadow: 1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black; */
  text-shadow:  0 0 2px rgb(0, 0, 0),
                0 0 2px rgb(0, 0, 0),
                0 0 2px rgb(0, 0, 0),
                0 0 2px hsl(40, 28.57% , 28.82%),
                0 0 2px hsl(40, 28.57% , 28.82%),
                0 0 2px hsl(40, 28.57% , 28.82%),
                0 0 2px hsl(40, 28.57% , 28.82%),
                0 0 2px hsl(40, 28.57% , 28.82%),
                0 0 2px hsl(40, 28.57% , 28.82%);
  user-select: none;
  pointer-events: none;
}
</style>
