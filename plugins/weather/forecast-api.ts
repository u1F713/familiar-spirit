import {Effect, pipe} from 'effect'
import {decodeForecastData} from './schemas/forecast-schema.ts'

export const getForecast = (latitude: number, longitude: number) =>
  pipe(
    Effect.tryPromise(() =>
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
      ).then(res => res.json())
    ),
    Effect.andThen(decodeForecastData)
  )
