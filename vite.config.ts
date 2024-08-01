import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'
import devtools from 'solid-devtools/vite'
import solidPlugin from 'vite-plugin-solid'
import TSConfigPath from 'vite-tsconfig-paths'
import {defineConfig} from 'vitest/config'

export default defineConfig({
  server: {port: 4443},
  test: {environment: 'jsdom'},
  plugins: [TSConfigPath(), vanillaExtractPlugin(), solidPlugin(), devtools()]
})
