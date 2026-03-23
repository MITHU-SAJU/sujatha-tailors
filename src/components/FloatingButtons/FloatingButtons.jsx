/**
 * FloatingButtons — WhatsApp FAB + Scroll to top (native smooth scroll)
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaArrowUp } from 'react-icons/fa'

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 350)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const openWA = () =>
    window.open(
      'https://wa.me/918524822544?text=Hi! I would like to enquire about tailoring services.',
      '_blank'
    )

  return (
    <>
      {/* WhatsApp FAB — always visible */}
      <motion.a
        className="whatsapp-fab"
        onClick={openWA}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: 'spring', stiffness: 200 }}
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </motion.a>

      {/* Scroll to top — appears after 350px scroll */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            className="scroll-top-btn"
            onClick={scrollTop}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 250 }}
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
