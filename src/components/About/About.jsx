/**
 * About Section — Scroll-reveal split layout with stats and story
 */
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import aboutImg from '../../assets/images/about-tailor.jpg'
import './About.css'

const fadeLeft  = { hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0 } }
const fadeRight = { hidden: { opacity: 0, x:  30 }, show: { opacity: 1, x: 0 } }
const fadeUp    = { hidden: { opacity: 0, y:  25 }, show: { opacity: 1, y: 0 } }

const STATS = [
  { icon: '✂️', num: '15+', label: 'Years of Expertise' },
  { icon: '💛', num: '100+', label: 'Happy Customers' },
  { icon: '👗', num: '500+', label: 'Blouses Crafted' },
  { icon: '⭐', num: '5★',  label: 'Customer Rating' },
]

const VALUES = [
  'Precise Measurements', 'On-time Delivery', 'Quality Fabrics',
  'Custom Designs', 'Affordable Pricing', 'Trusted Service',
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="about-section section-padding" ref={ref}>
      <div className="container">
        <div className="row align-items-center g-5">

          {/* Image column */}
          <motion.div
            className="col-lg-5"
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="about-img-wrapper">
              <div className="about-img-outer">
                <img src={aboutImg} alt="Sujatha Tailors — Our Workshop" loading="lazy" />
              </div>
              {/* Experience floating badge */}
              <div className="about-experience-badge">
                <div className="big-num">15+</div>
                <div className="badge-label">Years Experience</div>
              </div>
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            className="col-lg-7"
            variants={fadeRight}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            <div className="about-content">
              <div className="section-tag">Our Story</div>
              <h2 className="section-title">Crafting Elegance, <br /><em>Stitch by Stitch</em></h2>
              <div className="gold-divider left mb-4" />

              <p className="about-story">
                Welcome to <strong>Sujatha Tailors</strong> — where every thread tells a story.
                With over 15 years of passion and precision, we have been transforming fabric
                into works of art worn close to the heart. Our specialty lies in custom women's
                blouse stitching, saree fall & pico, and expert alterations.
              </p>
              <p className="about-story">
                Every client who walks through our doors receives undivided attention,
                precise measurements, and the promise that their garment will fit
                <em> perfectly</em> — because you deserve nothing less.
              </p>

              {/* Stats grid */}
              <div className="about-stats">
                {STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    className="about-stat-card"
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? 'show' : 'hidden'}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  >
                    <span className="stat-icon">{s.icon}</span>
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-label">{s.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Values */}
              <div className="about-values">
                {VALUES.map((v) => (
                  <span key={v} className="about-value-chip">{v}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
