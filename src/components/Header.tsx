import { useEffect, useRef, useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navItems = [
  { href: '#facility', label: 'Facility' },
  { href: '#coaching', label: 'Coaching' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#community', label: 'Community' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null!)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!headerRef.current) return
    gsap.fromTo(headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
    )
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'top-3 left-3 right-3 mx-auto max-w-7xl rounded-2xl glass-panel shadow-2xl shadow-black/30'
            : 'bg-transparent'
        }`}
      >
        <div className={`flex justify-between items-center px-6 md:px-8 transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-5 max-w-container-max mx-auto'
        }`}>
          <a
            href="#"
            className="font-display-lg text-headline-md font-bold text-primary tracking-tighter hover:text-primary-fixed transition-colors"
          >
            <span className="text-primary-fixed">THE</span> GYM
            <span className="hidden md:inline text-on-tertiary-container text-body-md font-body-md ml-2 tracking-normal lowercase">
              Islamabad
            </span>
          </a>

          <nav className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-label-mono text-label-mono uppercase tracking-widest text-secondary hover:text-primary transition-colors nav-link"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:03326007700"
              className="font-label-mono text-label-mono text-secondary hover:text-primary-fixed transition-colors flex items-center gap-2"
              title="Call us"
            >
              <Phone className="w-3.5 h-3.5" />
              0332-6007700
            </a>
            <a
              href="#join"
              className="bg-primary-fixed text-on-primary font-label-mono text-label-mono uppercase tracking-widest px-5 py-2.5 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(210,240,0,0.15)] hover:shadow-[0_0_30px_rgba(210,240,0,0.3)]"
            >
              Join Now
            </a>
          </div>

          <button
            className="md:hidden text-primary p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-2xl" />
        <div className="relative z-10 flex justify-end p-6">
          <button
            className="text-primary p-2 hover:text-primary-fixed transition-colors"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="relative z-10 flex flex-col items-center justify-center h-[60vh] gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-headline-xl text-headline-xl-mobile text-primary uppercase tracking-tight hover:text-primary-fixed transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#join"
            onClick={() => setMobileOpen(false)}
            className="btn-primary mt-8"
          >
            Join Now
          </a>
        </nav>
        <div className="relative z-10 absolute bottom-12 left-0 w-full text-center">
          <a
            href="tel:03326007700"
            className="font-label-mono text-label-mono text-secondary hover:text-primary-fixed transition-colors inline-flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            0332-6007700
          </a>
        </div>
      </div>
    </>
  )
}
