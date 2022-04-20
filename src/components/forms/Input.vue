<template>
  <input type="text" v-model="model" />
</template>

<script lang="ts">
import useExtractModelValue from '@/composables/forms/useExtractModelValue'
import { defineComponent, ref, type PropType } from 'vue'

export default defineComponent({
  name: 'Input',
  props: {
    modelValue: {
      type: Object as PropType<string | null>,
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
        return this.val
      },

      set(value: string) {
        this.val = value
        this.$emit('update:modelValue', this.val)
      },
    },
  },
})
</script>

<style lang="scss" scoped>
input {
  @apply w-full px-2 bg-gray-600 font-extralight;

  &:active {
    @apply border border-warning outline-none;

    outline: none;
  }
}
</style>
