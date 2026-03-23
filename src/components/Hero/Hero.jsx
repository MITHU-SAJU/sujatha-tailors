/**
 * Hero Section — Fullscreen animated hero with parallax orbs, Framer Motion entrance
 */
import { motion } from 'framer-motion'
import { FaPhoneAlt, FaWhatsapp, FaStar } from 'react-icons/fa'
import heroImg from '../../assets/images/hero-tailor.jpg'
import './Hero.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0 },
}
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

export default function Hero() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/918524822544?text=Hi! I would like to book a tailoring appointment.', '_blank')
  }

  return (
    <section id="hero" className="hero-section">
      {/* Decorative elements */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
      <div className="hero-pattern" />
      <div className="hero-accent-line" />

      <div className="container hero-content">
        <div className="row align-items-center">

          {/* Left: Text Content */}
          <div className="col-lg-6 col-md-12">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="d-flex flex-column"
            >
              {/* Eyebrow */}
              <motion.div variants={fadeUp} className="hero-eyebrow">
                Premium Tailoring Since 2010
              </motion.div>

              {/* Heading */}
              <motion.h1 variants={fadeUp} className="hero-title">
                15+ Years of
                <br />
                <span className="gold-word">Perfect</span>{' '}
                <span className="italic-word">Tailoring</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p variants={fadeUp} className="hero-subtitle">
                Custom Blouse Stitching
                <span className="pipe">|</span>
                Saree Styling
                <span className="pipe">|</span>
                Alterations
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={fadeUp} className="hero-cta-group">
                <a href="tel:+918524822544" className="hero-btn-primary">
                  <FaPhoneAlt size={15} /> Call Now
                </a>
                <button onClick={handleWhatsApp} className="hero-btn-secondary">
                  <FaWhatsapp size={18} /> WhatsApp Us
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeUp} className="hero-stats">
                {[
                  { num: '15+', label: 'Years Experience' },
                  { num: '100+', label: 'Happy Customers' },
                  { num: '500+', label: 'Blouses Stitched' },
                  { num: '100%', label: 'Fit Guarantee' },
                ].map((stat) => (
                  <div key={stat.label} className="hero-stat-item">
                    <div className="hero-stat-num">{stat.num}</div>
                    <div className="hero-stat-label">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Visual */}
          <div className="col-lg-6 d-none d-lg-flex justify-content-center">
            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.95, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            >
              {/* Image frame */}
              <div className="hero-img-frame">
                <img src={heroImg} alt="Sujatha Tailors — Premium Blouse Stitching" loading="eager" />
              </div>

              {/* Floating badge — bottom left */}
              <motion.div
                className="hero-badge"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <span className="hero-badge-icon">⭐</span>
                <div className="hero-badge-text">
                  <strong>100+</strong>
                  <span>Happy Customers</span>
                </div>
              </motion.div>

              {/* Floating badge — top right */}
              <motion.div
                className="hero-badge-top"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <span>✨ Perfect Fit Guarantee</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <div className="hero-scroll-dot" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
