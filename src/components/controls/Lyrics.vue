<template>
  <div class="section">
    <div class="header">
      Lyrics

      <Toggler class="absolute right-2" v-model="lyricStore.enable" @change="syncLyricsData" />
    </div>

    <div class="board">
      <div class="lyric-selector">
        <div
          v-for="(slide, i) in slides"
          :key="i"
          class="slide"
          :class="{ active: i === activeSlideIndex }"
          @click="setActiveSlide(i)"
        >
          {{ slide }}
        </div>
      </div>
      <div class="flex w-full mt-3">
        <FileButton ref="importLyricsButton" @change="onImportLyrics">Import</FileButton>
        <button class="button ml-auto" v-if="slides.length" @click="resetLyrics">Reset</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref } from 'vue'
import Toggler from '@/components/Toggler.vue'
import FileButton from '@/components/forms/Files.vue'

import useLyricStore from '@/stores/modules/lyric'
import { FileService } from '@/services'
import { storeToRefs } from 'pinia'
import FirebaseService from '@/services/modules/Firebase'

export default defineComponent({
  components: {
    Toggler,
    FileButton,
  },

  setup() {
    const lyricStore = useLyricStore()
    const { slides, activeSlideIndex } = storeToRefs(lyricStore)
    const importLyricsButton = ref<InstanceType<typeof FileButton>>()

    const unsubscribe = FirebaseService.createLyricsListener((data) => {
      lyricStore.$patch(data)
    })

    onUnmounted(() => {
      unsubscribe()
    })

    return {
      slides,
      activeSlideIndex,
      importLyricsButton,
      lyricStore,
    }
  },

  mounted() {
    FirebaseService.getLyricsData().then((payload) => {
      this.lyricStore.$patch(payload)
    })
  },

  methods: {
    async onImportLyrics() {
      try {
        const files = this.importLyricsButton?.getFiles() || []
        const slides: string[] = []

        for (let file of files) {
          const text = await FileService.readFileAsText(file)
          const json = JSON.parse(text)

          if (json instanceof Array) {
            slides.push(...json)
          }
        }
        this.slides.push(...slides)
        this.syncLyricsData()
      } catch (e) {
        alert(e)
      } finally {
        this.importLyricsButton?.resetFiles()
      }
    },

    resetLyrics() {
      this.slides = []
      this.syncLyricsData()
    },

    setActiveSlide(i: number) {
      this.activeSlideIndex = i
      this.syncLyricsData()
    },

    syncLyricsData() {
      FirebaseService.updateLyricsData(this.lyricStore.$state)
    },
  },
})
</script>

<style lang="scss">
.lyric-selector {
  @apply flex flex-col w-full rounded overflow-hidden;

  max-height: 20rem;
  overflow-y: auto;

  .slide {
    @apply w-full p-2 text-3 bg-gray-600 cursor-pointer;

    &:hover {
      background-color: #3b3b3b;
    }

    &.active {
      @apply text-warning;

      background-color: #3b3b3b;
    }
  }
}
</style>
