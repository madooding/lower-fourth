<template>
  <transition name="bar">
    <div v-if="hide" class="bar">
      <div class="background"></div>
      <div class="leave-left"></div>
      <div class="leave-right"></div>
      <div class="logo"></div>
      <div class="text" :class="alignment"><slot /></div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    hide: {
      type: Boolean,
      default: true,
    },

    alignment: {
      type: String,
      default: 'left',
    },
  },
})
</script>

<style lang="scss" scoped>
.bar {
  @apply absolute bottom-0 w-full;

  height: 14%;
  z-index: 1;

  .background {
    @apply absolute w-full h-full;

    background-image: url('@/assets/bar/squared-paper.png');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .leave-left {
    @apply absolute bottom-0;

    width: 10.8854166667%;
    padding-top: 9.8958333333%;
    background-image: url('@/assets/bar/leave-left.png');
    background-repeat: no-repeat;
    background-size: contain;
  }

  .leave-right {
    @apply absolute bottom-0 right-0;

    width: 7.8645833333%;
    padding-top: 8.8541666667%;
    background-image: url('@/assets/bar/leave-right.png');
    background-repeat: no-repeat;
    background-size: contain;
  }

  .logo {
    @apply absolute;

    width: 11.6666666667%;
    padding-top: 11.5625%;
    left: 1.6666666667%;
    bottom: 0.78125%;
    background-image: url('@/assets/bar/logo.png');
    background-repeat: no-repeat;
    background-size: contain;
  }

  .text {
    @apply absolute font-maledpan font-bold text-primary-1;

    top: 45%;
    font-size: 3.5675675676vw;
    line-height: 1em;
    text-shadow: 3px 3px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
    transform: translateY(-50%);

    &.left {
      left: 15%;
    }

    &.right {
      right: 15%;
    }

    &.center {
      left: 50%;
      text-align: center;
      transform: translateX(-50%) translateY(-50%);
    }
  }
}

.bar-enter-active {
  transition: all 2s ease-out;

  .background {
    transition: all 0.25s ease-in;
  }

  .leave-left,
  .leave-right {
    transition: all 0.25s ease-in 0.25s;
  }

  .logo {
    transition: all 0.25s ease-in 0.5s;
  }

  .text {
    transition: all 0.125s ease-in 0.75s;
  }
}

.bar-leave-active {
  transition: all 2s ease-out;

  .background {
    transition: all 0.25s ease-out 0.625s;
  }

  .leave-left,
  .leave-right {
    transition: all 0.25s ease-out 0.375s;
  }

  .logo {
    transition: all 0.25s ease-out 0.125s;
  }

  .text {
    transition: all 0.125s ease-in;
  }
}

.bar-enter-from,
.bar-leave-to {
  .background {
    transform: translateY(100%);
  }

  .leave-left,
  .leave-right {
    transform: translateY(100%);
  }

  .logo {
    transform: translateY(100%);
  }

  .text {
    opacity: 0;
  }
}
</style>
