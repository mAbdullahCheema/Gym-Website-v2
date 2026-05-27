import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Dumbbell, Weight, Activity, Zap, Bone } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface FacilityCardProps {
  title: string
  description: string
  imageSrc?: string
  icon?: React.ReactNode
  className?: string
  index?: number
}

function FacilityCard({ title, description, imageSrc, icon, className = '', index = 0 }: FacilityCardProps) {
  const ref = useRef<HTMLDivElement>(null!)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 })
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg'])

  useEffect(() => {
    gsap.fromTo(ref.current,
      { y: 100, opacity: 0, rotateX: 5 },
      {
        y: 0, opacity: 1, rotateX: 0,
        duration: 1,
        delay: index * 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [index])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => { x.set(0); y.set(0) }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group overflow-hidden cursor-pointer shimmer glass-edge ${className}`}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="absolute inset-0 w-full h-full origin-center"
      >
        {imageSrc ? (
          <>
            <img
              src={imageSrc}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-surface-container via-surface to-surface-container transition-colors duration-700" />
        )}
      </motion.div>

      <motion.div
        style={{ rotateX, rotateY }}
        className={`relative z-10 flex flex-col justify-end h-full p-8 ${!imageSrc ? 'items-center justify-center text-center' : ''}`}
      >
        {icon && (
          <div className="mb-4 text-primary-fixed group-hover:scale-125 transition-transform duration-500">
            {icon}
          </div>
        )}
        <h3 className="font-headline-md text-headline-md text-primary uppercase mb-2 group-hover:text-primary-fixed transition-colors">
          {title}
        </h3>
        <p className="font-body-md text-body-md text-gray-400 max-w-md">
          {description}
        </p>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary-fixed to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  )
}

const facilities = [
  {
    title: 'Performance Zone',
    description: 'Custom-fabricated rigs, Olympic lifting platforms, and competition-grade power racks engineered for maximum output.',
    imageSrc: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    className: 'md:col-span-8 md:row-span-2 min-h-[500px]',
  },
  {
    title: 'Iron Core',
    description: 'Precision-calibrated free weights from 2.5kg to 100kg with dedicated deadlift platforms.',
    imageSrc: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
    className: 'md:col-span-4 min-h-[300px]',
  },
  {
    title: 'Cardio Command',
    description: 'State-of-the-art treadmills, assault bikes, rowers, and ski ergs with performance tracking.',
    className: 'md:col-span-4 min-h-[300px]',
    icon: <Activity className="w-12 h-12" />,
  },
  {
    title: 'Conditioning Track',
    description: '30m high-density turf for sprint, sled push, and agility ladder work. Timing gates included.',
    imageSrc: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop',
    className: 'md:col-span-5 min-h-[400px]',
  },
  {
    title: 'Recovery Suite',
    description: 'Cold plunge, compression therapy, and stretching zone for post-training recovery.',
    className: 'md:col-span-3 min-h-[400px]',
    icon: <Zap className="w-12 h-12" />,
  },
]

export function Facility() {
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
    <section id="facility" className="py-section-gap-mobile md:py-section-gap bg-background relative" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-primary-fixed/[0.02] via-transparent to-transparent pointer-events-none" />

      <div
        ref={titleRef}
        className="max-w-container-max mx-auto px-gutter mb-12"
      >
        <p className="section-label">
          Inside The Vault
        </p>
        <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-primary uppercase tracking-tight">
          The <span className="text-primary-fixed">Facility</span>
        </h2>
        <div className="accent-bar" />
      </div>

      <div className="max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {facilities.map((f, i) => (
            <FacilityCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
