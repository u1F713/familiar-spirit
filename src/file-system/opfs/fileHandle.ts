import {Effect, pipe} from 'effect'
import FileSystemHandleError from './FileSystemHandle-error.ts'
import {opfsGetDirectoryHandleRec} from './directoryHandle.ts'

export const opfsGetFileHandle = (
  name: string,
  parentDirectory: FileSystemDirectoryHandle,
  create?: boolean
) =>
  pipe(
    Effect.tryPromise({
      try: () => parentDirectory.getFileHandle(name, {create}),
      catch: () => new FileSystemHandleError({parentDirectory, name})
    })
  )

export type OpfsGetFileHandleRec = {
  relativePath: string
  create?: boolean
}

export const opfsGetFileHandleRec = (args: OpfsGetFileHandleRec) =>
  Effect.gen(function* () {
    const [directoryPath, filename] = yield* Effect.sync(() => {
      const relativePath = args.relativePath.split('/').filter(p => p !== '')

      return [
        relativePath.slice(0, relativePath.length - 1),
        relativePath.slice(-1)[0]
      ] as const
    })
    const opfsRoot = yield* Effect.tryPromise(() =>
      navigator.storage.getDirectory()
    )
    const directoryHandle = yield* opfsGetDirectoryHandleRec(
      directoryPath,
      opfsRoot,
      args.create
    )

    return yield* opfsGetFileHandle(filename, directoryHandle, args.create)
  })
