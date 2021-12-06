<template>
  <Header/>

  <div class="map-container">
    <Map
      ref="map"
      @getBearing='getBearing'
      @getZoom='getZoom'
    />
  </div>

  <DataPanel/>
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
import { defineComponent } from '@vue/composition-api'
import { ref } from 'vue'
import Header from './components/Header'
import Map from './components/Map.vue'
import DataPanel from './components/DataPanel.vue'
import NaviControl from './components/NaviControl.vue'
import ZoomControl from './components/ZoomControl.vue'
import mapConfig from '@/config/mapConfig'

export default defineComponent({
  components: {
    Header,
    Map,
    DataPanel,
    NaviControl,
    ZoomControl,
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
    return {
      naviClick,
      map,
      navi,
      getBearing,
      zoomClick,
      getZoom,
      mapProps,
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
</style>
