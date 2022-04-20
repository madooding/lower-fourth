import BaseService from './Base'
import { set, ref, get, child, onValue } from 'firebase/database'

import type { Unsubscribe } from 'firebase/database'
import type { IBarState, ICountdownState, ILyricsState, IMainState } from '@/types'
import { parse } from 'date-fns'

export default class FirebaseService extends BaseService {
  static createMainListener(cb: (date: IMainState) => void): Unsubscribe {
    const dbRef = ref(this.database, 'main')
    const unsubscribe = onValue(dbRef, (snapshot) => {
      cb(snapshot.val())
    })

    return unsubscribe
  }

  static createLyricsListener(cb: (data: ILyricsState) => void): Unsubscribe {
    const dbRef = ref(this.database, 'lyrics')
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      cb({
        slides: [],
        ...data,
      })
    })

    return unsubscribe
  }

  static createCountdownListener(cb: (data: ICountdownState) => void): Unsubscribe {
    const dbRef = ref(this.database, 'countdown')
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      cb({
        enable: false,
        ...data,
        datetime: data.datetime ? new Date(data.datetime) : null,
      })
    })

    return unsubscribe
  }

  static createBarListener(cb: (data: IBarState) => void): Unsubscribe {
    const dbRef = ref(this.database, 'bar')
    const unsubscribe = onValue(dbRef, (snapshot) => {
      cb(snapshot.val())
    })

    return unsubscribe
  }

  static updateMainData(data: IMainState) {
    set(ref(this.database, 'main'), data)
  }

  static updateLyricsData(data: ILyricsState) {
    const db = this.database
    set(ref(db, 'lyrics'), data)
  }

  static updateCountdownData(data: ICountdownState) {
    const db = this.database
    set(ref(db, 'countdown'), {
      ...data,
      datetime: data.datetime?.toISOString(),
    })
  }

  static updateBarData(data: IBarState) {
    const db = this.database
    set(ref(db, 'bar'), data)
  }

  static getMainData(): Promise<IMainState> {
    const dbRef = ref(this.database)
    return get(child(dbRef, 'main')).then((snapshot) => {
      if (snapshot.exists()) return snapshot.val()
      else {
        const val: IMainState = {
          enable: false,
        }
        this.updateMainData(val)
        return val
      }
    })
  }

  static getLyricsData(): Promise<ILyricsState> {
    const dbRef = ref(this.database)
    return get(child(dbRef, 'lyrics')).then((snapshot) => {
      if (snapshot.exists()) return snapshot.val()
      else {
        const val: ILyricsState = {
          enable: false,
          slides: [],
          activeSlideIndex: null,
        }
        this.updateLyricsData(val)
        return val
      }
    })
  }

  static getCountdownData(): Promise<ICountdownState> {
    const dbRef = ref(this.database)
    return get(child(dbRef, 'countdown')).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        return {
          ...data,
          datetime: data.datetime ? new Date(data.datetime) : null,
        }
      } else {
        const val: ICountdownState = {
          enable: false,
          datetime: null,
        }
        this.updateCountdownData(val)
        return val
      }
    })
  }

  static getBarData(): Promise<IBarState> {
    const dbRef = ref(this.database)
    return get(child(dbRef, 'bar')).then((snapshot) => {
      if (snapshot.exists()) return snapshot.val()
      else {
        const val: IBarState = {
          enable: false,
          text: '',
          alignment: 'left',
        }

        this.updateBarData(val)
        return val
      }
    })
  }
}
