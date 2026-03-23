import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import emailjs from '@emailjs/browser'
import './Contact.css'

export default function Contact() {

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  })

  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    if (!form.name || !form.phone || !form.email) {
      setErrorMsg("⚠️ Please fill all required fields")
      setTimeout(() => setErrorMsg(''), 3000)
      return
    }

    setSending(true)

    emailjs.send(
      import.meta.env.VITE_EMAIL_SERVICE_ID,
      import.meta.env.VITE_EMAIL_TEMPLATE_ID,
      form,
      import.meta.env.VITE_EMAIL_PUBLIC_KEY
    )
      .then(() => {
        setSending(false)
        setSent(true)

        // Open WhatsApp after submit
        window.open(
          `https://wa.me/918524822544?text=Hi, I just submitted a request on your website.`,
          "_blank"
        )

        setForm({
          name: '',
          phone: '',
          email: '',
          service: '',
          message: ''
        })

        setTimeout(() => setSent(false), 5000)
      })
      .catch((error) => {
        setSending(false)
        setErrorMsg('❌ Failed to send message. Try again.')
        console.error("EmailJS Error:", error)

        setTimeout(() => setErrorMsg(''), 5000)
      })
  }

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="container">

        <h2>Contact Us</h2>

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

          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={form.email}
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
            <motion.div className="form-toast success">
              ✅ Message sent successfully!
            </motion.div>
          )}

          {/* ERROR */}
          {errorMsg && (
            <motion.div className="form-toast error">
              {errorMsg}
            </motion.div>
          )}

        </form>

        <button onClick={() => window.open("https://wa.me/918524822544")}>
          <FaWhatsapp /> Chat on WhatsApp
        </button>

      </div>
    </section>
  )
}