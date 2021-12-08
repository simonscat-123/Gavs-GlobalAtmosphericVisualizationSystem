<template>
  <Header/>

  <div class="map-container">
    <Map
      ref="map"
      @getBearing='getBearing'
      @getZoom='getZoom'
    />
  </div>

  <!-- <DataPanel/> -->

  <div class="dataBoardCollection">
    <div class="dataBoardContainer" v-for="dataBoard in dataCollection" :key="dataBoard.id">
      <DataBoard :data='dataBoard' @contentClick='dataContentClick'/>
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
import { ref } from 'vue'
import Header from './components/Header'
import Map from './components/Map.vue'
// import DataPanel from './components/DataPanel.vue'
import NaviControl from './components/NaviControl.vue'
import ZoomControl from './components/ZoomControl.vue'
import mapConfig from '@/config/mapConfig'
import DataBoard from '@/components/DataBoard'
import imageAerosol from '@/assets/images/preview_aerosol@small.png'
import imageTemp from '@/assets/images/preview_Temp2@small.png'
import imageRain from '@/assets/images/preview_rain2@small.png'
import imagePreviewMaptype from '@/assets/images/preview_maptype2.png'
import imagePreviewData from '@/assets/images/preview_aerosol.jpeg'

export default ({
  components: {
    Header,
    Map,
    // DataPanel,
    NaviControl,
    ZoomControl,
    DataBoard,
  },
  setup() {
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

    const dataCollection = ref([
      { id: 0,
        name: 'test1',
        title: '数据展板',
        maskTitle: '数据展板',
        backgroundImage: imagePreviewData,
        dataContents: [
          { id: 0, title: '高精度气溶胶数据集', discription: '气溶胶的描述', image: imageAerosol, show: false },
          { id: 1, title: '全球地表温度数据集', discription: '气溶胶的描述', image: imageTemp, show: false },
          { id: 2, title: '中国降雨量数据集', discription: '气溶胶的描述', image: imageRain, show: false },
        ],
      },
      { id: 1,
        name: 'test2',
        title: '底图切换',
        maskTitle: '底图切换',
        backgroundImage: imagePreviewMaptype,
        dataContents: [
          { id: 0, title: '底图的名字1', image: imageAerosol, show: false },
          { id: 1, title: '底图的名字2', image: imageTemp, show: false },
          { id: 2, title: '底图的名字3', image: imageRain, show: false },
        ],
      },
    ])

    const dataContentClick = (param) => {
      // 底图切换
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
  right: 16px;
  bottom: 52px;
  width: 60px;
  height: 144px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.dataBoardCollection {
  position: absolute;
  width: auto;
  height: 80px;
  bottom: 16px;
  left: 16px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row-reverse;
  align-items: center;
  .dataBoardContainer {
    position: relative;
    height: 80px;
    width: 96px;
    margin-left: 8px;

  }
}
</style>
