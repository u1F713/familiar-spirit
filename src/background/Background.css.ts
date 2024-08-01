import {style} from '@vanilla-extract/css'

export const background = style({
  position: 'absolute',
  objectFit: 'cover',
  filter: 'brightness(50%)',
  zIndex: '-9',
  top: '0',
  left: '0',
  height: '100%',
  width: '100%'
})
