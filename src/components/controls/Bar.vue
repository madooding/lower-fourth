<template>
  <div class="section">
    <div class="header">
      Information Bar

      <Toggler class="absolute right-2" v-model="enable" @change="syncBarData" />
    </div>

    <div class="board">
      <div class="flex w-full gap-2">
        <Input id="bar-text" v-model="text" />
        <button class="button" @click="setText">Set</button>
      </div>
      <div class="flex w-full mt-2 gap-2">
        <button class="button w-full" @click="setAlignment('left')">Left</button>
        <button class="button w-full" @click="setAlignment('center')">Center</button>
        <button class="button w-full" @click="setAlignment('right')">Right</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import { useBarStore } from '@/stores'
import { storeToRefs } from 'pinia'

import Toggler from '@/components/Toggler.vue'
import Input from '@/components/forms/Input.vue'
import FirebaseService from '@/services/modules/Firebase'

export default defineComponent({
  components: {
    Toggler,
    Input,
  },

  setup() {
    const barStore = useBarStore()
    const { enable, alignment } = storeToRefs(barStore)

    const unsubscribe = FirebaseService.createBarListener((data) => {
      barStore.$patch(data)
    })

    onUnmounted(() => {
      unsubscribe()
    })

    return {
      barStore,
      enable,
      alignment,
    }
  },

  data() {
    return {
      text: '',
    }
  },

  mounted() {
    FirebaseService.getBarData().then((payload) => {
      this.barStore.$patch(payload)
      this.text = payload.text
    })
  },

  methods: {
    syncBarData() {
      FirebaseService.updateBarData(this.barStore.$state)
    },

    setAlignment(alignment: 'left' | 'center' | 'right') {
      this.alignment = alignment
      this.syncBarData()
    },

    setText() {
      this.barStore.text = this.text
      this.syncBarData()
    },
  },
})
</script>
