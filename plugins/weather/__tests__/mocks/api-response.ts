export const geocodingDummyData = {
  results: [
    {
      id: 2129969,
      name: 'Hyōgo',
      latitude: 43.36667,
      elevation: 78,
      timezone: 'Asia/Tokyo',
      country_code: 'JP',
      country: 'Japan',
      country_id: 1861060
    }
  ]
}

export const forecastDummyData = {
  latitude: 43.35,
  longitude: 144.4375,
  generationtime_ms: 0.007987022399902344,
  utc_offset_seconds: 0,
  timezone: 'GMT',
  timezone_abbreviation: 'GMT',
  elevation: 80,
  current_units: {
    time: 'iso8601',
    interval: 'seconds',
    temperature_2m: '°F'
  },
  current: {
    time: '2024-07-24T01:45',
    interval: 900,
    temperature_2m: 75.2
  }
}

export function makeMockFetch<T>(data: T) {
  return () =>
    Promise.resolve({
      json: async () => data
    })
}
