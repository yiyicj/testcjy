<template>
  <div class="bottom-dialog-box" :class="dialogActive ? 'active' : ''" v-if="dialogVisible">
    <div class="mask" @click="hide" @touchmove.prevent></div>
    <div class="bottom-dialog-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogActive: false,
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    cannotHide: {
      type: Boolean
    },
    cancelCallback: {
      type: Boolean
    }
  },
  mounted() {
    if (this.visible) {
      document.body.appendChild(this.$el)
      setTimeout(() => {
        this.dialogActive = this.visible
      }, 1000/60)
    }
  },
  watch:{
    visible(val) {
      if (val) {
        this.dialogVisible = val
        document.body.appendChild(this.$el)
        setTimeout(() => {
          this.dialogActive = val
        }, 1000/60)
      } else {
        this.dialogActive = val
        setTimeout(() => {
          this.dialogVisible = val
        }, 300)
      }
    }
  },
  methods: {
    hide() {
      if(this.cannotHide) return false

      this.dialogActive = false
      setTimeout(() => {
        this.$emit('update:visible', false)
        if(this.cancelCallback) {
          this.$emit('hidebottomdialog')
        }
      }, 300)
    }
  },
  destroyed() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>

<style lang="scss">
$base: 375;
@function vw($px){
  @return ($px / $base) * 100vw;
}
.bottom-dialog-box {
  &.custom {
    .bottom-dialog-content {
      z-index: 7;
      padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
      padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
    }
    &.active {
      .mask {
        z-index: 6;
      }
    }
  }
  &.active {
    .mask {
      background: rgba(0,0,0,0.5);
    }
    .bottom-dialog-content {
      transform: translateY(0)
    }
  }
  .mask {
    position: fixed;
    top: 0; left: 0;
    bottom: 0; right: 0;
    background: rgba(0,0,0,0);
    transition: all 0.2s;
    z-index: 22;
  }
  .bottom-dialog-content {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #ffffff;
    transition: transform 0.3s;
    transform: translateY(100%);
    z-index: 22;
  }
  &.bottom-dialog-alert {
    background: red;
    .bottom-dialog-content{
      padding: vw(8)
    }
    .alert-title {
      padding: vw(12) vw(8) vw(8);
      font-size: vw(20);
      font-weight: bold;
    }
    .alert-content {
      padding: 0 vw(8) vw(48) vw(8);
      font-size: vw(14);
    }
    .alert-button-group {
      background: #000000;
      border-radius: vw(2);
      &.red {
        background: #CC4444;
      }
      &.green {
        background: #2BA246;
      }
      display: flex;
      align-items: center;
    }
    .alert-button {
      flex: 1;
      height: vw(52);
      border-radius: vw(2);
      line-height: vw(52);
      color: #ffffff;
      font-size: vw(15);
      font-weight: bold;
      text-align: center;
    }
    .separation-line {
      width: 0.5px;
      height: vw(28);
      background: rgba(255, 255, 255, 0.4);
    }
  }
}
</style>

