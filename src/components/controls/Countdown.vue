<template>
  <div class="section">
    <div class="header">
      Countdown

      <Toggler class="absolute right-2" v-model="enable" @change="syncCountdownData"></Toggler>
    </div>

    <div class="board">
      <div class="flex w-full">
        <DatetimePicker v-model="datetime" />
        <button class="button ml-2" @click="set">Set</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import Toggler from '@/components/Toggler.vue'
import DatetimePicker from '../forms/DatetimePicker.vue'

import { useCountdownStore } from '@/stores'
import { storeToRefs } from 'pinia'
import FirebaseService from '@/services/modules/Firebase'

export default defineComponent({
  components: {
    Toggler,
    DatetimePicker,
  },

  setup() {
    const countdownStore = useCountdownStore()
    const { enable } = storeToRefs(countdownStore)

    const unsubscribe = FirebaseService.createCountdownListener((data) => {
      countdownStore.$patch(data)
    })

    onUnmounted(() => {
      unsubscribe()
    })

    return {
      enable,
      countdownStore,
    }
  },

  data() {
    return {
      datetime: null as Date | null,
    }
  },

  mounted() {
    FirebaseService.getCountdownData().then((payload) => {
      this.countdownStore.$patch(payload)
      this.datetime = payload.datetime
    })
  },

  methods: {
    set() {
      this.countdownStore.datetime = this.datetime
      this.syncCountdownData()
    },

    syncCountdownData() {
      FirebaseService.updateCountdownData(this.countdownStore.$state)
    },
  },
})
</script>
