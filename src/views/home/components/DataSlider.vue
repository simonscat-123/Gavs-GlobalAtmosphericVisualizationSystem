<template>
  <div class="sliderContainer">
    <input class="slider" type="range" value="0" min="0" max="50"/>
    <div class="sliderTip"></div>
  </div>
</template>

<script>
export default {
  setup() {

  },
}
</script>

<style lang="scss" scoped>
@keyframes elasticGrow {
  from {
      transform: scale(0);
  }
  70% {
      transform: scale(1.1);
      animation-timing-function: cubic-bezier(.1, .25, .1, .25);
  }
}
@keyframes elasticDec {
  from {
      transform: scale(1);
  }
  to {
      transform: scale(0);
      animation-timing-function: cubic-bezier(.25, .1, .25, .1);
  }
}
@keyframes rainbow {
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}
.sliderContainer {
  position: absolute;
  width: 800px;
  height: 40px;
  left: 50%;
  bottom: 104px;
  transform: translateX(-50%);
  .slider {
    width: 100%;
    height: 100%;
    &:focus + .sliderTip {
      transform: scale(1);
      animation: .45s elasticGrow;
    }
    &:not(:focus) + .sliderTip {
      transform: scale(0);
      animation: .25s elasticDec;
    }
  }
  .sliderTip {
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    bottom: 40px;
    background-color: aqua;
    transform: translateX(-50%);
    transform-origin: 50px -20px;

  }
}
</style>
