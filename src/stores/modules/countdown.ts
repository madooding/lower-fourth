import type { ICountdownState } from '@/types'
import { defineStore } from 'pinia'

export default defineStore('countdown', {
  state(): ICountdownState {
    return {
      enable: false,
      datetime: null,
    }
  },
})
