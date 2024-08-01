import {type Component, Show, createSignal, onCleanup} from 'solid-js'
import {timeStore} from './time-store.ts'

const Time: Component = () => {
  const [time, setTime] = createSignal<number>(Date.now())
  const [formater] = createSignal<Intl.DateTimeFormat>(
    Intl.DateTimeFormat(navigator.language, {
      hour: timeStore.format?.().hour ?? '2-digit',
      minute: '2-digit',
      second: 'numeric'
    })
  )
  const timeInterval = setInterval(() => setTime(Date.now()), 400)

  onCleanup(() => {
    clearInterval(timeInterval)
  })

  return (
    <Show when={formater()}>
      {formater => (
        <div>
          <b>{formater().format(time())}</b>
        </div>
      )}
    </Show>
  )
}

export default Time
