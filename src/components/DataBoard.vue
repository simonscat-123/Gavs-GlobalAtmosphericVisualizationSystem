<template>
  <div class="container"
    :style="{
      'width': clicked ? '300px' : '96px',
      'height': clicked ? '500px' : '80px',
    }"
  >
      <div class="backgroundImage"
        :style="{
          'background-image': `url(${data.backgroundImage})`
        }"
      ></div>
      <div class="dataBoard"
        :style="{
          'cursor': clicked ? 'default' : 'pointer',
          'background-color': clicked ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
          'overflow': clickedDelay ? 'visible' : 'hidden'
        }"
        @click="boardClick()"
      >
        <div class="dataBoardHeader" v-show="clicked">
          <div class="dataBoardHeaderTitle" >{{data.title}}</div>
          <div class="dataBoardHeaderCloseBtn" @click.stop="boardClose()">
            <img class="CloseBtn" :src="cross" />
          </div>
        </div>
        <div class="dataBoardContentContainer" v-show="clicked">
          <div class="dataBoardContent"
            v-for="content in data.dataContents"
            :key="content.id"
            :style="{
              'background-image': `url(${content.image})`,
              'outline': content.show ? '2px solid rgba(40, 255, 33, 0.5)' : '0px solid rgba(255, 255, 255, 0)',
            }"
            @click.stop="contentClick(content.id)"
          >
            <div class="dataBoardContentTitle">{{content.title}}</div>
            <div class="dataBoardContentDiscription"></div>
            <div class="dataBoardContentShow"
              :style="{ 'color': content.show ? 'rgba(7, 204, 0, 0.4)' : 'rgba(7, 204, 0, 0)' }">
              <img class="contentShow" :src="preview" />
            </div>
          </div>
        </div>
      </div>
      <div class="title"
        v-show="!clicked"
        >{{data.maskTitle}}</div>
  </div>
</template>

<script>
import { ref, onMounted, toRefs } from 'vue'
import SVGInject from '@iconfu/svg-inject'
import { cross, preview } from '@/assets/icons/icons.js'

export default {
  props: {
    data: Object,
  },
  setup(props, { emit }) {
    onMounted(() => {
      SVGInject(document.getElementsByTagName('img'));
    })
    const data = toRefs(props.data)
    const clicked = ref(false)
    const clickedDelay = ref(false)
    const boardClick = () => {
      // 这里点击Board的任意地方都会触发，
      // 不知道会出现什么问题，先在这记录下
      clicked.value = true
      setTimeout(() => {
        clickedDelay.value = true
      }, 500)
    }
    const boardClose = () => {
      clicked.value = false
      clickedDelay.value = false
    }
    // 项目点击
    const contentClick = (id) => {
      data.dataContents.value.forEach((content) => {
        if (content.id !== id) {
          content.show = false
          return false
        }
        content.show = !content.show
        emit('contentClick', { id: `${data.id.value}-${id}`, handle: content.show })
        return true
      });
    }
    return {
      clicked,
      clickedDelay,
      boardClick,
      cross,
      preview,
      boardClose,
      contentClick,
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: width 0.5s, height 0.5s;
  .backgroundImage {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    border-radius: 8px;
    overflow: hidden;
    background-repeat:no-repeat;
    background-size:auto 100%;
    background-position: center center;
  }
  .dataBoard {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0);
    transition: background-color 0.5s;
    &:hover + .title{
      text-shadow: 1px 1px 8px black, -1px -1px 8px black, 1px -1px 8px black, -1px 1px 8px black;
      transform: scale(1.2, 1.2);
    }
  }
  .title {
    position: absolute;
    width: 96px;
    height: 80px;
    top: 0px;
    left: 0px;
    text-align: center;
    line-height: 80px;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    text-shadow: 1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, -1px 1px 1px black;
    user-select: none;
    pointer-events: none;
    transition: all 0.5s;
  }
}
.dataBoardHeader {
  position: relative;
  width: 286px;
  height: 24px;
  margin: 8px auto 0 auto;
  box-shadow: 0 1px 1px -1px #090909;
  .dataBoardHeaderTitle {
    position:absolute;
    left: 0;
    width: 250px;
    height: 24px;
    line-height: 24px;
    font-size: 16px;
    vertical-align: center;
    user-select: none;
  }
  .dataBoardHeaderCloseBtn {
    position:absolute;
    right: 0;
    width: 24px;
    height: 24px;
    cursor: pointer;
    .CloseBtn {
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  }
}
.dataBoardContentContainer {
  position: relative;
  width: 286px;
  height: 476px;
  margin: 0 auto;
  .dataBoardContent {
    position: relative;
    width: 286px;
    height: 100px;
    margin: 8px auto;
    border-radius: 8px;
    // outline: 1px solid rgb(40, 255, 33);
    overflow: hidden;
    transition: transform 0.5s, outline 0.5s;
    cursor: pointer;
    &:hover {
      transform: scale(1.1, 1.1);
    }
    .dataBoardContentTitle {
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
    .dataBoardContentShow {
      position: absolute;
      width: 96px;
      height: 96px;
      color: rgba(7, 204, 0, 0.4);
      right: 0;
      bottom: 0;
      transition: color 0.5s;
      transform: translate(20px, 30px) rotate(-15deg);
      .contentShow {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
