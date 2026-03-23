/**
 * Navbar Component — Floating island style nav with native smooth scroll + active section tracking
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Why Us', href: '#why-us' },
  // { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  // Glassmorphism trigger on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -60% 0px' }
    )
    sections.forEach((sec) => observer.observe(sec))
    return () => observer.disconnect()
  }, [])

  // Native smooth scroll — simple and reliable
  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 75
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      className={`navbar-custom w-100 ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="nav-container">
        {/* Brand - Left */}
        <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="navbar-brand-text">
          Sujatha Tailors
        </a>

        {/* Desktop nav - Center */}
        <div className="d-none d-lg-flex nav-menu-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link-custom ${active === link.href.slice(1) ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Action */}
        <div className="d-flex align-items-center gap-3">
          <a
            href="tel:+918524822544"
            className="nav-cta d-none d-sm-flex"
          >
            📞 Book Now
          </a>

          {/* Mobile hamburger */}
          <button
            className="navbar-toggler d-lg-none border-0 bg-transparent p-0"
            style={{ width: '30px', height: '30px' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="navbar-collapse-custom-island"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="d-flex flex-column gap-2 text-center">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`nav-link-custom ${active === link.href.slice(1) ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="tel:+918524822544"
                  className="nav-cta mt-2"
                  onClick={() => setMenuOpen(false)}
                >
                  📞 Book Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
