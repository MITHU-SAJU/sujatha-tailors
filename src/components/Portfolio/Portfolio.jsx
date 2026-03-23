/**
 * Portfolio / Gallery Section — Masonry grid with lightbox
 */
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import blouse1 from '../../assets/images/blouse-1.jpg'
import blouse2 from '../../assets/images/blouse-2.jpg'
import saree1  from '../../assets/images/saree-1.jpg'
import alt1    from '../../assets/images/alteration-1.jpg'
import './Portfolio.css'

// Gallery items (repeated to fill masonry) using our generated images
const GALLERY = [
  { src: blouse1, label: 'Designer Bridal Blouse',     tag: 'Blouse Stitching' },
  { src: saree1,  label: 'Silk Saree Draping',         tag: 'Saree Styling' },
  { src: blouse2, label: 'Pattu Silk Blouse',          tag: 'Blouse Stitching' },
  { src: alt1,    label: 'Churidar Alteration',        tag: 'Alterations' },
  { src: blouse1, label: 'Embroidered Neckline Blouse',tag: 'Blouse Stitching' },
  { src: saree1,  label: 'Chiffon Saree Fall & Pico',  tag: 'Saree Fall / Pico' },
  { src: blouse2, label: 'Zari Work Blouse',           tag: 'Designer Blouse' },
  { src: alt1,    label: 'Fabric Alteration Work',     tag: 'Alterations' },
  { src: blouse1, label: 'Princess Cut Blouse',        tag: 'Blouse Stitching' },
]

export default function Portfolio() {
  const [active, setActive] = useState(null)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="portfolio" className="portfolio-section section-padding" ref={ref}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="section-tag">Our Work</span>
            <h2 className="section-title">Portfolio & Gallery</h2>
            <div className="gold-divider mx-auto mb-3" />
            <p className="section-subtitle">
              A glimpse of our finest creations — blouses, sarees, and alterations.
            </p>
          </motion.div>
        </div>

        {/* Masonry Grid */}
        <div className="portfolio-masonry">
          {GALLERY.map((item, i) => (
            <motion.div
              key={i}
              className="portfolio-item"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => setActive(item)}
            >
              <img src={item.src} alt={item.label} loading="lazy" />
              <div className="portfolio-overlay">
                <div className="portfolio-overlay-icon">🔍</div>
                <div className="portfolio-overlay-label">{item.label}</div>
                <div className="portfolio-overlay-tag">{item.tag}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{ scale: 0.92,    opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={() => setActive(null)}>✕</button>
              <img src={active.src} alt={active.label} />
              <div className="lightbox-caption">
                {active.label} — <em>{active.tag}</em>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
