import {definePlugin} from '#utils/definePlugin.ts'

export default definePlugin({
  configPanel: import('./TimeConfig.tsx'),
  widgets: [import('./Time.tsx')]
})
