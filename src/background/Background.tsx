import {Effect} from 'effect'
import {type Component, Show, onMount} from 'solid-js'
import {setStore, store} from '~/store.ts'
import {opfsGetFileHandleRec} from '~/file-system/opfs/fileHandle.ts'
import * as styles from './Background.css.ts'

const Background: Component = () => {
  const task = Effect.gen(function* () {
    const fileHandle = yield* opfsGetFileHandleRec({
      relativePath: 'Backgrounds/wallpaper'
    })
    setStore({
      backgroundFile: yield* Effect.promise(() => fileHandle.getFile())
    })
  })

  onMount(async () => {
    await Effect.runPromise(task)
  })

  return (
    <div>
      <Show when={store.backgroundFile}>
        {file => (
          <img
            class={styles.background}
            src={URL.createObjectURL(file())}
            alt={file.name}
            draggable="false"
          />
        )}
      </Show>
    </div>
  )
}

export default Background
