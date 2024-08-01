import {Effect, pipe} from 'effect'
import {type Component, lazy} from 'solid-js'

export type Plugin = {widgets: Component[]; Config: Component}

export const definePlugin = ({
  widgets,
  configPanel
}: {
  widgets: Promise<{default: Component}>[]
  configPanel: Promise<{default: Component}>
}) =>
  pipe(
    Effect.forEach(widgets, widgets => Effect.succeed(lazy(() => widgets)), {
      concurrency: 'unbounded'
    }),
    Effect.map(widgets => ({widgets, Config: lazy(() => configPanel)}))
  )
