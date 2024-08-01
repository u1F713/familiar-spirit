import type {Accessor} from 'solid-js'
import {createStore} from 'solid-js/store'

type TimeStorType = {
  format?: Accessor<Intl.DateTimeFormatOptions>
}

export const [timeStore, updateTimeStore] = createStore<TimeStorType>()
