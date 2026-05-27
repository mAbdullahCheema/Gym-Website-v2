import { useEffect, useRef, lazy, Suspense } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, ArrowRight } from 'lucide-react'

const SplineScene = lazy(() => import('./SplineScene'))

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null!)
  const taglineRef = useRef<HTMLParagraphElement>(null!)
  const titleRef = useRef<HTMLHeadingElement>(null!)
  const subtitleRef = useRef<HTMLParagraphElement>(null!)
  const ctaRef = useRef<HTMLDivElement>(null!)
  const statsRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        delay: 0.2,
      })

      tl.fromTo(taglineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
      .fromTo(titleRef.current,
        { y: 80, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 1 },
        '-=0.3'
      )
      .fromTo(subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      )
      .fromTo(statsRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.2'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-dvh flex items-center overflow-hidden bg-background"
    >
      <div className="absolute z-0 w-[45%] h-[70%] right-0 top-1/2 -translate-y-1/2">
        <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
          <SplineScene />
        </Suspense>
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background via-background/95 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-container-max mx-auto px-gutter w-full pt-32 pb-24">
        <div className="max-w-3xl">
          <p
            ref={taglineRef}
            className="font-label-mono text-label-mono text-primary-fixed uppercase tracking-[0.25em] flex items-center gap-3"
          >
            <span className="w-10 h-[1px] bg-primary-fixed inline-block" />
            Blue Area, Islamabad
          </p>

          <h1
            ref={titleRef}
            className="font-display-xl text-display-xl-mobile md:text-display-xl lg:text-display-xl uppercase leading-[0.9] tracking-tight mt-6"
          >
            <span className="text-white">Industrial</span>
            <br />
            <span className="text-primary-fixed">Precision.</span>
            <br />
            <span className="text-white/80">Elite Performance.</span>
          </h1>

          <p
            ref={subtitleRef}
            className="font-body-lg text-body-lg text-gray-400 max-w-xl leading-relaxed mt-6"
          >
            Heavy-duty equipment meets elite coaching at Islamabad's premier
            black-box training facility in Beverly Centre, Blue Area.
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <a href="#join" className="btn-primary inline-flex items-center gap-3 text-center justify-center group">
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#facility" className="btn-secondary text-center">
              Explore Facility
            </a>
          </div>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-3 gap-8 mt-20 md:mt-28 max-w-lg"
        >
          {[
            { value: '10+', label: 'Years Strong' },
            { value: '2.6K+', label: 'Strong Members' },
            { value: '24/7', label: 'Dedicated Support' },
          ].map((stat) => (
            <div key={stat.label} className="relative">
              <p className="font-display-lg text-headline-xl md:text-display-lg text-primary-fixed font-bold">
                {stat.value}
              </p>
              <p className="font-label-mono text-label-mono text-gray-500 uppercase tracking-widest mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="w-5 h-5 text-primary-fixed/40" />
      </div>
    </section>
  )
}
