/**
 * Why Choose Us — GSAP animated counters + feature cards
 */
import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './WhyUs.css'

gsap.registerPlugin(ScrollTrigger)

const COUNTERS = [
  { end: 15, suffix: '+', label: 'Years of Expertise' },
  { end: 100, suffix: '+', label: 'Happy Customers' },
  { end: 500, suffix: '+', label: 'Blouses Crafted' },
  { end: 100, suffix: '%', label: 'Fit Guarantee' },
]

const FEATURES = [
  { icon: '📐', title: 'Precise Measurements', desc: 'Every inch matters. We take detailed measurements and create a custom pattern just for you.' },
  { icon: '⏰', title: 'On-Time Delivery', desc: 'We respect your time. Your garments are delivered on the promised date, always.' },
  { icon: '💰', title: 'Affordable Pricing', desc: 'Premium quality stitching at prices that won\'t stretch your budget. Best value guaranteed.' },
  { icon: '🌟', title: '5-Star Quality', desc: 'Every stitch is done with care. We inspect each garment before delivery.' },
  { icon: '🔄', title: 'Free Adjustments', desc: 'Not 100% satisfied with the fit? We offer free alterations until it\'s perfect.' },
  { icon: '🤝', title: 'Trusted for 15 Years', desc: 'Built on a foundation of trust, honesty, and craftsmanship since 2010.' },
]

export default function WhyUs() {
  const sectionRef = useRef(null)
  const counterRefs = useRef([])
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  // GSAP counter animation
  useEffect(() => {
    if (!inView) return
    COUNTERS.forEach((counter, i) => {
      const el = counterRefs.current[i]
      if (!el) return
      gsap.fromTo(
        el,
        { textContent: 0 },
        {
          textContent: counter.end,
          duration: 1.2,
          ease: 'power2.out',
          delay: i * 0.15,
          snap: { textContent: 1 },
          onUpdate() {
            el.textContent = Math.round(Number(el.textContent)) + counter.suffix
          },
        }
      )
    })
  }, [inView])

  return (
    <section id="why-us" className="whyus-section section-padding" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title">The Sujatha Difference</h2>
            <div className="gold-divider mx-auto mb-3" />
            <p className="section-subtitle">
              Excellence woven into every garment we create.
            </p>
          </motion.div>
        </div>

        {/* GSAP Animating Counters */}
        <div className="counter-grid mb-5">
          {COUNTERS.map((c, i) => (
            <motion.div
              key={c.label}
              className="counter-card"
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <span
                className="counter-num"
                ref={(el) => (counterRefs.current[i] = el)}
              >
                0{c.suffix}
              </span>
              <span className="counter-label">{c.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              className="feature-card"
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
            >
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-body">
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
