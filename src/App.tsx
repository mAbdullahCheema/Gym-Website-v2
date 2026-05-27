import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Facility } from './components/Facility'
import { Coaching } from './components/Coaching'
import { Pricing } from './components/Pricing'
import { Community } from './components/Community'
import { Footer } from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReduced) {
      ScrollTrigger.config({})
    }
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Facility />
        <Coaching />
        <Community />
        <Pricing />
      </main>
      <Footer />
    </>
  )
}
