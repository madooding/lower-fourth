<template>
  <div class="control-panel">
    <div class="header">
      Lower Fourth (Powered by @madooding)

      <Toggler class="absolute right-2" @change="onToggleMain" v-model="enable" />
    </div>

    <CountdownSection />
    <LyricSection />
    <BarSection />
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores'
import Toggler from '@/components/Toggler.vue'
import LyricSection from '@/components/controls/Lyrics.vue'
import CountdownSection from '@/components/controls/Countdown.vue'
import BarSection from '@/components/controls/Bar.vue'
import FirebaseService from '@/services/modules/Firebase'

export default defineComponent({
  components: {
    Toggler,
    LyricSection,
    CountdownSection,
    BarSection,
  },

  setup() {
    const mainStore = useMainStore()
    const unsubscribe = FirebaseService.createMainListener((data) => {
      mainStore.$patch(data)
    })

    onUnmounted(() => {
      unsubscribe()
    })

    return {
      mainStore,
      ...storeToRefs(mainStore),
    }
  },

  mounted() {
    FirebaseService.getMainData().then((payload) => {
      this.mainStore.$patch(payload)
    })
  },

  methods: {
    onToggleMain() {
      this.syncMainData()
    },

    syncMainData() {
      FirebaseService.updateMainData(this.mainStore.$state)
    },
  },
})
</script>

<style lang="scss">
body {
  @apply font-sans font-extralight text-3 text-white;

  background-color: lighten(#333, 3%);
}
</style>
