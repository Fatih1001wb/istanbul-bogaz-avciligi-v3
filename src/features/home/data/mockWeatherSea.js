export const mockWeather = {
  location: 'İstanbul Boğazı',
  temperature: 18,
  condition: 'Parçalı bulutlu',
  windSpeed: 12,
  windDirection: 'KB',
  humidity: 65,
  updatedAt: new Date(Date.now() - 15 * 60000).toISOString(),
}

export const mockSea = {
  waveHeight: 0.4,
  waterTemp: 16,
  current: 'Hafif akıntı',
  tide: 'Gelgit yükseliyor',
  fishingIndex: 'İyi',
  fishingIndexVariant: 'success',
}
