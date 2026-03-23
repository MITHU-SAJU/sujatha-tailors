import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaClock, FaEnvelope } from 'react-icons/fa'
import emailjs from '@emailjs/browser'
import './Contact.css'

const fadeLeft = { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0 } }
const fadeRight = { hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0 } }

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (!form.name || !form.phone) {
      setErrorMsg("⚠️ Please fill required fields")
      setTimeout(() => setErrorMsg(''), 3000)
      return
    }

    setSending(true)

    emailjs.send(
      import.meta.env.VITE_EMAIL_SERVICE_ID,
      import.meta.env.VITE_EMAIL_TEMPLATE_ID,
      {
        name: form.name,
        phone: form.phone,
        service: form.service,
        message: form.message,
      },
      import.meta.env.VITE_EMAIL_PUBLIC_KEY
    )
      .then(() => {
        setSending(false)
        setSent(true)

        // Open WhatsApp automatically
        window.open(
          `https://wa.me/918524822544?text=Hi, I just submitted a request on your website.`,
          "_blank"
        )

        setForm({ name: '', phone: '', service: '', message: '' })

        setTimeout(() => setSent(false), 5000)
      })
      .catch((error) => {
        setSending(false)
        setErrorMsg('❌ Failed to send message. Please try again.')
        console.error("EmailJS Error:", error)

        setTimeout(() => setErrorMsg(''), 5000)
      })
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

          {/* LEFT */}
          <motion.div
            className="col-lg-5"
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ duration: 0.7 }}
          >
            <div className="contact-info-card">
              <h3>Sujatha Tailors</h3>

              <button className="wa-action-btn" onClick={openWhatsApp}>
                <FaWhatsapp /> Chat on WhatsApp
              </button>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            className="col-lg-7"
            variants={fadeRight}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ duration: 0.7 }}
          >
            <div className="contact-form-card">
              <h3>Send Us a Message</h3>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />

                <select name="service" value={form.service} onChange={handleChange}>
                  <option value="">Select Service</option>
                  <option>Blouse Stitching</option>
                  <option>Saree Work</option>
                  <option>Alterations</option>
                </select>

                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={handleChange}
                />

                <button type="submit" disabled={sending}>
                  {sending ? '⏳ Sending...' : 'Send Message'}
                </button>

                {/* SUCCESS */}
                {sent && (
                  <motion.div
                    className="form-toast success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    ✅ Message sent successfully!
                  </motion.div>
                )}

                {/* ERROR */}
                {errorMsg && (
                  <motion.div
                    className="form-toast error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errorMsg}
                  </motion.div>
                )}

              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}