import {Effect} from 'effect'
import {type Component, For, createSignal, onMount} from 'solid-js'
import type {Plugin} from '#utils/definePlugin.ts'
import Background from './background/Background.tsx'
import ConfigPanel from './config/ConfigPanel.tsx'
import {AppLive, makeRuntime} from './runtime.ts'
import * as styles from './styles/app.css.ts'
import './styles/global.css.ts'

export const App: Component = () => {
  const [plugins, setPlugins] = createSignal<Plugin[]>()

  onMount(async () => {
    const runtime = makeRuntime()

    await runtime(
      Effect.gen(function* () {
        const appLive = yield* AppLive
        setPlugins(yield* appLive.plugins)
      })
    )
  })

  return (
    <div class={styles.layout}>
      <Background />
      <ConfigPanel />

      <For each={plugins()?.flatMap(({widgets}) => widgets)}>
        {Widget => <Widget />}
      </For>
    </div>
  )
}
