<template>
  <transition name="mint-indicator">
    <div class="mint-indicator" v-show="visible">
      <div class="mint-indicator-wrapper">
        <spinner :show="true"></spinner>
        <span class="mint-indicator-text" v-show="text">{{ text }}</span>
      </div>
      <div class="mint-indicator-mask" @touchmove.stop.prevent></div>
    </div>
  </transition>
</template>

<script>
  import Spinner from '../spinner/spinner.vue'
  export default {
    components: {
      Spinner
    },
    data () {
      return {
        visible: false,
        text: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "./../../sass/variables.scss";
@import "./../../sass/func.scss";

.mint-indicator {
  transition: all .2s linear;
  z-index: 1;
  position: fixed;

  .mint-indicator-wrapper {
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    border-radius: pxToRem(15px);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    box-sizing: border-box;
    text-align: center;
    z-index: 1;
    padding: pxToRem(35px);
  }

  .mint-indicator-text {
    display: block;
    color: #fff;
    text-align: center;
    margin-top: pxToRem(15px * 2);
    font-size: pxToRem(29px);
  }

  .mint-indicator-spin {
    display: inline-block;
    text-align: center;
  }

  .mint-indicator-mask {
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height:100%;
    opacity: 0;
    background: transparent;
  }
}

.mint-indicator-enter,
.mint-indicator-leave-active {
  opacity: 0;
}
</style>
