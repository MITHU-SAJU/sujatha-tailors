/**
 * Testimonials — Auto-playing carousel with Framer Motion AnimatePresence
 */
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import './Testimonials.css'

const TESTIMONIALS = [
  {
    text: 'Sujatha madam stitched my wedding blouse and it was absolutely perfect! The fit was flawless, the design exactly as I envisioned. I could not have asked for a better tailor.',
    name: 'Priya Nair',
    location: 'Thrissur, Kerala',
    initials: 'PN',
  },
  {
    text: 'I have been coming here for 5 years now. Every single blouse, every alteration — the quality and service never disappoints. Truly the best tailoring shop in our area!',
    name: 'Anitha Suresh',
    location: 'Palakkad, Kerala',
    initials: 'AS',
  },
  {
    text: 'Got my saree fall done here and the finish was so neat and clean. Also got two churidars altered — done on the same day itself. Very happy with the quick and reliable service!',
    name: 'Rekha Menon',
    location: 'Coimbatore',
    initials: 'RM',
  },
  {
    text: 'The price is very affordable and the stitching quality is top-notch. My pattu blouse stitched here got so many compliments at the wedding. Will definitely come again!',
    name: 'Deepa Krishnan',
    location: 'Ernakulam, Kerala',
    initials: 'DK',
  },
  {
    text: 'My daughter\'s lehenga was stitched here for her school function. The detailing and embellishments were beautiful. Sujatha aunty is very patient and listens carefully to what you want.',
    name: 'Lalitha Varma',
    location: 'Kozhikode, Kerala',
    initials: 'LV',
  },
]

const variants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit:  { opacity: 0, x: -30 },
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length)

  const t = TESTIMONIALS[current]

  return (
    <section id="testimonials" className="testimonials-section section-padding" ref={ref}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">Testimonials</span>
            <h2 className="section-title">What Our Customers Say</h2>
            <div className="gold-divider mx-auto mb-3" />
            <p className="section-subtitle">
              Real stories from real customers who trust us with their precious garments.
            </p>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="testimonial-carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="testimonial-card"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className="testimonial-quote-icon">"</div>
              {/* Stars */}
              <div className="testimonial-stars">{'⭐'.repeat(5)}</div>
              {/* Review text */}
              <p className="testimonial-text">"{t.text}"</p>
              {/* Author */}
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div className="testimonial-author-info">
                  <div className="name">{t.name}</div>
                  <div className="location">📍 {t.location}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="testimonial-controls">
            <button className="testi-btn" onClick={prev} aria-label="Previous">‹</button>
            <div className="testi-dots">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`testi-dot ${i === current ? 'active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button className="testi-btn" onClick={next} aria-label="Next">›</button>
          </div>
        </div>
      </div>
    </section>
  )
}
