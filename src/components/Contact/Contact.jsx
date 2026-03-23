/**
 * Contact Section — Info card + form + WhatsApp + map
 */
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaClock, FaEnvelope } from 'react-icons/fa'
import './Contact.css'

const fadeLeft  = { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0 } }
const fadeRight = { hidden: { opacity: 0, x:  50 }, show: { opacity: 1, x: 0 } }

export default function Contact() {
  const [form, setForm]       = useState({ name: '', phone: '', service: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent]       = useState(false)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setForm({ name: '', phone: '', service: '', message: '' })
      setTimeout(() => setSent(false), 5000)
    }, 1500)
  }

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/918524822544?text=Hi! I would like to enquire about tailoring services.`,
      '_blank'
    )
  }

  return (
    <section id="contact" className="contact-section section-padding" ref={ref}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">Get In Touch</span>
            <h2 className="section-title">Book Your Appointment</h2>
            <div className="gold-divider mx-auto mb-3" />
            <p className="section-subtitle">
              Ready to get the perfect fit? Reach out and let's create something beautiful together.
            </p>
          </motion.div>
        </div>

        <div className="row g-4">
          {/* Left: Info card */}
          <motion.div
            className="col-lg-5"
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="contact-info-card">
              <h3 className="contact-info-title">Sujatha Tailors</h3>
              <p className="contact-info-subtitle">
                We would love to hear from you. Visit us, call us, or drop a message on WhatsApp!
              </p>

              {[
                { icon: <FaPhone />, label: 'Phone', value: '+91 85248 22544', href: 'tel:+918524822544' },
                { icon: <FaWhatsapp />, label: 'WhatsApp', value: '+91 85248 22544', href: 'https://wa.me/918524822544' },
                { icon: <FaEnvelope />, label: 'Email', value: 'dhavanaimithun@gmail.com', href: 'mailto:dhavanaimithun@gmail.com' },
                { icon: <FaMapMarkerAlt />, label: 'Address', value: '5/204 Dhavanai Villa, Nd Post, The Nilgiris — 643007', href: null },
                { icon: <FaClock />, label: 'Hours', value: 'Mon–Sat: 9 AM – 8 PM  |  Sun: 10 AM – 5 PM', href: null },
              ].map((item) => (
                <div key={item.label} className="contact-item">
                  <div className="contact-item-icon">{item.icon}</div>
                  <div className="contact-item-body">
                    <div className="label">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="value">{item.value}</a>
                    ) : (
                      <div className="value">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}

              {/* WhatsApp button */}
              <button className="wa-action-btn" onClick={openWhatsApp}>
                <FaWhatsapp size={20} /> Chat on WhatsApp
              </button>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="col-lg-7"
            variants={fadeRight}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            <div className="contact-form-card">
              <h3>Send Us a Message</h3>
              <p>Fill in the form below and we'll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control-custom"
                        placeholder="e.g. Priya Nair"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control-custom"
                        placeholder="e.g. 98765 43210"
                        value={form.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label">Service Needed</label>
                      <select
                        name="service"
                        className="form-control-custom"
                        value={form.service}
                        onChange={handleChange}
                      >
                        <option value="">Select a service...</option>
                        <option>Blouse Stitching</option>
                        <option>Saree Fall & Pico</option>
                        <option>Fabric Alterations</option>
                        <option>Lehenga / Gown</option>
                        <option>Home Fabric Work</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label">Your Message</label>
                      <textarea
                        name="message"
                        className="form-control-custom"
                        placeholder="Tell us about your requirement..."
                        value={form.message}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="form-submit-btn" disabled={sending}>
                  {sending ? '⏳ Sending...' : '✉️ Send Message'}
                </button>

                {sent && (
                  <div className="form-toast success">
                    ✅ Message sent! We'll reach out to you soon.
                  </div>
                )}
              </form>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
