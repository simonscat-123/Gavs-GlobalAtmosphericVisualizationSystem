<template>
  <Header/>

  <div class="map-container">
    <Map
      ref="map"
      @getBearing='getBearing'
      @getZoom='getZoom'
    />
  </div>
  <div class="dataBoardCollectionPull">
    <img class="pullBtn" :src="chevronUp"/>
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

export default ({
  components: {
    Header,
    Map,
    NaviControl,
    ZoomControl,
    DataBoard,
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
      if (dataBoard) {
        dataBoardRefsArray.push(dataBoard)
      }
    }

    const dataBoardCilck = (handle, id) => {
      console.log(id)
      dataBoardRefsArray.forEach((dataBoard, index) => {
        if (id === index) return false
        dataBoard.boardClick(false)
        return true
      })
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

.dataBoardCollectionPull {
  position: absolute;
  height: 24px;
  width: 24px;
  bottom: 90px;
  left: 50%;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: rgba(0, 0, 0, 0.19);
  transform: translateX(-50%);
  .pullBtn {
    width: 100%;
    height: 100%;
  }
}

.dataBoardCollection {
  position: absolute;
  height: 80px;
  width: auto;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
}
</style>
