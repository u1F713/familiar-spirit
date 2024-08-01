import {type Component, For} from 'solid-js'
import {store} from '~/store.ts'
import BackgroundConfig from '~/background/BackgroundConfig.tsx'
import * as styles from './ConfigPanel.css.ts'

const ConfigPanel: Component = () => {
  return (
    <aside class={styles.panelWrapper}>
      config panel
      <BackgroundConfig />
      <For each={store.plugins?.()}>{({Config}) => <Config />}</For>
    </aside>
  )
}

export default ConfigPanel
