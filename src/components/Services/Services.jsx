/**
 * Services Section — 6 service cards with hover glow + lift animations
 */
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Services.css'

const SERVICES = [
  {
    icon: '🪡',
    title: 'Custom Blouse Stitching',
    desc: 'Beautifully crafted blouses — backless, halter, princess-cut, designer necklines, and more. Your measurements, your style.',
    price: 'Starting ₹250',
  },
  {
    icon: '🥻',
    title: 'Saree Fall & Pico',
    desc: 'Expert saree fall stitching, pico borders, and saree running blouses. Clean finish, no fraying, every time.',
    price: 'Starting ₹80',
  },
  {
    icon: '✂️',
    title: 'Fabric Alterations',
    desc: 'Precise alterations for churidars, salwars, kurtas, and more. We adjust for the perfect fit — fast turnaround.',
    price: 'Starting ₹100',
  },
  {
    icon: '👗',
    title: 'Lehenga & Gown',
    desc: 'Custom-stitched lehengas and gowns for weddings, receptions, and festive occasions. Dream looks, made real.',
    price: 'Starting ₹800',
  },
  {
    icon: '🛋️',
    title: 'Home Fabric Work',
    desc: 'Curtains, bedcovers, cushion covers, and tablecloths stitched to your room size with neat, durable finishes.',
    price: 'Starting ₹200',
  },
  {
    icon: '💎',
    title: 'Designer Embellishments',
    desc: 'Mirror work, lace borders, stonework, and hand-embroidery additions to elevate any garment to boutique quality.',
    price: 'On Request',
  },
]

const cardVariant = (i) => ({
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06 } },
})

export default function Services() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="services-section section-padding" ref={ref}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">What We Offer</span>
            <h2 className="section-title">Our Tailoring Services</h2>
            <div className="gold-divider mx-auto mb-3" />
            <p className="section-subtitle">
              From blouses to bedcovers — crafted with care, precision, and elegance.
            </p>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="services-grid">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              className="service-card"
              variants={cardVariant(i)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
              <div className="service-icon-wrap">{svc.icon}</div>
              <h3 className="service-title">{svc.title}</h3>
              <p className="service-desc">{svc.desc}</p>
              <span className="service-price">{svc.price}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
