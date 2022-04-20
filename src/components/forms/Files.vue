<template>
  <button class="button" v-bind="$attrs" @click="triggerInput">
    <input ref="input" type="file" style="display: none" :accept="accept" :multiple="multiple" @change="onChange" />
    <slot></slot>
  </button>
</template>

<script lang="ts">
import useExtractModelValue from '@/composables/forms/useExtractModelValue'
import { defineComponent, ref, type PropType } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Array as PropType<File[]>,
      default: () => [],
    },

    accept: {
      type: String,
      default: '*',
    },

    multiple: {
      type: Boolean,
      default: true,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue', 'change'],

  setup(props) {
    const input = ref<InstanceType<typeof HTMLInputElement>>()
    const value = ref<File[]>(props.modelValue)

    useExtractModelValue(props, (payload) => {
      value.value = payload
    })

    return {
      input,
      val: value,
    }
  },

  computed: {
    model: {
      get(): File[] {
        return this.val
      },

      set(files: File[]) {
        this.val = files
        this.$emit('update:modelValue')
      },
    },
  },

  methods: {
    triggerInput() {
      if (this.disabled) return
      this.input?.click()
    },

    async onChange() {
      for (let i = 0; i < (this.input?.files?.length || 0); i++) {
        let file = this.input!.files!.item(i)!

        this.model.push(file)
      }
      this.$emit('change', this.model)
    },

    getFiles() {
      return this.model
    },

    resetFiles() {
      this.model = []
      this.input!.value = ''
    },
  },
})
</script>
