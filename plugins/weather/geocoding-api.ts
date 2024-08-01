import {Effect, pipe} from 'effect'
import {decodeGeocodingData} from './schemas/geocoding-schema.ts'

export const getGeocoding = (name: string) =>
  pipe(
    Effect.tryPromise(() =>
      fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1`
      )
        .then(response => response.json())
        .then(({results}) => results[0])
    ),
    Effect.andThen(decodeGeocodingData)
  )
