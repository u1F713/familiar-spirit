import {Schema} from '@effect/schema'

const ForecastData = Schema.Struct({
  latitude: Schema.Number,
  longitude: Schema.Number,
  timezone_abbreviation: Schema.String,
  current_units: Schema.Struct({
    time: Schema.String,
    interval: Schema.String,
    temperature_2m: Schema.String
  }),
  current: Schema.Struct({
    time: Schema.String,
    interval: Schema.Number,
    temperature_2m: Schema.Number
  })
})

export type ForecastData = typeof ForecastData.Type
export const decodeForecastData = Schema.decode(ForecastData)
