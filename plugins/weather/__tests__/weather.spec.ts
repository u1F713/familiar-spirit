import {Effect} from 'effect'
import {afterEach, describe, expect, test, vi} from 'vitest'
import {getForecast} from '../forecast-api.ts'
import {getGeocoding} from '../geocoding-api.ts'
import {
  forecastDummyData,
  geocodingDummyData,
  makeMockFetch
} from './mocks/api-response.ts'

describe('API response decode', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('get geocoding: Hyōgo', async () => {
    vi.stubGlobal('fetch', makeMockFetch(geocodingDummyData))
    const {latitude} = await Effect.runPromise(getGeocoding('Hyōgo'))

    expect(latitude).toBeDefined()
  })

  test('get forecast: Hyōgo', async () => {
    vi.stubGlobal('fetch', makeMockFetch(forecastDummyData))
    const {current} = await Effect.runPromise(getForecast(18.4719, -69.8923))

    expect(current.temperature_2m).toBeDefined()
  })
})
