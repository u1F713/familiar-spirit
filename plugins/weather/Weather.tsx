import {Effect} from 'effect'
import {type Component, createSignal, onMount} from 'solid-js'
import {getForecast} from './forecast-api.ts'
import {getGeocoding} from './geocoding-api.ts'
import type {ForecastData} from './schemas/forecast-schema.ts'
import type {GeocodingData} from './schemas/geocoding-schema.ts'

const updateWeather = (countryName: string) =>
  Effect.gen(function* () {
    const geocoding = yield* getGeocoding(countryName)
    const forecast = yield* getForecast(geocoding.latitude, geocoding.latitude)

    return {geocoding, forecast}
  })

const Weather: Component = () => {
  const [geocoding, setGeocoding] = createSignal<GeocodingData>()
  const [forecast, setForecast] = createSignal<ForecastData>()

  onMount(async () => {
    const weather = await Effect.runPromise(updateWeather('Hyōgo'))

    setGeocoding(weather.geocoding)
    setForecast(weather.forecast)
  })

  return (
    <p>
      {geocoding()?.name} {forecast()?.current.temperature_2m}
    </p>
  )
}

export default Weather
