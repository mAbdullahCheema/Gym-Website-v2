import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: 'Standard',
    price: '15K',
    period: '/mo',
    description: 'Full access to all equipment zones during open hours.',
    featured: false,
    features: [
      'Open Gym Access (Mon-Sat)',
      'All Standard Equipment Zones',
      'Locker Room & Showers',
      'Fitness Assessment (1x)',
    ],
  },
  {
    name: 'Performance',
    price: '25K',
    period: '/mo',
    description: 'Extended access with group coaching and recovery.',
    featured: true,
    features: [
      '24/7 Facility Access',
      'All Specialized Zones',
      '1 Group Session / Week',
      'Recovery Suite Access',
      'Nutrition Consultation',
    ],
  },
  {
    name: 'Apex',
    price: '45K',
    period: '/mo',
    description: 'Full-suite premium experience with dedicated coaching.',
    featured: false,
    features: [
      'Unlimited 24/7 Access',
      'Personalized Coaching Plan',
      'Bi-weekly Assessments',
      'Dedicated Locker & Kit',
      'Nutrition & Supplement Plan',
      'Priority Booking — All Events',
    ],
  },
]

export function Pricing() {
  const titleRef = useRef<HTMLDivElement>(null!)
  const sectionRef = useRef<HTMLElement>(null!)

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
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="pricing" className="py-section-gap-mobile md:py-section-gap bg-background relative" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-fixed/[0.01] to-transparent pointer-events-none" />

      <div
        ref={titleRef}
        className="max-w-container-max mx-auto px-gutter text-center mb-16"
      >
        <p className="section-label justify-center">
          Commitment Levels
        </p>
        <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-primary uppercase tracking-tight">
          Access <span className="text-primary-fixed">Tiers</span>
        </h2>
        <p className="font-body-lg text-body-lg text-gray-400 mt-4 max-w-xl mx-auto">
          Select your level of commitment. All tiers include a free women's
          membership with a male partner enrollment.
        </p>
        <div className="accent-bar mx-auto" />
      </div>

      <div className="max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-50px' }}
              className={`relative flex flex-col ${
                plan.featured
                  ? 'bg-surface-container border-2 border-primary-fixed p-8 md:-mt-4 shadow-[0_0_40px_rgba(210,240,0,0.08)]'
                  : 'glass-panel p-8 glow-card'
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-fixed text-on-primary font-label-mono text-[10px] px-4 py-1.5 uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(210,240,0,0.4)] whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <h3 className={`font-headline-md text-headline-md uppercase mb-1 ${plan.featured ? 'text-primary-fixed' : 'text-secondary'}`}>
                {plan.name}
              </h3>

              <p className="font-body-md text-body-md text-gray-400 mb-6">
                {plan.description}
              </p>

              <div className="flex items-end gap-1 mb-8">
                <span className="font-display-lg text-display-lg-mobile md:text-headline-xl text-primary font-bold">
                  {plan.price}
                </span>
                <span className="font-label-mono text-label-mono text-gray-500 mb-2">
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-4 mb-auto pb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 group">
                    <Check className={`w-5 h-5 mt-0.5 shrink-0 transition-colors ${plan.featured ? 'text-primary-fixed' : 'text-gray-400 group-hover:text-primary-fixed'}`} />
                    <span className={`font-body-md text-body-md ${plan.featured ? 'text-primary' : 'text-gray-400 group-hover:text-primary'} transition-colors`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/923326007700?text=Hi!%20I'm%20interested%20in%20the%20${plan.name}%20plan%20at%20THE%20GYM%20Islamabad.`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 text-center font-headline-md uppercase tracking-wider transition-all duration-300 inline-flex items-center justify-center gap-2 group ${
                  plan.featured
                    ? 'bg-primary-fixed text-on-primary hover:brightness-110 shadow-[0_0_20px_rgba(210,240,0,0.25)]'
                    : 'border border-white/10 text-primary hover:bg-white/5 hover:border-primary-fixed hover:text-primary-fixed hover:shadow-[0_0_15px_rgba(210,240,0,0.15)]'
                }`}
              >
                Join {plan.name}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="glass-panel inline-block px-10 py-8 max-w-lg mx-auto">
            <p className="font-label-mono text-label-mono text-primary-fixed uppercase tracking-widest mb-2">
              Limited-Time Offer
            </p>
            <p className="font-headline-md text-headline-md text-primary uppercase">
              Free Women's Membership
            </p>
            <p className="font-body-md text-body-md text-gray-400 mt-2">
              Join with your brother, husband, or friend and her membership is
              absolutely FREE. Empower your fitness journey together.
            </p>
            <a
              href="https://wa.me/923326007700?text=Hi!%20I'm%20interested%20in%20the%20Free%20Women's%20Membership%20offer%20at%20THE%20GYM%20Islamabad."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-3 mt-6 group"
            >
              Claim Offer
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
