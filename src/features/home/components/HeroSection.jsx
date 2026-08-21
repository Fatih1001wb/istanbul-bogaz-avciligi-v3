import { Link } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import Badge from '../../../components/ui/Badge'
import MaviRotaWordmark from '../../../components/brand/MaviRotaWordmark'
import { APP_TAGLINE, APP_DESCRIPTION } from '../../../utils/constants'
import { mockSea } from '../data/mockWeatherSea'

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-[28rem] overflow-hidden bg-mavirota-deep text-white sm:min-h-[32rem]">
      <div className="absolute inset-0 bg-gradient-to-br from-mavirota-deep via-brand-950 to-sea-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.12)_0%,_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(13,115,119,0.15)_0%,_transparent_50%)]" />
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-sea/20 blur-3xl" />

      <div className="container-page relative z-10 flex flex-col justify-center py-20 sm:py-28">
        <MaviRotaWordmark className="mb-6" />

        <Badge variant="info" className="mb-5 w-fit bg-white/10 text-brand-200 ring-white/15">
          Bugün av koşulları: {mockSea.fishingIndex}
        </Badge>

        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {APP_TAGLINE}
        </h1>

        <p className="mt-5 max-w-xl text-lg text-slate-300">
          {APP_DESCRIPTION}
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/balik-rehberi">
            <Button
              size="lg"
              className="bg-brand-500 shadow-lg shadow-brand-500/25 hover:bg-brand-400"
            >
              Balık Rehberini Keşfet
            </Button>
          </Link>
          <Link to="/av-noktalari">
            <Button
              size="lg"
              variant="outline"
              className="border-white/25 text-white hover:bg-white/10"
            >
              Av Noktalarını Gör
            </Button>
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
        <svg
          viewBox="0 0 1440 56"
          fill="none"
          className="block w-full"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0,32 C360,56 720,8 1080,32 C1260,44 1350,40 1440,32 L1440,56 L0,56 Z"
            className="fill-slate-950"
          />
        </svg>
      </div>
    </section>
  )
}
