import {Schema} from '@effect/schema'

export const GeocodingData = Schema.Struct({
  id: Schema.Number,
  name: Schema.String,
  latitude: Schema.Number,
  elevation: Schema.Number,
  timezone: Schema.String,
  country_code: Schema.String,
  country: Schema.String,
  country_id: Schema.Number
})
export type GeocodingData = typeof GeocodingData.Type
export const decodeGeocodingData = Schema.decode(GeocodingData)
