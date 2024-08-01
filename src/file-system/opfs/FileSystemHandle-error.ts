import {Data} from 'effect'

export default class FileSystemHandleError extends Data.TaggedError(
  'GetFileHandleError'
)<{
  name: string
  parentDirectory: FileSystemDirectoryHandle
}> {}
