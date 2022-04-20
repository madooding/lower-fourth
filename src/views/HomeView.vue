<template>
  <div class="performance-area" :class="{ 'monitor-mode': $route.name === 'monitor' }">
    <div class="stage">
      <template v-if="store.enable">
        <div class="lyric-slide" v-if="lyric.enable">{{ activeSlide }}</div>
        <div class="lyric-bg" v-if="lyric.enable"></div>
        <div class="countdown" v-if="countdown.enable">
          <div class="clock">{{ clock }}</div>
        </div>
        <Bar :alignment="bar.alignment" :hide="bar.enable"> {{ bar.text }}</Bar>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { differenceInSeconds } from 'date-fns'
import { computed } from '@vue/reactivity'
import { useBarStore, useCountdownStore, useLyricStore, useMainStore } from '@/stores'
import { padStart } from 'lodash'
import Bar from '@/components/display/Bar.vue'
import FirebaseService from '@/services/modules/Firebase'

export default defineComponent({
  components: {
    Bar,
  },

  setup() {
    const mainStore = useMainStore()
    const lyricStore = useLyricStore()
    const countdownStore = useCountdownStore()
    const barStore = useBarStore()
    const { activeSlide } = storeToRefs(lyricStore)
    const date = ref(new Date())

    setInterval(() => {
      date.value = new Date()
    }, 1000)

    const clock = computed(() => {
      const rest = countdownStore.datetime ? differenceInSeconds(countdownStore.datetime!, date.value) : 0
      if (rest <= 0) return '00:00:00'

      const seconds = rest % 60
      const minutes = Math.floor((rest - seconds) / 60) % 60
      const hours = Math.floor(rest / 60 / 60)

      return `${padStart(hours.toString(), 2, '0')}:${padStart(minutes.toString(), 2, '0')}:${padStart(
        seconds.toString(),
        2,
        '0'
      )}`
    })

    const unsubMainListener = FirebaseService.createMainListener((data) => {
      mainStore.$patch(data)
    })

    const unsubLyricListener = FirebaseService.createLyricsListener((data) => {
      lyricStore.$patch(data)
    })

    const unsubCountdownListener = FirebaseService.createCountdownListener((data) => {
      countdownStore.$patch(data)
    })

    const unsubBarListener = FirebaseService.createBarListener((data) => {
      console.log(data)
      barStore.$patch(data)
    })

    onUnmounted(() => {
      unsubMainListener()
      unsubLyricListener()
      unsubCountdownListener()
      unsubBarListener()
    })

    return { store: mainStore, lyric: lyricStore, countdown: countdownStore, bar: barStore, activeSlide, clock }
  },
})
</script>

<style lang="scss">
body {
  .performance-area {
    @apply flex items-center justify-center w-screen h-screen;

    .stage {
      @apply relative flex w-full;

      aspect-ratio: 16/9;
      overflow: hidden;

      .lyric-slide {
        @apply inline-block absolute font-maledpan text-white text-center;

        width: 80%;
        left: 50%;
        bottom: 3.125vw;
        font-size: 5vw;
        line-height: 1.25em;
        transform: translateX(-50%);
        z-index: 10;
        text-shadow: 3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
      }

      .lyric-bg {
        @apply absolute bottom-0;

        width: 100%;
        height: 35%;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 85%);
        z-index: 5;
      }

      .countdown {
        @apply absolute w-full h-full bg-red-50;

        background-image: url('@/assets/countdown-4.png');
        background-size: cover;
        background-repeat: no-repeat;
        z-index: 15;

        .clock {
          @apply absolute text-center text-white;

          width: 40vw;
          right: 10%;
          bottom: 12%;
          font-size: 8vw;
        }
      }
    }

    &.monitor-mode {
      @apply bg-black;

      .lyric-slide {
        top: 50%;
        bottom: unset;
        transform: translate(-50%);
      }
    }
  }
}
</style>
