<template>
  <Header/>

  <div class="map-container">
    <Map
      ref="map"
      @getBearing='getBearing'
      @getZoom='getZoom'
    />
  </div>
  <DataSlider/>
  <div class="dataBoardCollectionContainer"
    :style="{ 'bottom': dataBoardCollectionPullClicked ? '-80px' : '16px' }">
    <div class="dataBoardCollectionPull"
      :style="{
        'transform': dataBoardCollectionPullClicked ? 'translate(-50%, 10%) rotate(0deg)' : 'translate(-50%, 10%) rotate(180deg)' }"
      @click="dataBoardCollectionPullClick()">
      <img class="pullBtn" :src="chevronUp" />
    </div>
    <div class="dataBoardCollection">
      <DataBoard
        v-for="(dataBoard) in dataCollection"
        :key="dataBoard.id"
        :data='dataBoard'
        :ref="dataBoardRefs"
        @contentClick='dataContentClick'
        @dataBoardCilck='dataBoardCilck' />
    </div>
  </div>

  <div class="controlerContainer">
    <NaviControl
      ref="navi"
      @naviClick='naviClick'
      :mapBearing='mapProps.mapBearing'
      />
    <ZoomControl
      ref="zoom"
      @zoomClick='zoomClick'
      :mapLevel='mapProps.mapLevel'
      />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import SVGInject from '@iconfu/svg-inject'
import Header from './components/Header'
import Map from './components/Map.vue'
import NaviControl from './components/NaviControl.vue'
import ZoomControl from './components/ZoomControl.vue'
import mapConfig from '@/config/mapConfig'
import DataBoard from '@/components/DataBoard'
import imageAerosol from '@/assets/images/preview_aerosol@small.png'
import imageTemp from '@/assets/images/preview_Temp2@small.png'
import imageRain from '@/assets/images/preview_rain2@small.png'
import imagePreviewMaptype from '@/assets/images/preview_maptype2.png'
import imagePreviewData from '@/assets/images/preview_aerosol.jpeg'
import { chevronUp } from '@/assets/icons/icons.js'
import DataSlider from './components/DataSlider.vue'

export default ({
  components: {
    Header,
    Map,
    NaviControl,
    ZoomControl,
    DataBoard,
    DataSlider,
  },
  setup() {
    onMounted(() => {
      SVGInject(document.getElementsByTagName('img'));
    })
    const map = ref(null)
    const navi = ref(null)
    const mapProps = ref({
      mapLevel: mapConfig.zoom,
      mapBearing: 0,
    })
    const naviClick = (index) => {
      map.value.naviClick(index)
    };
    const getBearing = (bearing) => {
      mapProps.value.mapBearing = bearing
    }

    const zoomClick = (index) => {
      map.value.zoomClick(index)
    }
    const getZoom = (zoomLevel) => {
      mapProps.value.mapLevel = zoomLevel
    }

    // 初始化dataBoard数据
    const dataCollection = ref([
      { id: 0,
        name: 'basicMap',
        title: '底图切换',
        maskTitle: '底图切换',
        backgroundImage: imagePreviewMaptype,
        dataContents: [
          { id: 0, name: 'name1', title: '底图的名字1', image: imageAerosol, show: false },
          { id: 1, name: 'name2', title: '底图的名字2', image: imageTemp, show: false },
          { id: 2, name: 'name3', title: '底图的名字3', image: imageRain, show: false },
        ],
      },
      { id: 1,
        name: 'dataBoard',
        title: '数据展板',
        maskTitle: '数据展板',
        backgroundImage: imagePreviewData,
        dataContents: [
          { id: 0, name: 'aerosol', title: '高精度气溶胶数据集', discription: '气溶胶的描述', image: imageAerosol, show: false },
          { id: 1, name: 'temp', title: '全球地表温度数据集', discription: '气溶胶的描述', image: imageTemp, show: false },
          { id: 2, name: 'rain', title: '中国降雨量数据集', discription: '气溶胶的描述', image: imageRain, show: false },
        ],
      },
    ])
    const dataContentClick = (param) => {
      map.value.switchMap(param)
    }

    // 初始化dataBoard引用
    const dataBoardRefsArray = []
    const dataBoardRefs = (dataBoard) => {
      if (dataBoardRefsArray.length === dataCollection.value.length) return false
      if (dataBoard) {
        dataBoardRefsArray.push(dataBoard)
      }
      return true
    }

    const dataBoardCilck = (handle, id) => {
      console.log(id)
      dataBoardRefsArray.forEach((dataBoard, index) => {
        if (id === index) return false
        dataBoard.boardClick(false)
        return true
      })
    }
    const dataBoardReactClass = {

    }
    const dataBoardCollectionPullClicked = ref(false)
    const dataBoardCollectionPullClick = () => {
      console.log(dataBoardCollectionPullClicked.value)
      dataBoardCollectionPullClicked.value = !dataBoardCollectionPullClicked.value
    }
    return {
      naviClick,
      map,
      navi,
      getBearing,
      zoomClick,
      getZoom,
      mapProps,
      DataBoard,
      dataCollection,
      dataContentClick,
      dataBoardCilck,
      dataBoardRefs,
      chevronUp,
      dataBoardCollectionPullClick,
      dataBoardCollectionPullClicked,
    }
  },
})
</script>

<style lang="scss" scoped>
.map-container {
  position: absolute;
  top: 0px;
  left: 0px;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
}
.controlerContainer {
  position: absolute;
  left: 16px;
  top: 16px;
  width: 60px;
  height: 144px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.dataBoardCollectionContainer {
  position: absolute;
  width: auto;
  height: 80px;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  transition: bottom 0.5s;
}

.dataBoardCollectionPull {
  position: absolute;
  height: 24px;
  width: 24px;
  bottom: 80px;
  left: 50%;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.17);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 15px;
  transform: translate(-50%, 10%) rotate(180deg);
  transition: transform 0.5s;
  .pullBtn {
    width: 100%;
    height: 100%;
    transform: translateY(-10%);
    &:hover{
      cursor: pointer;
      color: rgb(43, 130, 255);;
    }
  }
}

.dataBoardCollection {
  position: relative;
  height: 80px;
  width: auto;
  bottom: 0px;
  // left: 50%;
  // transform: translateX(-50%);
  // box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px, inset rgba(0, 0, 0, 0.35) 0px 5px 15px;
  // border-radius: 8px;
  // overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
}
</style>
