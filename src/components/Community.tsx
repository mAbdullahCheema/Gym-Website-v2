import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Users, Trophy, Flame, ShieldCheck, Instagram, Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: Users, value: '2,600+', label: 'Community Members' },
  { icon: Trophy, value: '10+', label: 'Years of Legacy' },
  { icon: Flame, value: '1,000+', label: 'Transformations' },
  { icon: ShieldCheck, value: '99%', label: 'Member Satisfaction' },
]

const testimonials = [
  {
    quote: "THE GYM isn't just a place to lift — it's a brotherhood. The coaches here rebuilt my form from the ground up. Results speak for themselves.",
    author: '— A. Khan',
    role: 'Performance Member',
  },
  {
    quote: "After trying a dozen gyms in Islamabad, this is the only one that felt serious. No nonsense, just heavy lifts and real progress.",
    author: '— U. Shah',
    role: 'Apex Member',
  },
  {
    quote: "The free women's program is a game-changer. I train with my brother, and the support from the coaches has been incredible.",
    author: '— F. Ahmed',
    role: 'Standard Member',
  },
]

export function Community() {
  const sectionRef = useRef<HTMLElement>(null!)
  const titleRef = useRef<HTMLDivElement>(null!)

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
    <section
      id="community"
      className="py-section-gap-mobile md:py-section-gap relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-surface-container-low -skew-y-3 origin-top-left z-0" />

      <div className="max-w-container-max mx-auto px-gutter relative z-10">
        <div ref={titleRef} className="mb-16">
          <p className="section-label">
            Tribe
          </p>
          <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-primary uppercase tracking-tight">
            The <span className="text-primary-fixed">Community</span>
          </h2>
          <div className="accent-bar" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-panel p-6 text-center group hover:border-primary-fixed/30 transition-all duration-500"
            >
              <stat.icon className="w-8 h-8 text-primary-fixed/60 group-hover:text-primary-fixed mx-auto mb-3 transition-colors" />
              <p className="font-display-lg text-headline-md md:text-headline-xl text-primary font-bold">
                {stat.value}
              </p>
              <p className="font-label-mono text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="glass-panel p-8 glow-card relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary-fixed/10" />
              <div className="mb-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-primary-fixed" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-body-md text-body-md text-gray-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <p className="font-label-mono text-label-mono text-primary uppercase tracking-wider">
                  {t.author}
                </p>
                <p className="font-body-md text-body-md text-primary-fixed/60 text-sm">
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <div className="glass-panel inline-block px-10 py-8">
            <a
              href="https://www.instagram.com/thegymisb/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 btn-primary"
            >
              <Instagram className="w-5 h-5" />
              Follow Us @thegymisb
            </a>
            <p className="font-body-md text-body-md text-gray-400 mt-4">
              262+ posts &bull; 2,600+ followers &bull; Join the tribe
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
