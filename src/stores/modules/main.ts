import type { IMainState } from '@/types'
import { defineStore } from 'pinia'

export default defineStore('main', {
  state(): IMainState {
    return {
      enable: false,
    }
  },
})
