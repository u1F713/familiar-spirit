import type {Accessor} from 'solid-js'
import {createStore} from 'solid-js/store'
import type {Plugin} from '#utils/definePlugin'

type AppContextType = {
  backgroundFile?: File
  plugins?: Accessor<Plugin[] | undefined>
}

export const [store, setStore] = createStore<AppContextType>()
