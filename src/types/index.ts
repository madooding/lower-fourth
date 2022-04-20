export interface IMainState {
  enable: boolean
}

export interface ICountdownState extends IMainState {
  datetime: Date | null
}

export interface ILyricsState extends IMainState {
  slides: string[]
  activeSlideIndex: number | null
}

export interface IBarState extends IMainState {
  text: string
  alignment: 'left' | 'center' | 'right'
}
