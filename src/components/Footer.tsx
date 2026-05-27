import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Phone, Clock, Instagram, Facebook, MessageCircle, ArrowUp } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const quickLinks = [
  { href: '#facility', label: 'Facility' },
  { href: '#coaching', label: 'Coaching' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#community', label: 'Community' },
]

const contactInfo = [
  { icon: MapPin, text: '1st Floor, Beverly Centre, Jinnah Avenue, Blue Area, Islamabad', href: 'https://maps.google.com/?q=Beverly+Centre+Blue+Area+Islamabad' },
  { icon: Phone, text: '0332-6007700', href: 'tel:03326007700' },
  { icon: Phone, text: '051-8895861', href: 'tel:0518895861' },
  { icon: Clock, text: 'Mon — Sat: 6:30 AM — 10:00 PM', href: undefined },
]

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/thegymisb/', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/TheGymIsb/', label: 'Facebook' },
  { icon: MessageCircle, href: 'https://wa.me/923326007700', label: 'WhatsApp' },
]

export function Footer() {
  const footerRef = useRef<HTMLElement>(null!)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, footerRef)
    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={footerRef} className="relative border-t border-white/5">
      <div className="absolute inset-0 bg-surface-container-lowest" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-fixed/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-container-max mx-auto px-gutter py-section-gap-mobile md:py-section-gap relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4">
            <span className="font-display-lg text-headline-md text-primary uppercase font-bold tracking-tighter">
              <span className="text-primary-fixed">THE</span> GYM
            </span>
            <p className="font-body-md text-body-md text-gray-500 mt-4 max-w-sm leading-relaxed">
              Industrial precision meets elite performance. Islamabad's premier
              black-box training facility located in Beverly Centre, Blue Area.
            </p>

            <div className="flex gap-4 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg glass-panel flex items-center justify-center text-gray-400 hover:text-primary-fixed hover:border-primary-fixed/30 transition-all duration-300 hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-label-mono text-label-mono text-primary-fixed uppercase tracking-widest mb-6">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body-md text-body-md text-gray-500 hover:text-primary-fixed hover:translate-x-1.5 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="md:col-span-5">
            <h4 className="font-label-mono text-label-mono text-primary-fixed uppercase tracking-widest mb-6">
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              {contactInfo.map((item) => (
                item.href ? (
                  <a
                    key={item.text}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 group"
                  >
                    <item.icon className="w-4 h-4 text-primary-fixed/60 group-hover:text-primary-fixed transition-colors shrink-0" />
                    <span className="font-body-md text-body-md text-gray-500 group-hover:text-primary transition-colors">
                      {item.text}
                    </span>
                  </a>
                ) : (
                  <div key={item.text} className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-primary-fixed/60 shrink-0" />
                    <span className="font-body-md text-body-md text-gray-500">
                      {item.text}
                    </span>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body-md text-body-md text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} THE GYM Islamabad. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="font-label-mono text-[10px] text-gray-600 uppercase tracking-widest">
              Industrial Precision. Elite Performance.
            </p>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-lg glass-panel flex items-center justify-center text-gray-400 hover:text-primary-fixed hover:border-primary-fixed/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
