import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Target, Brain, Heart, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const coachingPoints = [
  { text: 'Biomechanical Analysis & Movement Screening', icon: Target },
  { text: 'Periodized Programming for Strength & Hypertrophy', icon: Brain },
  { text: 'Nutritional Architecture & Supplement Strategy', icon: Heart },
]

const coaches = [
  {
    name: 'Z. Khan',
    role: 'Head Coach',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=2070&auto=format&fit=crop',
    bio: '15+ years. Former national-level powerlifter. Specializes in strength programming and movement mechanics.',
  },
  {
    name: 'A. Hussain',
    role: 'Performance Coach',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop',
    bio: 'Certified S&C coach. Expert in athletic development, mobility, and injury prevention protocols.',
  },
  {
    name: 'S. Ali',
    role: 'Nutrition Lead',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=2070&auto=format&fit=crop',
    bio: 'Clinical nutritionist. Designs personalized meal plans and supplementation protocols for optimal performance.',
  },
]

export function Coaching() {
  const sectionRef = useRef<HTMLElement>(null!)
  const titleRef = useRef<HTMLDivElement>(null!)
  const listRef = useRef<HTMLUListElement>(null!)
  const cardsRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      if (listRef.current) {
        gsap.fromTo(listRef.current.children,
          { x: -40, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      gsap.fromTo(cardsRef.current?.children || [],
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="coaching" className="py-section-gap-mobile md:py-section-gap relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-surface-container-low" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-fixed/[0.03] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-container-max mx-auto px-gutter relative z-10">
        <div ref={titleRef} className="mb-16">
          <p className="section-label">
            Expert Guidance
          </p>
          <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-primary uppercase tracking-tight">
            Elite <span className="text-primary-fixed">Coaching</span>
          </h2>
          <div className="accent-bar" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div>
            <p className="font-body-lg text-body-lg text-gray-400 mb-8 leading-relaxed">
              Our coaches are not cheerleaders — they are architects of human
              performance. With backgrounds in elite athletics and tactical
              training, they design rigorous, data-driven programs tailored to
              forge unyielding resilience and physical dominance.
            </p>

            <ul ref={listRef} className="space-y-5 mb-10">
              {coachingPoints.map((item) => (
                <li key={item.text} className="flex items-center gap-4 group">
                  <span className="w-10 h-10 rounded-sm bg-primary-fixed/10 flex items-center justify-center group-hover:bg-primary-fixed/20 group-hover:scale-110 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-primary-fixed" />
                  </span>
                  <span className="font-label-mono text-label-mono text-primary uppercase tracking-wider group-hover:text-primary-fixed transition-colors">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>

            <a href="#join" className="btn-primary inline-flex items-center gap-3 group">
              Book a Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 border border-primary-fixed/10" />
            <img
              src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2070&auto=format&fit=crop"
              alt="Training at The Gym Islamabad"
              className="relative z-10 w-full h-[500px] lg:h-full object-cover grayscale contrast-125"
            />
          </div>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {coaches.map((coach) => (
            <div
              key={coach.name}
              className="group glass-panel glass-panel-hover overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <p className="font-label-mono text-[10px] text-primary-fixed uppercase tracking-widest mb-1">
                  {coach.role}
                </p>
                <h3 className="font-headline-md text-headline-md text-primary uppercase mb-2">
                  {coach.name}
                </h3>
                <p className="font-body-md text-body-md text-gray-400">
                  {coach.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
