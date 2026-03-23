/**
 * Loader Component — Animated page loader with silk-thread progress bar
 */
import { motion } from 'framer-motion'
import './Loader.css'

export default function Loader() {
  return (
    <motion.div
      className="loader-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
    >
      {/* Needle spinner icon */}
      <div className="loader-needle">✂</div>

      {/* Brand name */}
      <div className="loader-brand">
        Sujatha <span>Tailors</span>
      </div>

      <div className="loader-tagline">Crafting elegance, stitch by stitch</div>

      {/* Progress bar */}
      <div className="loader-bar-container">
        <div className="loader-bar-fill" />
      </div>
    </motion.div>
  )
}
