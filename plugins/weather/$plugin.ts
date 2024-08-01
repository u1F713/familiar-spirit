import {definePlugin} from '#utils/definePlugin'

export default definePlugin({
  configPanel: import('./WeatherConfig.tsx'),
  widgets: [import('./Weather.tsx')]
})
