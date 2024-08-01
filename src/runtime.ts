import {Context, Effect, Layer, ManagedRuntime} from 'effect'
import type {Plugin} from '#utils/definePlugin'

export class AppLive extends Context.Tag('@app')<
  AppLive,
  {readonly plugins: Effect.Effect<Plugin[]>}
>() {}

const getModules = () =>
  Effect.sync(
    () =>
      import.meta.glob('/plugins/**/$plugin.ts', {
        eager: true,
        import: 'default'
      }) as Record<string, Effect.Effect<Plugin>>
  )

export function makeRuntime() {
  const plugins = Effect.gen(function* () {
    const modules = yield* getModules()
    return yield* Effect.forEach(Object.values(modules), mod => mod)
  })

  const appLive = Layer.succeed(AppLive, AppLive.of({plugins}))
  const runtime = ManagedRuntime.make(appLive)

  return async <A, E>(runnable: Effect.Effect<A, E, AppLive>) => {
    const result = await runtime.runPromise(runnable)
    await runtime.dispose()

    return result
  }
}
