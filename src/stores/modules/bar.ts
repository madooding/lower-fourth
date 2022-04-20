import { defineStore } from 'pinia'
import type { IBarState } from '@/types'

export default defineStore('bar', {
  state(): IBarState {
    return {
      enable: false,
      text: '',
      alignment: 'left',
    }
  },
})
