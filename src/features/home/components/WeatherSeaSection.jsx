import WeatherCard from './WeatherCard'
import SeaCard from './SeaCard'

export default function WeatherSeaSection() {
  return (
    <section className="container-page relative z-20 -mt-8 pb-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <WeatherCard />
        <SeaCard />
      </div>
    </section>
  )
}
