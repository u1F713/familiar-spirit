import {type Component, type JSX, createSignal, onMount} from 'solid-js'
import {setStore} from '~/store.ts'
import {opfsGetFileHandleRec} from '~/file-system/opfs/fileHandle'
import {makeRuntime} from '~/runtime'

type InputEventHandler = JSX.EventHandler<HTMLInputElement, InputEvent>

const BackgroundConfig: Component = () => {
  const [fileHandle, setFileHandle] = createSignal<FileSystemFileHandle>()
  const runtime = makeRuntime()
  const task = opfsGetFileHandleRec({
    relativePath: 'Backgrounds/wallpaper',
    create: true
  })

  onMount(() => {
    runtime(task).then(setFileHandle)
  })

  const inputBackgroundEvent: InputEventHandler = event => {
    if (event.currentTarget.files != null) {
      const [file] = event.currentTarget.files

      void (async () => {
        const writtable = await fileHandle()?.createWritable()
        await writtable?.write(file)
        await writtable?.close()
        setStore({backgroundFile: file})
      })()
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onInput={inputBackgroundEvent} />
    </div>
  )
}

export default BackgroundConfig
