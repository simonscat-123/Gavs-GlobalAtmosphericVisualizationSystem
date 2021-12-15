<template>
  <div id="map"></div>
</template>

<script>
import { ref, nextTick } from 'vue';
import * as maptalks from 'maptalks/dist/maptalks.min';
import mapConfig from '@/config/mapConfig';

export default ({
  setup(props, { emit }) {
    let map
    nextTick(() => {
      map = new maptalks.Map('map', {
        center: [-0.113049, 51.498568],
        zoom: mapConfig.zoom,
        scaleControl: {
          position: { bottom: '16', right: '18' },
          maxWidth: 100,
          metric: true,
          imperial: false,
          // containerClass: 'scaleContainer',
        },
        baseLayer: new maptalks.TileLayer('base', {
          urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
          subdomains: ['a', 'b', 'c', 'd'],
        }),
      });
      map.on('animating mousemove touchmove', () => {
        emit('getBearing', Number(map.getBearing().toFixed(1)))
      })
      map.on('zooming', () => {
        emit('getZoom', Number(map.getZoom().toFixed(1)))
      })
    })

    // 底图、数据集切换
    let basicMapLayer = null
    let dataContentLayer = null
    const switchMap = (param) => {
      switch (param.boardName) {
        case 'basicMap':
          basicMapLayer = 0
          console.log(param)
          break;
        case 'dataBoard':
          dataContentLayer = 0
          console.log(param)
          // if (param.handle === true) {
          //   if (!dataContentLayer) map.removeLayer(dataContentLayer)
          //   dataContentLayer = new maptalks.WMSTileLayer('wms', {
          //     urlTemplate: 'http://localhost:8000/geoserver/testAuto/wms',
          //     crs: 'EPSG:3857',
          //     layers: 'testAuto:testCSN',
          //     styles: '',
          //     version: '1.1.1',
          //     format: 'image/png',
          //     transparent: true,
          //     opacity: 0.4,
          //   })
          //   map.addLayer(dataContentLayer)
          // } else {
          //   map.removeLayer(dataContentLayer)
          //   dataContentLayer = null
          // }

          break;

        default:
          break;
      }
    }
    // 指北针交互
    const naviClick = (index) => {
      const nowBearing = map.getBearing()
      let newBearing = 0
      switch (index) {
        case 0:
          newBearing = nowBearing + 90
          break;
        case 2:
          newBearing = nowBearing - 90
          break;
        default:
          break;
      }
      map.animateTo({
        bearing: newBearing,
      }, {
        duration: 500,
      })
    }
    // 放缩交互
    const zoomClick = (index) => {
      let nowZoom = map.getZoom()
      switch (index) {
        case 0:
          nowZoom += 1;
          break;
        case 1:
          nowZoom = mapConfig.zoom
          break;
        case 2:
          nowZoom -= 1;
          break;
        default:
          break;
      }
      map.setZoom(nowZoom)
    }
    return {
      naviClick,
      zoomClick,
      switchMap,
    }
  },
});
</script>

<style scope>
#map {
  top: 0px;
  left: 0px;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
}
.maptalks-attribution {
  display: none;
}
.scaleContainer {
  position: absolute;
  overflow: visible;
  bottom: 16px;
  right: 16px;
}
</style>
