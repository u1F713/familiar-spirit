import {globalStyle} from '@vanilla-extract/css'

globalStyle('*, :after, :before', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box'
})

globalStyle(':root', {
  color: 'white',
  fontFamily: 'system-ui',
  fontVariantNumeric: 'tabular-nums lining-nums',
  colorScheme: 'dark light'
})

globalStyle('body', {
  color: 'white',
  fontFamily: 'system-ui',
  minHeight: '100dvh',
  fontVariantNumeric: 'tabular-nums lining-nums'
})
