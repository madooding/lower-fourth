<template>
  <input type="datetime-local" v-model="model" />
</template>

<script lang="ts">
import useExtractModelValue from '@/composables/forms/useExtractModelValue'
import { defineComponent, ref } from 'vue'

import { parse, format } from 'date-fns'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'Datetimepicker',
  props: {
    modelValue: {
      type: Object as PropType<Date | null>,
      default: null,
    },
  },

  emits: ['update:modelValue'],

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
    model: {
      get(): string | null {
        return this.val ? format(this.val, "yyyy-MM-dd'T'HH:mm") : null
      },

      set(value: string) {
        console.log(value)
        this.val = parse(value, "yyyy-MM-dd'T'HH:mm", new Date())
        this.$emit('update:modelValue', this.val)
      },
    },
  },
})
</script>

<style lang="scss">
input {
  @apply w-full px-2 bg-gray-600 font-extralight;

  &:active {
    @apply border border-warning outline-none;

    outline: none;
  }
}
</style>
