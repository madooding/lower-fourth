import { defineStore } from 'pinia'

import type { ILyricsState } from '@/types'

export default defineStore('lyric', {
  state(): ILyricsState {
    return {
      enable: false,
      slides: [],
      activeSlideIndex: null,
    }
  },

  getters: {
    activeSlide(): string | null {
      return this.activeSlideIndex != null ? this.slides[this.activeSlideIndex] : null
    },
  },
})
