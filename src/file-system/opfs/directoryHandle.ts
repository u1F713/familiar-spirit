import {Effect, pipe} from 'effect'
import FileSystemHandleError from './FileSystemHandle-error'

type OpfsGetDirectoryHandleEffect = Effect.Effect<
  FileSystemDirectoryHandle,
  FileSystemHandleError
>

export const opfsGetDirectoryHandle = (
  name: string,
  parentDirectory: FileSystemDirectoryHandle,
  create?: boolean
): OpfsGetDirectoryHandleEffect =>
  pipe(
    Effect.tryPromise({
      try: () => parentDirectory.getDirectoryHandle(name, {create}),
      catch: () => new FileSystemHandleError({parentDirectory, name})
    })
  )

export const opfsGetDirectoryHandleRec = (
  relativePath: string[],
  currentDirectory: FileSystemDirectoryHandle,
  create?: boolean
): OpfsGetDirectoryHandleEffect =>
  pipe(
    Effect.if(relativePath.length > 0, {
      onTrue: () =>
        Effect.flatMap(
          opfsGetDirectoryHandle(relativePath[0], currentDirectory, create),
          directoryHandle =>
            opfsGetDirectoryHandleRec(
              relativePath.slice(1),
              directoryHandle,
              create
            )
        ),
      onFalse: () => Effect.succeed(currentDirectory)
    })
  )
