<template>
  <div class="headerContainer">
    <div class="toolContainer"
      v-for="tool in tools"
      :key="tool.id"
      >
      <img class="toolIcon"
          :src = tool.image
          :title = tool.title
        />
      <div class="toolTitle"></div>
    </div>
    <div class="avatar" title="个人系统，敬请期待">

    </div>
  </div>
</template>

<script>
import SVGInject from '@iconfu/svg-inject'
import { onMounted } from 'vue'
import { camera, map } from '@/assets/icons/icons'

export default ({
  setup() {
    // 要在dom创建好，img的url动态引入后再转换
    onMounted(() => {
      SVGInject(document.getElementsByClassName('toolIcon'));
    })

    const tools = [
      { id: 1, name: 'screenshot', title: '截图', image: camera },
      { id: 2, name: 'locate', title: '定位', image: map },
    ];
    return {
      tools,
    }
  },
})
</script>

<style scope lang="scss">
.headerContainer {
  position: absolute;
  top: 16px;
  right: 16px;
  margin: 0px;
  padding: 0px;
  width: auto;
  height: 48px;
  z-index: 9997;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  // background-color: rosybrown;
  // pointer-events: none;
  .toolContainer {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    cursor: pointer;
    .toolIcon {
      width: 100%;
      height: 100%;
      &:hover {
        color: rgb(43, 130, 255);
      };
    }
  }
  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-image: url('~@/assets/images/avatar.png');
    background-size: 100%;
    background-repeat: no-repeat;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    cursor: pointer;
  }
}
</style>
