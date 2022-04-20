<template>
  <div class="toggler" @click="toggle()" :class="classes" v-bind="$attrs">
    <div class="indicator"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import useExtractModelValue from '@/composables/forms/useExtractModelValue'

export default defineComponent({
  name: 'Toggler',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },

    class: {
      type: String,
      default: 'relative',
      required: false,
    },
  },

  emits: ['update:modelValue', 'change'],

  setup(props) {
    let value = ref(props.modelValue)
    useExtractModelValue(props, (payload) => {
      value.value = payload
    })

    return {
      val: value,
    }
  },

  computed: {
    enable: {
      get(): boolean {
        return this.val
      },

      set(value: boolean) {
        this.val = value
        this.$emit('update:modelValue', value)
      },
    },

    classes(): string {
      const propClass = this.class.split(' ')
      if (this.enable) propClass.push('enable')

      return propClass.join(' ')
    },
  },

  methods: {
    toggle() {
      this.enable = !this.enable
      this.$emit('change')
    },
  },
})
</script>

<style lang="scss">
.toggler {
  @apply flex items-center w-8 h-4 rounded-lg bg-gray-700;

  cursor: pointer;
  transition: all 0.125s ease-in;

  .indicator {
    @apply absolute w-4 h-4 bg-white rounded-full;

    transform: scale(0.75);
    transition: all 0.125s ease-in;
  }

  &.enable {
    @apply bg-green-400;

    .indicator {
      margin-left: 50%;
    }
  }
}
</style>
