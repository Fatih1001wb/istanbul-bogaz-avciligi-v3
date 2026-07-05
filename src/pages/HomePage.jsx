import HeroSection from '../features/home/components/HeroSection'
import WeatherSeaSection from '../features/home/components/WeatherSeaSection'
import FishSpeciesSection from '../features/home/components/FishSpeciesSection'
import CommunityPreviewSection from '../features/home/components/CommunityPreviewSection'

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <WeatherSeaSection />
      <FishSpeciesSection />
      <CommunityPreviewSection />
    </div>
  )
}
