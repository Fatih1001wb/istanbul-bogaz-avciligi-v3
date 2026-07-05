import { Link } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import Badge from '../../../components/ui/Badge'
import { mockSea } from '../data/mockWeatherSea'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-sea-dark text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.08)_0%,_transparent_60%)]" />
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-sea/20 blur-3xl" />

      <div className="container-page relative py-16 sm:py-24">
        <div className="max-w-2xl">
          <Badge variant="info" className="mb-4 bg-white/15 text-white ring-white/20">
            Bugün av koşulları: {mockSea.fishingIndex}
          </Badge>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            İstanbul Boğazı&apos;nın <br /> Balıkçılık Rehberi
          </h1>
          <p className="mt-4 text-lg text-brand-100">
            Balık türlerinden av kurallarına, hava durumundan en iyi av noktalarına
            kadar her şey tek bir platformda.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/balik-rehberi">
              <Button size="lg" variant="secondary">
                Balık Rehberini Keşfet
              </Button>
            </Link>
            <Link to="/kayit">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10"
              >
                Topluluğa Katıl
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="text-sea-light">
        <svg viewBox="0 0 1440 48" fill="currentColor" className="block w-full" preserveAspectRatio="none">
          <path d="M0,24 C240,48 480,0 720,24 C960,48 1200,0 1440,24 L1440,48 L0,48 Z" className="fill-slate-50 dark:fill-slate-950" />
        </svg>
      </div>
    </section>
  )
}
